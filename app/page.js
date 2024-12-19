import Image from "next/image";
import styles from "./page.module.css";
import EntryForm from "@/_components/entryForm";
import EntryTodayList from "@/_components/entryTodayList";

export default function Home() {
  return (
    <>
      <EntryForm/>
      <EntryTodayList/>
    </>
  );
}
