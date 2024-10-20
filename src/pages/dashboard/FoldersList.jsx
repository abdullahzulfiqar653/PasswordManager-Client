import React, { useEffect } from "react";
import { debounce } from "lodash";
import { Routes, Route, Link, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import SearchesTags from "../../components/SearchesTags";
import PasswordFolder from "./PasswordFolder";
import useGetFolders from "../../hooks/useGetFolders";
import useGetUserPasswords from "../../hooks/useGetUserPasswords";

function FoldersList({ foldersData }) {
  const navigate = useNavigate();
  const {
    search,
    setSearch,
    isDesktop,
    handleOpenDeleteModal,
    handleCreateFolderModal,
    passSelectedFolderId,
    handleFolderSelection,
    setPassSelectedFolderId,
    handleConfirmLogoutModal,
  } = useAuth();
  const { data, refetch: folderRefetch } = useGetFolders(search);
  const { refetch } = useGetUserPasswords(passSelectedFolderId);

  const debouncedRefetch = debounce(() => {
    folderRefetch();
  }, 500);

  useEffect(() => {
    if (search) {
      debouncedRefetch();
    } else {
      folderRefetch();
    }
    return () => {
      debouncedRefetch.cancel();
    };
  }, [search, debouncedRefetch]);

  useEffect(() => {
    refetch();
  }, [refetch, passSelectedFolderId]);

  useEffect(() => {
    const storedFolderId = localStorage.getItem("FolderId");
    if (storedFolderId) {
      setPassSelectedFolderId(storedFolderId);
    }
  }, []);

  return isDesktop ? (
    <section className="hidden md:flex max-h-[624px] max-w-[296px] w-full bg-[#101E71] rounded-[12px] flex-col">
      <section className="h-[575px] flex flex-col gap-[16px]">
        <h4 className="px-[21px] pb-2 flex justify-between text-white text-[16px] mt-[25px] font-[400]">
          Folders
          <span
            className="cursor-pointer"
            onClick={() => handleCreateFolderModal()}
          >
            <Folders className={"mt-1"} />
          </span>
        </h4>

        <ul className="flex flex-col gap-[16px] overflow-y-auto">
          {foldersData?.results.map((folder, index) => (
            <li key={index}>
              <div
                onClick={() => {
                  handleFolderSelection(folder.id);
                  setSearch("");
                }}
                className={`h-[54px] max-w-[296px] flex cursor-pointer items-center py-[6px] px-[13px] pl-[21px] ${
                  passSelectedFolderId === folder.id
                    ? "active folder-wrapper"
                    : ""
                }`}
              >
                <div className="flex h-full w-full justify-between items-center">
                  <div className="flex gap-[15px] items-center">
                    {passSelectedFolderId === folder.id && <Bar />}
                    <Folder />
                    <h4 className="text-[#DFDFDF] text-[12px] leading-[32px] font-[400] dm-sans">
                      {folder.title}
                    </h4>
                  </div>
                  <span
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent button click from triggering folder selection
                      handleOpenDeleteModal(folder.id);
                    }}
                    className="ml-auto" // This ensures the recycle icon is at the end
                  >
                    <Recycle className={"w-[18px] h-[18px]"} />
                  </span>
                </div>
              </div>
            </li>
          ))}
          {/* <ul className="flex flex-col gap-[16px] pl-[33px] bg-[#010E59]">
              <li>
                <Link
                  to="/dashboard/folders/123"
                  className="h-[54px] flex gap-[8px] items-center py-[6px] px-[13px] pl-[21px]"
                >
                  <Recycle />
                  <div className="flex h-full gap-[15px] items-center">
                    <h4 className="text-[#DFDFDF] text-[12px] leading-[32px] font-[400] dm-sans">
                      Recycle bin
                    </h4>
                  </div>
                </Link>
              </li>
            </ul> */}
        </ul>
      </section>
      <hr className="border-[1.5px] border-[#00112B]" />
      {/* <SearchesTags /> */}
      <div
        onClick={handleConfirmLogoutModal}
        className="flex justify-center mt-2 gap-2 text-white cursor-pointer "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-[30px]"
        >
          <path
            fill="#ffffff"
            d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"
          />
        </svg>{" "}
        Logout
      </div>
    </section>
  ) : (
    <section className="w-full relative container flex flex-col gap-[24px]">
      {/* <PasswordFolder /> */}
      <h4 className="text-white text-[22px] mt-5 font-[400]">Folders</h4>
      <ul className="flex flex-col gap-[9px]">
        {data?.results.map((folder, index) => (
          <li
            key={index}
            onClick={() => {
              handleFolderSelection(folder.id);
              setSearch("");
            }}
            className={`folder-wrapper bg-[#010E59] rounded-[9px] relative flex gap-[5px] items-center`}
          >
            <button
              onClick={() => navigate(`/dashboard/folders/${folder.id}`)}
              className={`h-[54px] flex gap-[8px] items-center py-[6px] px-[13px] pl-[21px] ${
                passSelectedFolderId === folder.id
                  ? "active folder-wrapper"
                  : ""
              }`}
            >
              <div className="flex h-full gap-[15px] items-center justify-between w-full">
                <div className="flex gap-[15px] items-center">
                  {passSelectedFolderId === folder.id && <Bar />}
                  <Folder />
                  <h4 className="text-[#DFDFDF] text-[12px] leading-[32px] font-[400] dm-sans">
                    {folder.title}
                  </h4>
                </div>
              </div>
            </button>
            <span
              onClick={() => {
                handleOpenDeleteModal(folder.id);
              }}
              className="absolute right-[15px]"
            >
              <Recycle />
            </span>
          </li>
        ))}
      </ul>
      <div
        onClick={() => handleCreateFolderModal()}
        className="fixed right-[20px] bottom-[20px]"
      >
        <Add />
      </div>
    </section>
  );
}

