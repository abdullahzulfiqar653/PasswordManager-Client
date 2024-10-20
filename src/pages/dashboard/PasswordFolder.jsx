import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { debounce } from "lodash";
import { useAuth } from "../../AuthContext";
import PasswordTable from "../../components/Table";
import RootFolder from "../../components/RootFolder";
import SearchesTags from "../../components/SearchesTags";
import PasswordDetailContent from "../../components/PasswordDetail";

import useGetUserPasswords from "../../hooks/useGetUserPasswords";

const PasswordFolder = () => {
  const navigate = useNavigate();
  const { isDesktop, search, passSelectedFolderId, setSearch } = useAuth();
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
        <div className="relative overflow-x-auto  sm:rounded-lg">
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
          to="/dashboard/folders/123"
          className="text-[#5D73F2]"
        >{`Folders > ${"Database folder 1"} > `}</Link>
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
              {passWordRecord.title}
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

const UpArrow = () => (
  <svg
    width="11"
    height="8"
    viewBox="0 0 11 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.4497 1.43051e-06L0.549387 1.43051e-06C0.449152 0.000306606 0.3509 0.0271616 0.265207 0.0776749C0.179515 0.128188 0.109627 0.200447 0.0630665 0.286674C0.0165052 0.372901 -0.00496578 0.469831 0.000965118 0.56703C0.00689602 0.664229 0.0400038 0.758016 0.0967245 0.838296L5.04686 7.78401C5.25202 8.072 5.74593 8.072 5.95164 7.78401L10.9018 0.838296C10.9591 0.758183 10.9927 0.664349 10.9989 0.566988C11.0052 0.469627 10.9839 0.372464 10.9372 0.286054C10.8906 0.199645 10.8206 0.127293 10.7346 0.0768614C10.6486 0.0264301 10.5501 -0.000152588 10.4497 1.43051e-06Z"
      fill="white"
    />
  </svg>
);
const DownArrow = () => (
  <svg
    width="11"
    height="8"
    viewBox="0 0 11 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.550331 8H10.4506C10.5508 7.99969 10.6491 7.97284 10.7348 7.92233C10.8205 7.87181 10.8904 7.79955 10.9369 7.71333C10.9835 7.6271 11.005 7.53017 10.999 7.43297C10.9931 7.33577 10.96 7.24198 10.9033 7.1617L5.95314 0.215985C5.74798 -0.0719951 5.25407 -0.0719951 5.04836 0.215985L0.0982183 7.1617C0.0409204 7.24182 0.00731955 7.33565 0.00106644 7.43301C-0.00518667 7.53037 0.0161471 7.62754 0.06275 7.71395C0.109353 7.80036 0.179442 7.87271 0.265403 7.92314C0.351364 7.97357 0.449909 8.00015 0.550331 8Z"
      fill="white"
    />
  </svg>
);
