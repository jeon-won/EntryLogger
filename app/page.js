import Image from "next/image";
import styles from "./page.module.css";
import EntryForm from "@/_components/entryForm";
import EntryList from "@/_components/entryList";

export default function Home() {
  return (
    <>
      <EntryForm/>
      <EntryList/>
    </>
  );
}