export default FoldersList;

const Folder = () => (
  <svg
    width="48"
    height="43"
    viewBox="0 0 48 43"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="48" height="43" rx="12" fill="#0E1A60" />
    <path
      d="M17.2291 25.0773H31.5396C32.1989 25.0773 32.7326 24.5437 32.7326 23.8843V12H16.0361V23.8843C16.0361 24.5437 16.5698 25.0773 17.2291 25.0773Z"
      fill="#FFEA00"
    />
    <path
      d="M15.7105 26.5951H30.0211C30.6804 26.5951 31.214 26.0615 31.214 25.4022V13.5178H14.5176V25.4022C14.5176 26.0615 15.0512 26.5951 15.7105 26.5951Z"
      fill="#FFFF8D"
    />
    <path
      d="M34.25 19.6605V28.7676C34.25 29.6048 33.5693 30.2855 32.7321 30.2855H14.5179C13.6807 30.2855 13 29.6048 13 28.7676V16.5489C13 15.7117 13.6807 15.031 14.5179 15.031H22.6787C23.2598 15.031 23.7886 15.3607 24.0424 15.8824L25.1452 18.1426H32.7321C33.5693 18.1426 34.25 18.8233 34.25 19.6605Z"
      fill="#FFBC10"
    />
    <path
      d="M28.1786 19.5893C28.1786 19.0984 28.1454 18.6146 28.0813 18.1426H25.1452L24.0424 15.8824C23.7886 15.3607 23.2574 15.031 22.6787 15.031H14.5179C13.6807 15.031 13 15.7117 13 16.5489V28.7676C13 28.9265 13.0237 29.0807 13.0711 29.2253C14.4325 29.8586 15.9527 30.2143 17.5536 30.2143C23.421 30.2143 28.1786 25.4568 28.1786 19.5893Z"
      fill="#FFD058"
    />
  </svg>
);
const Folders = ({ className }) => (
  <svg
    width="22"
    height="19"
    viewBox="0 0 22 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M8.14286 10.9167H13.8571M11 13.8293V8.08333M1 2.41667V15.1667C1 15.9181 1.30102 16.6388 1.83684 17.1701C2.37266 17.7015 3.09938 18 3.85714 18H18.1429C18.9006 18 19.6273 17.7015 20.1632 17.1701C20.699 16.6388 21 15.9181 21 15.1667V6.66242C20.9996 5.91121 20.6984 5.19091 20.1627 4.65986C19.6269 4.12882 18.9004 3.8305 18.1429 3.8305L11 3.83333L8.14286 1H2.42857C2.04969 1 1.68633 1.14926 1.41842 1.41493C1.15051 1.68061 1 2.04094 1 2.41667Z"
      stroke="white"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const Recycle = ({ className }) => (
  <svg
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M6.04167 1.89H5.83333C5.94792 1.89 6.04167 1.7955 6.04167 1.68V1.89ZM6.04167 1.89H13.9583V1.68C13.9583 1.7955 14.0521 1.89 14.1667 1.89H13.9583V3.78H15.8333V1.68C15.8333 0.753375 15.0859 0 14.1667 0H5.83333C4.91406 0 4.16667 0.753375 4.16667 1.68V3.78H6.04167V1.89ZM19.1667 3.78H0.833333C0.372396 3.78 0 4.15538 0 4.62V5.46C0 5.5755 0.09375 5.67 0.208333 5.67H1.78125L2.42448 19.3988C2.46615 20.2939 3.20052 21 4.08854 21H15.9115C16.8021 21 17.5339 20.2965 17.5755 19.3988L18.2187 5.67H19.7917C19.9062 5.67 20 5.5755 20 5.46V4.62C20 4.15538 19.6276 3.78 19.1667 3.78ZM15.7109 19.11H4.28906L3.65885 5.67H16.3411L15.7109 19.11Z"
      fill="#E14210"
    />
  </svg>
);
const Bar = ({ className }) => (
  <svg
    width="4"
    height="19"
    viewBox="0 0 4 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`bar ${className}`}
  >
    <path d="M2 2V17.5" stroke="white" strokeWidth="3" strokeLinecap="round" />
  </svg>
);
const Add = () => (
  <svg
    width="63"
    height="63"
    viewBox="0 0 63 63"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="31.5" cy="31.5" r="31.5" fill="url(#paint0_linear_403_6830)" />
    <path
      d="M25.1019 33.86V31.872H30.4499V26.776H32.5499V31.872H37.8979V33.86H32.5499V38.984H30.4499V33.86H25.1019Z"
      fill="white"
    />
    <defs>
      <linearGradient
        id="paint0_linear_403_6830"
        x1="31.5"
        y1="0"
        x2="31.5"
        y2="63"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#A143FF" />
        <stop offset="1" stopColor="#5003DB" />
      </linearGradient>
    </defs>
  </svg>
);
