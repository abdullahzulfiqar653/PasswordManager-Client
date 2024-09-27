import React, { useEffect, useState } from "react";
import useGenerateRandomPassword from "../hooks/useGenerateRandomPassword";
import { toast } from "react-toastify";

function GeneratePassword({ hideModal, setGeneratorPassword,triggerSource }) {
  const [copytext, setCopyText] = useState(false);
  const { mutate, data } = useGenerateRandomPassword();
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const passwordVisibilityHandler = () =>
    setIsPasswordShow((preValue) => !preValue);

  const [passwordCriteria, setPasswordCriteria] = useState({
    length: 10,
    is_alphabets: true,
    is_lowercase: false,
    is_uppercase: false,
    is_numeric: false,
    is_special: false,
  });

  const handleClick = (e) => {
    const { name, value } = e.target;
    setPasswordCriteria({
      ...passwordCriteria,
      [name]: value ? value : !passwordCriteria[name],
    });
  };

  const getPasswordQuality = () => {
    let quality = "";
    const length = passwordCriteria["length"];
    if (length === 10) {
      quality = "Fair";
    } else if (length >= 13 && length < 20) {
      quality = "Good";
    } else if (length >= 20 && length < 25) {
      quality = "Very strong";
    } else if (length >= 25 && length <= 31) {
      quality = "Excellent";
    } else {
      quality = "Unknown";
    }

    return quality;
  };

  const handleSubmit = () => {
    mutate(passwordCriteria);
  };

  useEffect(() => {
    mutate(passwordCriteria);
  }, [passwordCriteria]);

  const copyToClipBoard = () => {
    setCopyText(true);
    navigator.clipboard.writeText(data?.password);
    setTimeout(() => {
      setCopyText(false);
    }, [700]);
  };

  return (
    <section className="fixed inset-0 flex justify-center items-center bg-[#0000006B] z-50 px-[20px]">
      <section className="bg-[#101E71] relative w-full max-w-[973px] px-[8px] py-[20px] sm:p-[20px] rounded-[5px] flex flex-col items-center">
        <h4 className="flex items-center gap-[9px] text-white text-[18px] sm:text-[22px] font-[400] text-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.4902 2.23006L5.50016 4.11006C4.35016 4.54006 3.41016 5.90006 3.41016 7.12006V14.5501C3.41016 15.7301 4.19016 17.2801 5.14016 17.9901L9.44016 21.2001C10.8502 22.2601 13.1702 22.2601 14.5802 21.2001L18.8802 17.9901C19.8302 17.2801 20.6102 15.7301 20.6102 14.5501V7.12006C20.6102 5.89006 19.6702 4.53006 18.5202 4.10006L13.5302 2.23006C12.6802 1.92006 11.3202 1.92006 10.4902 2.23006Z"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 12.5C13.1046 12.5 14 11.6046 14 10.5C14 9.39543 13.1046 8.5 12 8.5C10.8954 8.5 10 9.39543 10 10.5C10 11.6046 10.8954 12.5 12 12.5Z"
              stroke="white"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 12.5V15.5"
              stroke="white"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Generate Password
        </h4>
        <span
          className="absolute right-[17px] top-[17px] cursor-pointer"
          onClick={hideModal}
        >
          <Cross />
        </span>
        <section className="mt-[40px] sm:mt-[7px] w-full flex flex-col gap-[3px]">
          <span className="text-white font-[400] text-[10px] sm:text-[16px] dm-sans">
            Password Quality: {getPasswordQuality()}
          </span>
          <section className="w-full flex flex-wrap justify-between items-center gap-[4px] sm:gap-[11px]">
            <div className="relative password-input flex-1">
              <input
                value={data?.password}
                disabled
                type={isPasswordShow ? "text" : "password"}
                className="relative w-full dm-sans rounded-[10px] outline-none bg-[#0E1A60] py-[10px] sm:py-[12px] px-[7px] sm:px-[17px] placeholder:text-[#DFDFDF36] text-white text-[9px] sm:text-[16px] font-[400]"
              />
              <span
                onClick={passwordVisibilityHandler}
                className="cursor-pointer absolute top-[50%] right-[13px] translate-y-[-50%]"
              >
                {isPasswordShow ? <OpenEye /> : <CloseEye />}
              </span>
              <div
                className="absolute bottom-0 left-0 h-[4px] rounded-b-[10px]"
                style={{
                  width: `${(passwordCriteria["length"] / 31) * 100}%`, // Dynamically set width based on the percentage
                  background:
                    "linear-gradient(90deg, #5003db 0%, #a143ff 100%)",
                }}
              />
            </div>
            <section className="flex gap-[4px] sm:gap-[10px] items-center">
              {(passwordCriteria.is_alphabets ||
                passwordCriteria.is_lowercase ||
                passwordCriteria.is_numeric ||
                passwordCriteria.is_special ||
                passwordCriteria.is_uppercase) && (
                <button
                  onClick={handleSubmit}
                  className="w-[25px] h-[32px] sm:w-[62px] sm:h-[55px] flex items-center justify-center rounded-[10px] bg-[#0E1A60] border-none outline-none"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[8px] h-[9px] sm:w-[26px] sm:h-[26px]"
                  >
                    <path
                      d="M17.0607 2.9375C16.135 2.00606 15.0339 1.26695 13.821 0.762789C12.6081 0.258627 11.3074 -0.000617944 9.99375 1.10606e-06C4.46529 1.10606e-06 0 4.475 0 10C0 15.525 4.46529 20 9.99375 20C14.6592 20 18.5491 16.8125 19.6623 12.5H17.0607C16.5454 13.9619 15.5889 15.228 14.3231 16.1235C13.0573 17.0191 11.5446 17.5001 9.99375 17.5C5.85366 17.5 2.48906 14.1375 2.48906 10C2.48906 5.8625 5.85366 2.5 9.99375 2.5C12.07 2.5 13.9212 3.3625 15.272 4.725L11.2445 8.75H20V1.10606e-06L17.0607 2.9375Z"
                      fill="white"
                    />
                  </svg>
                </button>
              )}
              <button
                onClick={copyToClipBoard}
                className="w-[25px] h-[32px] sm:w-[62px] sm:h-[55px] flex items-center justify-center rounded-[10px] bg-[#0E1A60] border-none outline-none"
              >
                {!copytext ? (
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[8px] h-[9px] sm:w-[26px] sm:h-[26px]"
                  >
                    <path
                      d="M21.3072 5.52527H8.74962C6.96893 5.52527 5.52539 6.96881 5.52539 8.7495V21.307C5.52539 23.0877 6.96893 24.5313 8.74962 24.5313H21.3072C23.0879 24.5313 24.5314 23.0877 24.5314 21.307V8.7495C24.5314 6.96881 23.0879 5.52527 21.3072 5.52527Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19.9777 5.52524L20.006 4.16767C20.0036 3.32828 19.6691 2.52396 19.0756 1.93043C18.482 1.33689 17.6777 1.00239 16.8383 1H4.62019C3.66093 1.00284 2.74177 1.38516 2.06346 2.06346C1.38516 2.74177 1.00284 3.66093 1 4.62019V16.8383C1.00239 17.6777 1.33689 18.482 1.93043 19.0756C2.52396 19.6691 3.32828 20.0036 4.16767 20.006H5.52524"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.2606 4.84595H7.58793C6.07452 4.84595 4.84766 6.07281 4.84766 7.58622V18.2589C4.84766 19.7723 6.07452 20.9991 7.58793 20.9991H18.2606C19.774 20.9991 21.0008 19.7723 21.0008 18.2589V7.58622C21.0008 6.07281 19.774 4.84595 18.2606 4.84595Z"
                      stroke="white"
                      strokeOpacity="0.63"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.1291 4.84599L17.1532 3.6922C17.1511 2.97881 16.8669 2.29521 16.3624 1.79077C15.858 1.28632 15.1744 1.00203 14.461 1H4.0768C3.26152 1.00241 2.48032 1.32734 1.90383 1.90383C1.32734 2.48032 1.00241 3.26152 1 4.0768V14.461C1.00203 15.1744 1.28632 15.858 1.79077 16.3624C2.29521 16.8669 2.97881 17.1511 3.6922 17.1532H4.84599"
                      stroke="white"
                      strokeOpacity="0.63"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </section>
          </section>
        </section>
        <section className="mt-[40px] w-full flex flex-col gap-[3px]">
          <span className="text-white font-[400] text-[10px] sm:text-[16px] dm-sans">
            Password settings
          </span>
          <section className="w-full flex gap-[15px] sm:gap-[20px] flex-wrap justify-between items-center">
            <section className="flex-1 flex items-baseline gap-[10px]">
              <span className="w-[30px] sm:w-[71px] text-[#90BCFF] font-[400] dm-sans text-[8px] sm:text-[16px]">
                Length
              </span>
              <section className="relative flex-1 flex flex-col gap-[3px]">
                <span className="relative w-full">
                  <input
                    name="length"
                    onChange={handleClick}
                    type="range"
                    className="custom-range"
                    min="10"
                    max="31"
                    step="3"
                    value={passwordCriteria["length"]}
                  />
                </span>
              </section>
            </section>
            <section className="flex justify-between pl-[23px] sm:pl-[40px] pr-[10px] sm:pr-[17px] items-center w-[84px] sm:w-[204px] min-h-[33px] sm:min-h-[55px] bg-[#0E1A60] rounded-[10px]">
              <span className="w-[29px] sm:w-[70px] dm-sans text-[12px] sm:text-[22px] text-white font-[400]">
                {passwordCriteria.length}
              </span>
              <div className="flex flex-col gap-[5px]">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setPasswordCriteria({
                      ...passwordCriteria,
                      ["length"]:
                        passwordCriteria["length"] < 31
                          ? passwordCriteria["length"] + 3
                          : 31,
                    });
                  }}
                >
                  <svg
                    width="11"
                    height="8"
                    viewBox="0 0 11 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[4.57px] h-[4.57px] sm:w-[11px] sm:h-[8px]"
                  >
                    <path
                      d="M0.550331 8H10.4506C10.5508 7.99969 10.6491 7.97284 10.7348 7.92233C10.8205 7.87181 10.8904 7.79955 10.9369 7.71333C10.9835 7.6271 11.005 7.53017 10.999 7.43297C10.9931 7.33577 10.96 7.24198 10.9033 7.1617L5.95314 0.215985C5.74798 -0.0719951 5.25407 -0.0719951 5.04836 0.215985L0.0982183 7.1617C0.0409204 7.24182 0.00731955 7.33565 0.00106644 7.43301C-0.00518667 7.53037 0.0161471 7.62754 0.06275 7.71395C0.109353 7.80036 0.179442 7.87271 0.265403 7.92314C0.351364 7.97357 0.449909 8.00015 0.550331 8Z"
                      fill="white"
                    />
                  </svg>
                </span>
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setPasswordCriteria({
                      ...passwordCriteria,
                      ["length"]:
                        passwordCriteria["length"] > 10
                          ? passwordCriteria["length"] - 3
                          : 10,
                    });
                  }}
                >
                  <svg
                    width="11"
                    height="8"
                    viewBox="0 0 11 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[4.57px] h-[4.57px] sm:w-[11px] sm:h-[8px]"
                  >
                    <path
                      d="M10.4497 1.43051e-06L0.549387 1.43051e-06C0.449152 0.000306606 0.3509 0.0271616 0.265207 0.0776749C0.179515 0.128188 0.109627 0.200447 0.0630665 0.286674C0.0165052 0.372901 -0.00496578 0.469831 0.000965118 0.56703C0.00689602 0.664229 0.0400038 0.758016 0.0967245 0.838296L5.04686 7.78401C5.25202 8.072 5.74593 8.072 5.95164 7.78401L10.9018 0.838296C10.9591 0.758183 10.9927 0.664349 10.9989 0.566988C11.0052 0.469627 10.9839 0.372464 10.9372 0.286054C10.8906 0.199645 10.8206 0.127293 10.7346 0.0768614C10.6486 0.0264301 10.5501 -0.000152588 10.4497 1.43051e-06Z"
                      fill="white"
                    />
                  </svg>
                </span>
              </div>
            </section>
          </section>
        </section>
        <section className="mt-[24px] w-full flex flex-col gap-[3px]">
          <span className="text-white font-[400] text-[10px] sm:text-[16px] dm-sans">
            Character Type
          </span>
          <section className="border-[1px] w-full min-h-[70px] sm:min-h-[116px] border-[#194D9E] px-[8px] sm:px-[19px] py-[20px] sm:py-[32px] flex  flex-wrap ustify-between items-center gap-[19px] sm:gap-[30px]">
            <section className="flex flex-1 gap-[5px] sm:gap-[14px] items-center flex-wrap justify-between">
              <button
                name="is_uppercase"
                onClick={handleClick}
                className={`dm-sans flex-1 h-[30px] sm:h-[50px] rounded-[6.23px] sm:rounded-[15px] outline-none 
              border-none flex items-center justify-center text-[11px] sm:text-[17px] 
               font-[400] text-white hover:bg-[#091246]
               ${
                 passwordCriteria.is_uppercase
                   ? "bg-[linear-gradient(90deg,_#A143FF_0%,_#5003DB_100%)]"
                   : "bg-[#0E1A60]"
               }
               `}
              >
                A - Z
              </button>
              <button
                name="is_lowercase"
                onClick={handleClick}
                className={`dm-sans flex-1 h-[30px] sm:h-[50px] rounded-[6.23px] sm:rounded-[15px] outline-none 
                  border-none flex items-center justify-center text-[11px] sm:text-[17px] 
                   font-[400] text-white hover:bg-[#091246]
                   ${
                     passwordCriteria.is_lowercase
                       ? "bg-[linear-gradient(90deg,_#A143FF_0%,_#5003DB_100%)]"
                       : "bg-[#0E1A60]"
                   }
                   `}
              >
                a - z
              </button>
              <button
                name="is_numeric"
                onClick={handleClick}
                className={`dm-sans flex-1 h-[30px] sm:h-[50px] rounded-[6.23px] sm:rounded-[15px] outline-none 
                  border-none flex items-center justify-center text-[11px] sm:text-[17px] 
                   font-[400] text-white hover:bg-[#091246]
                   ${
                     passwordCriteria.is_numeric
                       ? "bg-[linear-gradient(90deg,_#A143FF_0%,_#5003DB_100%)]"
                       : "bg-[#0E1A60]"
                   }
                   `}
              >
                0 - 9
              </button>
              <button
                name="is_special"
                onClick={handleClick}
                className={`dm-sans flex-1 h-[30px] sm:h-[50px] rounded-[6.23px] sm:rounded-[15px] outline-none 
                  border-none flex items-center justify-center text-[11px] sm:text-[17px] 
                   font-[400] text-white hover:bg-[#091246]
                   ${
                     passwordCriteria.is_special
                       ? "bg-[linear-gradient(90deg,_#A143FF_0%,_#5003DB_100%)]"
                       : "bg-[#0E1A60]"
                   }
                   `}
              >
                \*_&
              </button>
            </section>
            <button
              name="is_alphabets"
              onClick={handleClick}
              className={`dm-sans w-[78px] h-[29px] sm:w-[167px] sm:h-[43px] rounded-[6.23px] sm:rounded-[15px] outline-none 
              border-none flex items-center justify-center text-[8px] sm:text-[15px] 
              font-[400] text-white hover:bg-[#091246]
                ${
                     passwordCriteria.is_alphabets
                       ? "bg-[linear-gradient(90deg,_#A143FF_0%,_#5003DB_100%)]"
                       : "bg-[#0E1A60]"
                   }`}
            >
              Extended ASCII
            </button>
          </section>
        </section>
        <section className="mt-[20px] w-full flex items-center justify-end gap-[9px] sm:gap-[20px] flex-wrap">
          <button
            className="dm-sans  bg-[#0E1A60] w-[70px] h-[30px] sm:w-[140px] sm:h-[50px] rounded-[6.23px] sm:rounded-[15px] outline-none 
            border-none flex items-center justify-center text-[9px] sm:text-[15px] 
             font-[400] text-white"
            onClick={hideModal}
          >
            Close
          </button>
         {triggerSource === 'form' && <button
            className="dm-sans  bg-[linear-gradient(90deg,_#A143FF_0%,_#5003DB_100%)] w-[85px] h-[30px] sm:w-[140px] sm:h-[50px] rounded-[6.23px] sm:rounded-[15px] outline-none 
              border-none flex items-center justify-center text-[9px] sm:text-[15px]
               font-[400] text-white"
            disabled={!data?.password}
            onClick={() => {
              setGeneratorPassword(data?.password);
              hideModal();
              toast.success(
                "Password applied successfully in the password form.",
                { className: "toast-message" }
              );
            }}
          >
            Apply Password
          </button>}
        </section>
      </section>
    </section>
  );
}

