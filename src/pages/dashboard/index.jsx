import React, { useEffect } from "react";
import FoldersList from "./FoldersList";
import PasswordFolder from "./PasswordFolder";
import useGetFolders from "../../hooks/useGetFolders";

function Dashboard() {
  const { data: foldersData, refetch: refetchFolders } = useGetFolders();
  useEffect(() => {
    refetchFolders();
  }, [refetchFolders]);
  return (
    <section className="w-full relative flex mt-[20px] container gap-[7px]">
      <FoldersList foldersData={foldersData} />
      <section className="flex-1 overflow-x-auto">
        <PasswordFolder />
      </section>
    </section>
  );
}

export default Dashboard;
