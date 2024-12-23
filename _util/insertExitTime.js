'use server';
import { connectDB } from "@/_util/database";
import { ObjectId } from "mongodb";

const dbName = process.env.MONGODB_DB_NAME;
const collectionName = process.env.MONGODB_COLLECTION_NAME;

/* 퇴실처리 버튼 클릭 시 퇴실시간을 DB에 저장 */
const InsertExitTime = async (data) => {
  const db = (await connectDB).db(dbName)
  await db.collection(collectionName).updateOne(
    { _id: new ObjectId(data.id) },
    { $set: { 
      exitDate: data.exitDate,
      exitDateGmt9: data.exitDateGmt9, 
    }}
  );
}

export default InsertExitTime;