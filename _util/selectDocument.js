'use server';
import { connectDB } from "@/_util/database";

const dbName = process.env.MONGODB_DB_NAME;
const collectionName = process.env.MONGODB_COLLECTION_NAME;

/* 검색조건(query)을 사용하여 DB에서 데이터 조회 및 리턴 */
const selectDocument = async (query) => {
  try {
    const db = (await connectDB).db(dbName);
    const result = await db.collection(collectionName).find({
      // 지금은 날짜 범위만 검색조건으로 사용
      entryDate: { 
        $gte: new Date(query.startDate + " 00:00:00"),
        $lte: new Date(query.endDate + " 23:59:59"),
      }
      // 향후 검색조건 추가 시 아래와 같이 코딩하면 될 듯...
      // contact: query.contact == null ? { $exists: true } : query.contact,
    })
    .sort({ entryDate: 1 }) // entryDate 기준 오름차순 정렬
    .toArray();

    /* _id 값은 String 형태로 변경해야 컴포넌트에 전달 가능하므로 파싱 후 리턴 */
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