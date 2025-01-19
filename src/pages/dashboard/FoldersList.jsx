import React, { useEffect } from "react";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import { FolderF, Folders, Recycle, Bar, Add } from "../../assets/icons";
import { useAuth } from "../../AuthContext";
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
                  handleFolderSelection(folder);
                  setSearch("");
                }}
                className={`h-[54px] max-w-[296px] flex cursor-pointer items-center py-[6px] px-[13px] pl-[21px] ${
                  passSelectedFolderId === folder.id
                    ? "active folder-wrapper"
                    : ""
                }`}
              >
                <div className="flex h-full w-full justify-between items-center">
                  <div className="flex gap-[15px] items-center relative">
                    {passSelectedFolderId === folder.id && (
                      <Bar className={"absolute left-[-12px]"} />
                    )}
                    <FolderF />
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
    <section className="w-full container flex flex-col gap-[15px]">
      {/* <PasswordFolder /> */}
      <h4 className="text-white text-[22px] mt-5 font-[400]">Folders</h4>
      <ul className="flex flex-col h-[420px] overflow-auto gap-[9px]">
        {data?.results.map((folder, index) => (
          <div className="relative">
            <li
              key={index}
              onClick={() => {
                handleFolderSelection(folder);
                setSearch("");
                navigate(`/dashboard/folders/${folder.id}`);
              }}
              className={`folder-wrapper bg-[#010E59] rounded-[9px] relative flex gap-[5px] items-center`}
            >
              <button
                className={`h-[54px] flex gap-[8px] items-center py-[6px] px-[13px] pl-[21px] ${
                  passSelectedFolderId === folder.id
                    ? "active folder-wrapper"
                    : ""
                }`}
              >
                <div className="flex h-full gap-[15px] items-center justify-between w-full">
                  <div className="flex gap-[15px] items-center relative">
                    {passSelectedFolderId === folder.id && (
                      <Bar className={"absolute left-[-12px]"} />
                    )}
                    <FolderF />
                    <h4 className="text-[#DFDFDF] text-[12px] leading-[32px] font-[400] dm-sans">
                      {folder.title}
                    </h4>
                  </div>
                </div>
              </button>
            </li>
            <span
              onClick={() => {
                handleOpenDeleteModal(folder.id);
              }}
              className="absolute right-[15px] top-4 z-20"
            >
              <Recycle />
            </span>{" "}
          </div>
        ))}
      </ul>
      <div className="flex justify-between">
        <div
          style={{
            background: `linear-gradient(90deg, #A143FF 0%, #5003DB 100%)`,
          }}
          onClick={handleConfirmLogoutModal}
          className="flex justify-start items-center text-[14px] rounded-[10px] h-10 px-2 mt-[15px] gap-[5px] text-white cursor-pointer "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-[15px] mb-[2px]"
          >
            <path
              fill="#ffffff"
              d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"
            />
          </svg>{" "}
          Logout
        </div>
        <div
          onClick={() => handleCreateFolderModal()}
          className="flex items-end text-end justify-end"
        >
          <Add />
        </div>
      </div>
    </section>
  );
}

export default FoldersList;
