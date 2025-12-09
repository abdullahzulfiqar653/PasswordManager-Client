import React, { useEffect, useState } from "react";
import FoldersList from "./FoldersList";
import PasswordFolder from "./PasswordFolder";
import useGetFolders from "../../hooks/useGetFolders";
import { useAuth } from "../../AuthContext";

function Dashboard() {
  const { search } = useAuth();
  const [searchTerm, setSearchTerm] = useState(search);
  const { data: foldersData } = useGetFolders(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== search) {
        setSearchTerm(search);
      }
    }, 500); 

    return () => clearTimeout(timer);
  }, [search, searchTerm]);

  return (
    <section className="w-full h-full relative flex mt-[20px] container gap-[7px]">
      <FoldersList foldersData={foldersData} />
      <section className="flex-1 overflow-x-auto">
        <PasswordFolder searchTerm={searchTerm}/>
      </section>
    </section>
  );
}

export default Dashboard;
