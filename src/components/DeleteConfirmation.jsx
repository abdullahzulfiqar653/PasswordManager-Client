import React, { useState } from "react";

import { useAuth } from "../AuthContext";
import useGetFolders from "../hooks/useGetFolders";
import useDeleteFolders from "../hooks/useDeleteFolder";

import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

function DeleteConfirmation({ hideModal }) {
  const { selectedFolderId } = useAuth();
  const { refetch } = useGetFolders();
  const { mutate } = useDeleteFolders();
  const [loading, setLoading] = useState(false);

  const deleteButtonClick = () => {
    if (!selectedFolderId) return;
    setLoading(true);
    mutate(selectedFolderId, {
      onSuccess: () => {
        setLoading(false);
        toast.success("Folder Deleted Successfully.", {
          className: "toast-message",
        });
        refetch();
        hideModal();
      },
      onError: (error) => {
        setLoading(false);
        toast.error("Error deleting folder.");
      },
    });
  };

  return (
    <section className="fixed inset-0 flex justify-center items-center bg-[#0000006B] z-50 px-[20px]">
      <section className="bg-[#101E71] relative w-full max-w-[853px] h-[338px] sm:h-[448px] rounded-[5px] flex flex-col justify-center items-center">
        <span
          className="absolute right-[17px] top-[17px] cursor-pointer"
          onClick={hideModal}
        >
          <Cross />
        </span>
        <section className="flex flex-col justify-center text-center mb-7 sm:mb-12">
          <h1 className="text-white leading-[20px] sm:leading-[44.7px] text-[20px] sm:text-[32px] mb-4">
            Are you sure you want to delete <br /> this folder?
          </h1>
          <p className="font-sans text-white px-5 max-w-[600px] leading-[20.83px] text-[11px] sm:text-[16px]">
            If you will delete this folder then existing passwords and the
            accounts will delete automatically. Are you sure you want to delete?
          </p>
        </section>

        <section className="mt-[0px] sm:mt-[20px] w-full flex items-center justify-center gap-[9px] sm:gap-[36px] flex-wrap">
          <button
            className="dm-sans  bg-[#0E1956] w-[125px] h-[40px] sm:w-[254px] sm:h-[58px] rounded-[6.23px] sm:rounded-[18.37px] outline-none 
            border-none flex items-center justify-center text-[12px] sm:text-[15.5px] 
             font-[400] text-white"
            onClick={hideModal}
          >
            Cancel
          </button>
          <button
            onClick={deleteButtonClick}
            style={{
              background: loading
                ? "#0E1956" // Disabled background color
                : "linear-gradient(90deg, #A143FF 0%, #5003DB 100%)", // Active color gradient
              cursor: loading ? "not-allowed" : "pointer", // Cursor change when loading
            }}
            disabled={loading} // Disable button when loading or blocked
            className="dm-sans w-[125px] h-[40px] sm:w-[254px] sm:h-[58px] rounded-[6.23px] sm:rounded-[18.37px] outline-none border-none flex items-center justify-center text-[12px] sm:text-[16px] text-white"
          >
            Delete
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

export default DeleteConfirmation;

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
