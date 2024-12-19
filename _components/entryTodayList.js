import { connectDB } from "@/_util/database";
import { Container } from 'react-bootstrap';
import EntryListTable from "./entryTodayListTable";

const dbName = process.env.MONGODB_DB_NAME;
const collectionName = process.env.MONGODB_COLLECTION_NAME;

const EntryTodayList = async () => {
  const today = new Date().toISOString().split('T')[0]; // 오늘의 년월일(시분초 제외)

  /* DB에서 자료 가져오기 */
  const db = (await connectDB).db(dbName);
  const entryData = await db.collection(collectionName)
    .find({ entryDate: { $gte: new Date(today) } }) // 오늘 출입한 내역만 가져옴
    .project({ contact: 0, entryDate: 0 })          // 제외할 컬럼
    .toArray();

  /* DB에서 가져온 자료 가공 */
  const parsedEntryData = entryData.map((item) => ({
    ...item, 
    _id: item._id.toString(), // _id를 String 타입으로 바꿔야 클라이언트 컴포넌트에 props 전달 가능
  }))

  return (
    <Container className="mt-2">
      <EntryListTable data={parsedEntryData}/>
    </Container>
  );
}

export default EntryTodayList;