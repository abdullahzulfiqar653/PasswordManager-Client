import React from "react";
import { useAuth } from "../AuthContext";
import useDeletePasswords from "../hooks/useDeletePasswords";
import { toast } from "react-toastify";
import useGetUserPasswords from "../hooks/useGetUserPasswords";

function DeletePassword({ hideModal }) {
  const { selectPasswordsId, setSelectedPasswordsId } = useAuth();
  const { mutate } = useDeletePasswords();
  const { refetch } = useGetUserPasswords();
  const deleteButtonClick = () => {
    if (!selectPasswordsId) return;
    const payload = {
      passwords: selectPasswordsId,
    };
    mutate(payload, {
      onSuccess: () => {
        toast.success(
          `${
            selectPasswordsId.length === 1 ? "Password" : "Passwords"
          } Deleted Successfully.`,
          {
            className: "toast-message",
          }
        );
        refetch();
        hideModal();
        setSelectedPasswordsId([]);
      },
      onError: (error) => {
        toast.error("Error deleting Password.");
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
        <section className="flex flex-col justify-center items-center text-center mb-7 sm:mb-12">
          <h1 className="text-white leading-[20px] sm:leading-[44.7px] text-[20px] sm:text-[32px] mb-4">
            Are you sure you want to delete this <br /> account password record?
          </h1>
          <p className="font-sans text-white px-5 leading-[20.83px] text-[11px] sm:text-[16px]">
            Are you sure you want to delete this account password?
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
              background: ` linear-gradient(90deg, #A143FF 0%, #5003DB 100%)`,
            }}
            className="dm-sans  w-[125px] h-[40px] sm:w-[254px] sm:h-[58px] rounded-[6.23px] sm:rounded-[18.37px] outline-none 
          border-none flex items-center justify-center text-[12px] sm:text-[15.5px]  text-white"
          >
            Delete
          </button>
        </section>
      </section>
    </section>
  );
}

export default DeletePassword;

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
