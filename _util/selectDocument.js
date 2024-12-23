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
        $gte: new Date(query.startDate + " 00:00:00"),
        $lte: new Date(query.endDate + " 23:59:59"),
      }
    }).toArray();

    /* _id 값은 String 형태로 파싱해야만 컴포넌트에 전달 가능 */
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