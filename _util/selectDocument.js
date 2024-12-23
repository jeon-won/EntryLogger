'use server';
import { connectDB } from "@/_util/database";

const dbName = process.env.MONGODB_DB_NAME;
const collectionName = process.env.MONGODB_COLLECTION_NAME;

const selectDocument = async (query) => {
  /* DB에서 데이터 조회 */
  try {
    const db = (await connectDB).db(dbName);
    const result = await db.collection(collectionName).find({
      entryDate: { 
        $gte: new Date(query.entryDate),
        $lte: new Date(query.exitDate),
      }
    }).toArray();

    const parsedResult = result.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));

    return parsedResult;
  } catch(error) {
    console.error("Error selecting MongoDB document:", error);
    throw new Error("Failed to select MongoDB document");
  }
}

export default selectDocument;
