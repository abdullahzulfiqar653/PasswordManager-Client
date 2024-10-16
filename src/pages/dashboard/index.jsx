import React from "react";
import FoldersList from "./FoldersList";
import PasswordFolder from "./PasswordFolder";

function Dashboard() {
  return (
    <section className="w-full relative flex mt-[20px] container gap-[7px]">
      <FoldersList />
      <section className="flex-1 overflow-x-auto">
        <PasswordFolder />
      </section>
    </section>
  );
}

export default Dashboard;
