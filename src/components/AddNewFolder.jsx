import React, { useState } from "react";

import useGetFolders from "../hooks/useGetFolders";
import useCreateFolder from "../hooks/useCreateFolder";

import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

function AddNewFolder({ hideModal }) {
  const { refetch } = useGetFolders();
  const { mutate } = useCreateFolder();
  const [folderName, setFolderName] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const onClickAddButton = () => {
    setLoading(true);
    mutate(
      { title: folderName },
      {
        onSuccess: () => {
          refetch();
          hideModal();
          toast.success("Folder Created Successfully.", {
            className: "toast-message",
          });
          setLoading(false);
          setFolderName("");
        },
        onError: (error) => {
          setLoading(false);
          setErrors(error.response.data);
          toast.error(
            error.response.data?.error
              ? error.response.data?.error[0]
              : "Please fix the error mentioned.",
            {
              className: "toast-message",
            }
          );
        },
      }
    );
  };
  return (
    <section className="fixed inset-0 flex justify-center items-center bg-[#0000006B] z-50 px-[20px]">
      <section className="bg-[#101E71] relative w-full max-w-[700px] h-[290px] sm:h-[348px] rounded-[5px] flex flex-col justify-center">
        <span
          className="absolute right-[17px] top-[17px] cursor-pointer"
          onClick={() => {
            hideModal();
            setFolderName("");
          }}
        >
          <Cross />
        </span>
        <section className="flex flex-col justify-center mx-8 sm:mx-16 text-start mb-7">
          <h1 className="text-white text-start leading-[44.7px] text-[20px] sm:text-[32px] mb-9">
            Add New Folder
          </h1>
          <div className="gap-[5px]">
            <label htmlFor="" className="text-white text-[12px] font-sans">
              Folder Name
            </label>
            <input
              value={folderName}
              name="foldername"
              className="w-full dm-sans border-[1px] mb-2 h-[38.86px] rounded-[10px] border-[#374CC4] outline-none bg-[#0E1956] py-[5px] px-[5px] placeholder:text-[#DFDFDF36] text-white text-[16px] leading-[32px] font-[400]"
              onChange={(e) => {
                setFolderName(e.target.value);
                setErrors({});
              }}
            />
            {errors.title && (
              <span className="text-red-500 text-[12px]">
                {errors.title[0]}
              </span>
            )}
          </div>
        </section>

        <section className="mt-[20px] w-full flex items-center justify-center gap-[9px] sm:gap-[36px] flex-wrap">
          <button
            className="dm-sans  bg-[#0E1956] w-[125px] h-[40px] sm:w-[254px] sm:h-[58px] rounded-[6.23px] sm:rounded-[18.37px] outline-none 
          border-none flex items-center justify-center text-[12px] sm:text-[16px] 
           font-[400] text-white"
            onClick={() => {
              hideModal();
              setFolderName("");
            }}
          >
            Cancel
          </button>
          <button
            onClick={onClickAddButton}
            style={{
              background: loading
                ? "#0E1956" // Disabled background color
                : "linear-gradient(90deg, #A143FF 0%, #5003DB 100%)", // Active color gradient
              cursor: loading ? "not-allowed" : "pointer", // Cursor change when loading
            }}
            disabled={loading} // Disable button when loading or blocked
            className="dm-sans w-[125px] h-[40px] sm:w-[254px] sm:h-[58px] rounded-[6.23px] sm:rounded-[18.37px] outline-none border-none flex items-center justify-center text-[12px] sm:text-[16px] text-white"
          >
            Add
            {loading && (
              <ThreeDots
                color="white"
                height={10}
                width={35}
                ariaLabel="loading"
                wrapperStyle={{ marginLeft: "5%" }}
              />
            )}
          </button>
        </section>
      </section>
    </section>
  );
}

export default AddNewFolder;

const Cross = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[10px] h-[10px] sm:w-[20px] sm:h-[20px]"
  >
    <path
      d="M1 19L19 1M1 1L19 19"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
