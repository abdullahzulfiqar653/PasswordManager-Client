import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { UpArrow, DownArrow } from "../../assets/icons";
import { useAuth } from "../../AuthContext";
import PasswordTable from "../../components/Table";
import RootFolder from "../../components/RootFolder";
import SearchesTags from "../../components/SearchesTags";
import PasswordDetailContent from "../../components/PasswordDetail";

import useGetUserPasswords from "../../hooks/useGetUserPasswords";

const PasswordFolder = () => {
  const navigate = useNavigate();
  const { isDesktop, search, passSelectedFolderId, setSearch, folderTitle } =
    useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const { data, isLoading, refetch } = useGetUserPasswords(
    passSelectedFolderId,
    search
  );
  const debouncedRefetch = debounce(() => {
    refetch();
  }, 500); // 500ms debounce time

  useEffect(() => {
    // Call the debounced refetch function whenever search changes
    if (search) {
      debouncedRefetch();
    } else {
      refetch();
    }
    // Cleanup function to cancel the debounce on unmount
    return () => {
      debouncedRefetch.cancel();
    };
  }, [search, debouncedRefetch]); // Run this effect whenever 'search' changes

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleRowClick = (item) => {
    navigate(`/dashboard/edit/${item.id}`, { state: { item } });
    setSearch("");
  };

  return isDesktop ? (
    <section className="w-full rounded-[12px] flex flex-col gap-[11px]">
      <section className="bg-[#101E71] rounded-[12px] min-h-[624px]">
        <div className="relative h-[624px] overflow-auto  sm:rounded-lg">
          <PasswordTable data={data} handleRowClick={handleRowClick} />
        </div>
      </section>
      <RootFolder />
      <div className="block lg:hidden">
        <SearchesTags />
      </div>
    </section>
  ) : (
    <section className="flex flex-col gap-[0px] mt-[13px]">
      <h3 className="cursor-pointer dm-sans font-[400] text-[12px] leading-[64px] text-white">
        <Link
          to="/dashboard/folders"
          className="text-[#5D73F2]"
        >{`Folders > ${folderTitle} > `}</Link>
        Passwords
      </h3>
      {/* <h3 className="cursor-pointer dm-sans font-[400] text-[12px] leading-[64px] text-white">
        <Link
          to="/dashboard/folders/123"
          className="text-[#5D73F2]"
        >{`Folders > `}</Link>
        Passwords
      </h3> */}
      <div className="flex flex-col gap-[11px]">
        {data?.results.map((passWordRecord, index) => (
          <div
            key={index}
            className="flex flex-col gap-[2px] rounded-[6px] bg-[#0E1A60]"
          >
            <button
              onClick={() => {
                handleTabClick(index);
              }}
              className={`${
                index === activeTab ? "active" : ""
              } flex justify-between items-center relative text-white bg-[#010E59] py-[17px] px-[44px] text-[14px] dm-sans font-[400] leading-[20px]`}
            >
              {passWordRecord?.emoji && (
                <img
                  src={`/${passWordRecord.emoji}.png`}
                  alt={passWordRecord.emoji}
                  className="h-6 absolute left-3"
                />
              )}
              <span className="w-[200px] text-start overflow-hidden">
                {passWordRecord.title}
              </span>

              {index === activeTab ? <UpArrow /> : <DownArrow />}
            </button>
            {index == activeTab && (
              <PasswordDetailContent
                passWordRecord={passWordRecord}
                handleRowClick={handleRowClick}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PasswordFolder;
