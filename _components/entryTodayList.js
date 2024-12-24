import EntryListTable from "./entryTodayListTable";
import { Container } from 'react-bootstrap';
import { connectDB } from "@/_util/database";

const dbName = process.env.MONGODB_DB_NAME;
const collectionName = process.env.MONGODB_COLLECTION_NAME;

/* 오늘의 출입 내역을 DB에서 가져온 후 EntryListTable로 보내는 컴포넌트 */
const EntryTodayList = async () => {
  /* DB에서 자료 가져오기 */
  const today = new Date().toISOString().split('T')[0]; // 오늘의 년월일(YYYY-MM-DD 형식)
  const db = (await connectDB).db(dbName);
  const entryData = await db.collection(collectionName)
    .find({ entryDate: { $gte: new Date(today) } })     // 오늘 출입한 내역만 가져옴
    .project({ contact: 0, entryDate: 0 })              // 제외할 컬럼
    .sort({ entryDate: 1 })                             // entryDate 기준 오름차순 정렬
    .toArray();

  /* _id 값은 String 형태로 변경해야 컴포넌트에 전달 가능하므로 파싱 */
  const parsedEntryData = entryData.map((item) => ({
    ...item, 
    _id: item._id.toString()
  }))

  return (
    <Container className="mt-2">
      <EntryListTable data={parsedEntryData} />
    </Container>
  );
}

export default EntryTodayList;