export default GeneratePassword;

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
const CloseEye = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[10px] h-[10px] sm:w-[24px] sm:h-[24px]"
  >
    <path
      d="M14.5299 9.47004L9.46992 14.53C8.81992 13.88 8.41992 12.99 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C12.9899 8.42004 13.8799 8.82004 14.5299 9.47004Z"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.8198 5.76998C16.0698 4.44998 14.0698 3.72998 11.9998 3.72998C8.46984 3.72998 5.17984 5.80998 2.88984 9.40998C1.98984 10.82 1.98984 13.19 2.88984 14.6C3.67984 15.84 4.59984 16.91 5.59984 17.77"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.41992 19.5301C9.55992 20.0101 10.7699 20.2701 11.9999 20.2701C15.5299 20.2701 18.8199 18.1901 21.1099 14.5901C22.0099 13.1801 22.0099 10.8101 21.1099 9.40005C20.7799 8.88005 20.4199 8.39005 20.0499 7.93005"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.5104 12.7C15.2504 14.11 14.1004 15.26 12.6904 15.52"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.47 14.53L2 22"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.0003 2L14.5303 9.47"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const OpenEye = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[10px] h-[10px] sm:w-[24px] sm:h-[24px]"
  >
    <path
      d="M14.5299 9.47004L9.46992 14.53C8.81992 13.88 8.41992 12.99 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C12.9899 8.42004 13.8799 8.82004 14.5299 9.47004Z"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.8198 5.76998C16.0698 4.44998 14.0698 3.72998 11.9998 3.72998C8.46984 3.72998 5.17984 5.80998 2.88984 9.40998C1.98984 10.82 1.98984 13.19 2.88984 14.6C3.67984 15.84 4.59984 16.91 5.59984 17.77"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.41992 19.5301C9.55992 20.0101 10.7699 20.2701 11.9999 20.2701C15.5299 20.2701 18.8199 18.1901 21.1099 14.5901C22.0099 13.1801 22.0099 10.8101 21.1099 9.40005C20.7799 8.88005 20.4199 8.39005 20.0499 7.93005"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.5104 12.7C15.2504 14.11 14.1004 15.26 12.6904 15.52"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
