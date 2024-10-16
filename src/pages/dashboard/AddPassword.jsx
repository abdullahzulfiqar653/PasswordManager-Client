import { useEffect, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useNavigate, useLocation } from "react-router-dom";

import { toast } from "react-toastify";
import { useAuth } from "../../AuthContext";
import useAddPassword from "../../hooks/useAddPassword";
import useUpdatePassword from "../../hooks/useUpdatePassword";

function AddPassword() {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [inputStr, setInputStr] = useState("");
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const { state } = location;
  const isUpdating = Boolean(state?.item);
  const [formData, setFormData] = useState({
    title: "",
    username: "",
    password: "",
    url: "",
    notes: null,
    emoji: "",
    ...state?.item,
  });
  const navigate = useNavigate();
  const {
    handleGeneratePassVisibility,
    generatorPassword,
    setGeneratorPassword,
  } = useAuth();

  const { mutate: addPassword } = useAddPassword();
  const { mutate: updatePassword } = useUpdatePassword();

  useEffect(() => {
    if (generatorPassword)
      setFormData((prevFormData) => ({
        ...prevFormData,
        password: generatorPassword,
      }));
  }, [generatorPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "notes" && !value) {
      setFormData({ ...formData, [name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mutationFn = isUpdating ? updatePassword : addPassword;
    mutationFn(formData, {
      onSuccess: () => {
        setGeneratorPassword("");
        navigate("/dashboard/folders");
        toast.success(
          `Password ${isUpdating ? "updated" : "added"} successfully.`,
          {
            className: "toast-message",
          }
        );
      },
      onError: (error) => {
        setErrors(error.response.data);
        toast.error(
          error.response.data?.error
            ? error.response.data?.error[0]
            : "Please fix the errors in mentioned fields.",
          {
            className: "toast-message",
          }
        );
      },
    });
  };

  const passwordVisibilityHandler = () => setIsPasswordShow((prev) => !prev);

  const onEmojiClick = (emojiObject) => {
    setInputStr((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
    const emojiCodePoint = emojiObject.emoji.codePointAt(0).toString(16);
    setFormData((prevFormData) => ({
      ...prevFormData,
      emoji: emojiCodePoint,
    }));
  };

  return (
    <section className="w-full relative flex mt-[20px] md:mt-[42px] pb-[56px] container gap-[7px]">
      <section className="w-full flex-1 flex flex-col md:gap-[20px]">
        <h4 className=" text-white  text-[22px]  md:text-[32px] leading-[64px] font-[400]">
          Root . Add Entry
        </h4>
        {/* <form onSubmit={handleSubmit} onC className="flex flex-col gap-[25px]"> */}
        <div className="flex flex-col md:gap-[38px] flex-wrap md:flex-row">
          <div className="flex-1 flex flex-col md:gap-[4px]">
            <label className="dm-sans text-[#DFDFDF] text-[9.77px] sm:text-[16px] leading-[19.54px] sm:leading-[32px] font-[400]">
              Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full dm-sans border-[1px] mb-2 md:mb-0 h-[37.86px] md:h-auto rounded-[10px] border-[#374CC4] outline-none bg-[#101E71] py-[15px] px-[12px] md:px-[24px] placeholder:text-[#DFDFDF36] text-white text-[16px] leading-[32px] font-[400]"
            />
            {errors.title && (
              <span className="text-red-500 text-[12px]">
                {errors.title[0]}
              </span>
            )}
          </div>
          <div className="flex-1 flex flex-col md:gap-[4px]">
            <label className="dm-sans text-[#DFDFDF] text-[9.77px] sm:text-[16px] leading-[19.54px] sm:leading-[32px] font-[400]">
              Username
            </label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full dm-sans border-[1px] mb-2 md:mb-0 h-[37.86px] md:h-auto rounded-[10px] border-[#374CC4] outline-none bg-[#101E71] py-[15px] px-[12px] md:px-[24px] placeholder:text-[#DFDFDF36] text-white text-[16px] leading-[32px] font-[400]"
            />
            {errors.username && (
              <span className="text-red-500 text-[12px]">
                {errors.username[0]}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col md:gap-[38px] flex-wrap md:flex-row">
          <div className="flex-1 flex flex-col md:gap-[4px]">
            <label className="dm-sans text-[#DFDFDF] text-[9.77px] sm:text-[16px] leading-[19.54px] sm:leading-[32px] font-[400]">
              Password
            </label>
            <div className="relative flex-1">
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type={isPasswordShow ? "text" : "password"}
                className="w-full dm-sans border-[1px] mb-2 md:mb-0 h-[37.86px] md:h-auto rounded-[10px] border-[#374CC4] outline-none bg-[#101E71] py-[15px] px-[12px] md:px-[24px] placeholder:text-[#DFDFDF36] text-white text-[16px] leading-[32px] font-[400]"
              />
              <span
                onClick={passwordVisibilityHandler}
                className="cursor-pointer absolute top-[50%] right-[13px] translate-y-[-50%]"
              >
                {isPasswordShow ? <OpenEye /> : <CloseEye />}
              </span>
              <span
                onClick={() => handleGeneratePassVisibility("form")}
                className="cursor-pointer absolute top-[50%] right-[38px] md:right-[50px] translate-y-[-50%]"
              >
                <Dice />
              </span>
            </div>
            {errors.password && (
              <span className="text-red-500 text-[12px]">
                {errors.password[0]}
              </span>
            )}
          </div>
          <div className="flex-1 flex flex-col md:gap-[4px]">
            <label className="dm-sans text-[#DFDFDF] text-[9.77px] sm:text-[16px] leading-[19.54px] sm:leading-[32px] font-[400]">
              URL
            </label>
            <input
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="w-full dm-sans border-[1px] mb-2 md:mb-0 h-[37.86px] md:h-auto rounded-[10px] border-[#374CC4] outline-none bg-[#101E71] py-[15px] px-[12px] md:px-[24px] placeholder:text-[#DFDFDF36] text-white text-[16px] leading-[32px] font-[400]"
              placeholder="https://examples.com"
            />
            {errors.url && (
              <span className="text-red-500 text-[12px]">{errors.url[0]}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col md:gap-[38px] flex-wrap md:flex-row">
          <div className="relative flex-1 flex flex-col md:gap-[4px]">
            <label className="dm-sans text-[#DFDFDF] text-[9.77px] sm:text-[16px] leading-[19.54px] sm:leading-[32px] font-[400]">
              Select Emoji
            </label>
            <div
              className="relative flex-1 cursor-pointer"
              onClick={() => setShowPicker((val) => !val)}
            >
              <input
                name="emoji"
                type="text"
                value={
                  inputStr || formData.emoji
                    ? String.fromCodePoint(parseInt(formData.emoji, 16))
                    : ""
                }
                className="w-full dm-sans border-[1px] mb-2 md:mb-0 h-[37.86px] md:h-auto rounded-[10px] border-[#374CC4] outline-none bg-[#101E71] py-[15px] px-[12px] md:px-[24px] placeholder:text-[#DFDFDF36] text-white text-[16px] leading-[32px] font-[400]"
              />
              <svg
                width="18"
                height="10"
                viewBox="0 0 18 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-[40%] md:top-[50%] w-[12px] md:w-[18px] translate-y-[-50%] right-[20px]"
              >
                <path
                  d="M18 0.623409C18 0.465262 17.9396 0.30342 17.8223 0.182052C17.5877 -0.0606842 17.2039 -0.0606842 16.9693 0.182052L8.94047 8.49025L1.02893 0.30342C0.794353 0.0606833 0.410505 0.0606833 0.175932 0.30342C-0.0586414 0.546156 -0.0586414 0.943361 0.175932 1.1861L8.51397 9.81795C8.74854 10.0607 9.13239 10.0607 9.36697 9.81795L17.8223 1.06841C17.9431 0.943362 18 0.785233 18 0.623409Z"
                  fill="white"
                />
              </svg>
            </div>
            {showPicker && <EmojiPicker onEmojiClick={onEmojiClick} />}
          </div>
          {/* <div className="flex-1 flex flex-col md:gap-[4px]">
            <label className="dm-sans text-[#DFDFDF] text-[9.77px] sm:text-[16px] leading-[19.54px] sm:leading-[32px] font-[400]">
              Tags
            </label>
            <input className="w-full dm-sans mb-2 md:mb-0 border-[1px] h-[37.86px] md:h-auto rounded-[10px] border-[#374CC4] outline-none bg-[#101E71] py-[15px] px-[12px] md:px-[24px] placeholder:text-[#DFDFDF36] text-white text-[16px] leading-[32px] font-[400]" />
          </div> */}
        </div>
        <div className="flex flex-col md:gap-[4px]">
          <label className="dm-sans text-[#DFDFDF] text-[9.77px] sm:text-[16px] leading-[19.54px] sm:leading-[32px] font-[400]">
            Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={5}
            className=" w-full dm-sans border-[1px] h-[118.26px] md:h-auto rounded-[10px] border-[#374CC4] outline-none bg-[#101E71] py-[15px] px-[12px] md:px-[24px] placeholder:text-[#DFDFDF36] text-white text-[16px] leading-[32px] font-[400]"
          ></textarea>
          {errors.notes && (
            <span className="text-red-500 text-[12px]">{errors.notes[0]}</span>
          )}
        </div>
        <div className="flex gap-[12px] justify-center md:justify-end mt-[25px]">
          <button
            onClick={() => {
              setGeneratorPassword("");
              navigate(-1);
            }}
            className="py-[17px] w-[140px] rounded-[18.37px] bg-[#101E71] border-none outline-none text-white text-[15.5px] font-[400] dm-sans"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="py-[17px] w-[140px] h-[57px] rounded-[18.37px] bg-[#101E71] border-none outline-none text-white text-[15.5px] font-[400] 
            dm-sans
            bg-[linear-gradient(90deg,_#A143FF_0%,_#5003DB_100%)]
"
          >
            Ok
          </button>
        </div>
        {/* </form> */}
      </section>
    </section>
  );
}

export default AddPassword;

const CloseEye = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[18px] h-[18px] sm:w-[24px] sm:h-[24px]"
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
    className="w-[18px] h-[18px] sm:w-[24px] sm:h-[24px]"
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

const Dice = () => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[18px] h-[18px] sm:w-[24px] sm:h-[24px]"
  >
    <path
      d="M1 3.55556C1 2.87778 1.26925 2.22776 1.7485 1.7485C2.22776 1.26925 2.87778 1 3.55556 1H21.4444C22.1222 1 22.7722 1.26925 23.2515 1.7485C23.7308 2.22776 24 2.87778 24 3.55556V21.4444C24 22.1222 23.7308 22.7722 23.2515 23.2515C22.7722 23.7308 22.1222 24 21.4444 24H3.55556C2.87778 24 2.22776 23.7308 1.7485 23.2515C1.26925 22.7722 1 22.1222 1 21.4444V3.55556Z"
      stroke="white"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.02756 8.66669C8.38041 8.66669 8.66645 8.38065 8.66645 8.0278C8.66645 7.67496 8.38041 7.38892 8.02756 7.38892C7.67471 7.38892 7.38867 7.67496 7.38867 8.0278C7.38867 8.38065 7.67471 8.66669 8.02756 8.66669Z"
      fill="white"
      stroke="white"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M16.9719 17.6112C17.3247 17.6112 17.6108 17.3251 17.6108 16.9723C17.6108 16.6194 17.3247 16.3334 16.9719 16.3334C16.619 16.3334 16.333 16.6194 16.333 16.9723C16.333 17.3251 16.619 17.6112 16.9719 17.6112Z"
      fill="white"
      stroke="white"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12.5002 13.1389C12.8531 13.1389 13.1391 12.8528 13.1391 12.5C13.1391 12.1471 12.8531 11.8611 12.5002 11.8611C12.1474 11.8611 11.8613 12.1471 11.8613 12.5C11.8613 12.8528 12.1474 13.1389 12.5002 13.1389Z"
      fill="white"
      stroke="white"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
