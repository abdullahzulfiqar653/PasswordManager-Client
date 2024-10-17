import React from "react";

function DeleteConfirmation({ hideModal }) {
  return (
    <section className="fixed inset-0 flex justify-center items-center bg-[#0000006B] z-50 px-[20px]">
      <section className="bg-[#101E71] relative w-full max-w-[853px] h-[448px] rounded-[5px] flex flex-col justify-center items-center">
        <span
          className="absolute right-[17px] top-[17px] cursor-pointer"
          onClick={hideModal}
        >
          <Cross />
        </span>
        <section className="flex flex-col justify-center text-center mb-12">
          <h1 className="text-white leading-[44.7px] text-[32px] mb-4">
            Are you sure you want to delete <br /> this folder?
          </h1>
          <p className="font-sans text-white leading-[20.83px] text-[16px]">
            If you will delete this folder then existing passwords and the
            accounts will
            <br /> delete automatically. Are you sure you want to delete?
          </p>
        </section>

        <section className="mt-[20px] w-full flex items-center justify-center gap-[9px] sm:gap-[36px] flex-wrap">
          <button
            className="dm-sans  bg-[#0E1956] w-[254px] h-[58px] sm:w-[254px] sm:h-[58px] rounded-[6.23px] sm:rounded-[18.37px] outline-none 
            border-none flex items-center justify-center text-[9px] sm:text-[15.5px] 
             font-[400] text-white"
            onClick={hideModal}
          >
            Cancel
          </button>
          <button
            style={{
              background: ` linear-gradient(90deg, #A143FF 0%, #5003DB 100%)`,
            }}
            className="dm-sans w-[254px] h-[58px] sm:w-[254px] sm:h-[58px] rounded-[6.23px] sm:rounded-[18.37px] outline-none 
            border-none flex items-center justify-center text-[9px] sm:text-[15.5px]  text-white"
          >
            Delete
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
