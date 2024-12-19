'use server';
import { connectDB } from "@/_util/database";

const dbName = process.env.MONGODB_DB_NAME;
const collectionName = process.env.MONGODB_COLLECTION_NAME;

const insertDocument = async (data) => {
  /* 폼 입력 값 가져온 후 DB에 저장할 데이터로 가공 */
  const insertData = {
    purpose: data.purpose,         // 방문목적(String 타입)
    name: data.name,               // 성명(String 타입)
    dob: new Date(data.dob),       // 생년월일(Date 타입)
    affiliation: data.affiliation, // 소속(String 타입)
    contact: data.contact,         // 연락처(String 타입)
    lastContact: data.contact.match(/\d{4}$/)[0], // 연락처 뒤 4자리(String 타입)
    entryDate: new Date(data.entryDateGmt9),      // 입실일(Date 타입)
    entryDateGmt9: data.entryDateGmt9,            // 입실일 GMT+9(String 타입)
  }
  console.log(`insertData: ${JSON.stringify(insertData)}`)

  /* DB에 저장 후 최상위 URL로 이동되도록 응답 */
  const db = (await connectDB).db(dbName);
  const result = await db.collection(collectionName).insertOne(insertData);
  console.log(`result: ${JSON.stringify(result)}`);
}

export default insertDocument;