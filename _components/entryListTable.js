"use client";
import selectDocument from "@/_util/selectDocument";
import { useState, useEffect } from "react";

const EntryListTable = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await selectDocument({ entryDate: "2024-11-01", exitDate: "2024-12-31" });
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {JSON.stringify(data, null, 2)}
    </>
  );
}

export default EntryListTable;

