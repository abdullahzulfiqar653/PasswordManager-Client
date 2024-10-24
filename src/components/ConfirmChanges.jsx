import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import useUpdatePassword from "../hooks/useUpdatePassword";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

function ConfirmChanges({ hideModal }) {
  const { setGeneratorPassword, data, setData } = useAuth();
  const { mutate } = useUpdatePassword();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const clickToConfirm = () => {
    setLoading(true);
    mutate(data, {
      onSuccess: () => {
        setLoading(false);
        setGeneratorPassword("");
        toast.success(`Password updated successfully.`, {
          className: "toast-message",
        });

        hideModal();
        navigate("/dashboard/folders");
      },

      onError: (error) => {
        setLoading(false);
        Object.values(error.response.data).forEach((errorArray) => {
          toast.error(errorArray[0], {
            className: "toast-message",
          });
        });
      },
    });
  };
  return (
    <section className="fixed inset-0 flex justify-center items-center bg-[#0000006B] z-50 px-[20px]">
      <section className="bg-[#101E71] relative w-full max-w-[591px] h-[280px] sm:h-[318px] rounded-[5px] flex flex-col justify-center items-center">
        <span
          className="absolute right-[17px] top-[17px] cursor-pointer"
          onClick={hideModal}
        >
          <Cross />
        </span>
        <section className="flex flex-col max-w-[450px] mx-5 justify-center text-center mb-5">
          <h1 className="text-white leading-[20px] sm:leading-[44.7px] text-[20px] sm:text-[32px] mb-4">
            Would you like to save changes to this entry?
          </h1>
        </section>

        <section className="mt-[0px] sm:mt-[20px] w-full flex items-center justify-center gap-[9px] sm:gap-[36px] flex-wrap">
          <button
            className="dm-sans  bg-[#0E1956] w-[125px] h-[40px] sm:w-[141px] sm:h-[50px]  rounded-[6.23px] sm:rounded-[15px] outline-none 
          border-none flex items-center justify-center text-[12px] sm:text-[15.5px] 
           font-[400] text-white"
            onClick={hideModal}
          >
            Cancel
          </button>
          <button
            onClick={clickToConfirm}
            style={{
              background: loading
                ? "#0E1956"
                : "linear-gradient(90deg, #A143FF 0%, #5003DB 100%)",
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={loading}
            className="dm-sans w-[125px] h-[40px] sm:w-[141px] sm:h-[50px] rounded-[6.23px] sm:rounded-[15px] outline-none 
          border-none flex items-center justify-center text-[12px] sm:text-[15.5px]  text-white"
          >
            {loading && (
              <ThreeDots
                color="white"
                height={10}
                width={25}
                ariaLabel="loading"
                wrapperStyle={{ marginLeft: "5%" }}
              />
            )}
            Okay
          </button>
        </section>
      </section>
    </section>
  );
}

export default ConfirmChanges;

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
