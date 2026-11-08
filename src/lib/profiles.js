import { db, mongoReady } from "@/lib/mongodb";


export const PROFILE_COLLECTION = "profiles";

let indexesReady = null;

function ensureProfileIndexes() {
  if (!indexesReady) {
    indexesReady = mongoReady.then(() =>
      db
        .collection(PROFILE_COLLECTION)
        .createIndex({ userId: 1 }, { unique: true, name: "profile_userId_uidx" })
    )
      .then(() => true)
      .catch((error) => {
       
        indexesReady = null;
        console.error(
          "[profiles] index setup failed:",
          error?.message ?? error
        );
        return false;
      });
  }

  return indexesReady;
}

function buildProfileDocument(user, now = new Date()) {
  return {
  
    userId: user.id,
    name: String(user.name ?? "").trim(),
    email: String(user.email ?? ""),
    image: user.image ?? null,
    emailVerified: Boolean(user.emailVerified),
    bio: "",
    phone: "",
    createdAt: now,
    updatedAt: now,
  };
}


export async function createProfileIfMissing(user) {
  if (!user?.id) return null;

  await ensureProfileIndexes();

  const collection = db.collection(PROFILE_COLLECTION);

  try {
    return await collection.findOneAndUpdate(
      { userId: user.id },
      { $setOnInsert: buildProfileDocument(user) },
      { upsert: true, returnDocument: "after", projection: { _id: 0 } }
    );
  } catch (error) {
    
    if (error?.code === 11000) {
      return collection.findOne(
        { userId: user.id },
        { projection: { _id: 0 } }
      );
    }

    throw error;
  }
}


export async function syncProfileFromUser(user) {
  if (!user?.id) return null;

  await ensureProfileIndexes();

  const now = new Date();
  const base = buildProfileDocument(user, now);
  const $set = { updatedAt: now };

  if (typeof user.name === "string" && user.name.trim()) {
    $set.name = user.name.trim();
  }
  if (typeof user.email === "string" && user.email) {
    $set.email = user.email;
  }
  if (user.image !== undefined) {
    $set.image = user.image ?? null;
  }
  if (user.emailVerified !== undefined) {
    $set.emailVerified = Boolean(user.emailVerified);
  }


  const $setOnInsert = Object.fromEntries(
    Object.entries(base).filter(([key]) => !(key in $set))
  );

  try {
    await db
      .collection(PROFILE_COLLECTION)
      .updateOne({ userId: user.id }, { $set, $setOnInsert }, { upsert: true });
  } catch (error) {
    if (error?.code !== 11000) throw error;
  }

  return db
    .collection(PROFILE_COLLECTION)
    .findOne({ userId: user.id }, { projection: { _id: 0 } });
}


export async function getProfileForUser(user) {
  if (!user?.id) return null;

  await ensureProfileIndexes();

  const collection = db.collection(PROFILE_COLLECTION);
  let profile = await collection.findOne(
    { userId: user.id },
    { projection: { _id: 0 } }
  );

  if (!profile) {
    profile = await createProfileIfMissing(user);
  }

  
  const differsFromUser =
    profile &&
    ((typeof user.name === "string" &&
      user.name.trim() &&
      String(profile.name ?? "") !== user.name.trim()) ||
      (typeof user.email === "string" &&
        user.email &&
        String(profile.email ?? "") !== user.email) ||
      (user.image !== undefined &&
        (profile.image ?? null) !== (user.image ?? null)));

  if (differsFromUser) {
    profile = await syncProfileFromUser(user);
  }

  return profile;
}
