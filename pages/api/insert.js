// import { connectDB } from "@/_util/database";

// const dbName = process.env.MONGODB_DB_NAME;
// const collectionName = process.env.MONGODB_COLLECTION_NAME;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      /* 폼 입력 값 가져오기 */
      let formdata = req.body;
      console.log(`POST formdata: ${JSON.stringify(formdata, null, 2)}`);

      /* YYYY-MM-DD (HH:MM:SS) 문자열을 Date 타입으로 변환 */
      // let { entrydate, dob } = formdata;
      // formdata.entrydate = new Date(entrydate + "Z"); // Z를 붙였더니 GMT+9 시간대로 변경되네...
      // formdata.dob = new Date(dob + "Z");

      /* DB에 저장 */
      // const db = (await connectDB).db(dbName);
      // await db.collection(collectionName).insertOne(formdata);

      /* 최상위 URL로 이동되도록 응답 */
      res.redirect(302, '/');
    } catch (error) {
      console.error("Error saving data to the database:", error);

      /* 오류 발생 시 500 상태 코드 반환 */
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  } else {
    /* 지원하지 않는 요청 메서드에 대한 응답 */
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
