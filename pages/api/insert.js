import { connectDB } from "@/_util/database";

const dbName = process.env.MONGODB_DB_NAME;
const collectionName = process.env.MONGODB_COLLECTION_NAME;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      /* 폼 입력 값 가져온 후 DB에 저장할 데이터로 가공 */
      const formData = req.body;
      const insertData = {
        purpose: formData.purpose,         // 방문목적(String 타입)
        name: formData.name,               // 성명(String 타입)
        dob: new Date(formData.dob),       // 생년월일(Date 타입)
        affiliation: formData.affiliation, // 소속(String 타입)
        contact: formData.contact,         // 연락처(String 타입)
        lastContact: formData.contact.match(/\d{4}$/)[0], // 연락처 뒤 4자리(String 타입)
        entryDate: new Date(formData.entryDateGmt9),      // 입실일(Date 타입)
        entryDateGmt9: formData.entryDateGmt9,            // 입실일 GMT+9(String 타입)
      }

      /* DB에 저장 후 최상위 URL로 이동되도록 응답 */
      const db = (await connectDB).db(dbName);
      await db.collection(collectionName).insertOne(insertData);
      res.redirect(302, '/');
    } 
    
    /* 오류 발생 시 500 상태 코드 반환 */
    catch (error) {
      console.error("Error saving data to the database:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  } 
  
  /* POST 요청 외엔 지원 안 함 */
  else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
