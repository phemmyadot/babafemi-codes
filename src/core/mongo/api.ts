import { Collection, Db } from "mongodb";
import clientPromise from ".";

let client;
let db: Db;
let intros: Collection<Document>;

const init = async () => {
  if (db) return;
  try {
    client = await clientPromise;
    db = await client.db(process.env.DB_NAME);
    intros = await db.collection("intros");
  } catch (err) {
    throw new Error("Failed to establish connect to db");
  }
};

(async () => {
  await init();
})();

export const getIntros = async () => {
  try {
    if (!intros) await init();
    const result = await intros
      .find()
      .map((intro) => ({ ...intro, _id: intro._id.toString() }))
      .toArray();
    return {intros: result};
  } catch (error) {
    return {
      error: "Failed to fetch intros",
    };
  }
};
