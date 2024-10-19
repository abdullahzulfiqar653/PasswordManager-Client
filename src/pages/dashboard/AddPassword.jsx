import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useNavigate, useLocation } from "react-router-dom";

import emojiArray from "../../data/emojis";
import { toast } from "react-toastify";
import { useAuth } from "../../AuthContext";
import useAddPassword from "../../hooks/useAddPassword";
import useUpdatePassword from "../../hooks/useUpdatePassword";
import useGetFolders from "../../hooks/useGetFolders";
// import useGetFile from "../../hooks/useGetFile";
import { ThreeDots } from "react-loader-spinner";

function AddPassword() {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [inputStr, setInputStr] = useState("");
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const { state } = location;
  const isUpdating = Boolean(state?.item);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [progressValue, setProgressValue] = useState(10);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    username: null,
    password: null,
    url: null,
    notes: null,
    emoji: null,
    folder: "",
    file: "",
    ...state?.item,
  });
  const navigate = useNavigate();
  const {
    handleGeneratePassVisibility,
    generatorPassword,
    setGeneratorPassword,
    passSelectedFolderId,
    handleCreateFolderModal,
    handleConfirmChangesModal,
  } = useAuth();
  const { mutate: addPassword } = useAddPassword();
  const { mutate: updatePassword } = useUpdatePassword();
  const { data: data } = useGetFolders();

  useEffect(() => {
    if (generatorPassword)
      setFormData((prevFormData) => ({
        ...prevFormData,
        password: generatorPassword,
      }));
  }, [generatorPassword]);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const uploadData = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== undefined) {
        uploadData.append(key, formData[key]);
      }
    }
    const mutationFn = isUpdating ? updatePassword : addPassword;
    mutationFn(uploadData, {
      onSuccess: () => {
        setLoading(false);
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
        setLoading(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (
      (name === "notes" ||
        name === "username" ||
        name === "password" ||
        name === "url" ||
        name === "emoji") &&
      !value
    ) {
      setFormData({ ...formData, [name]: null });
    }
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

  useEffect(() => {
    if (formData?.emoji) {
      const imgTag = `<img src="/${formData.emoji}.png" alt="${formData.emoji}" width="auto" height="auto" />`;
      setSelectedEmoji(imgTag);
    }
  }, [formData?.emoji]);

  const handleEmojiSelect = (emoji) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      emoji: emoji.name,
    }));
    const imgTag = `<img src="/${emoji.name}.png" alt="${emoji.name}" width="auto" height="auto" />`;
    setSelectedEmoji(imgTag);
    setShowPicker(false);
  };

  const handleSelect = (id, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      folder: id,
    }));
    setSelectedValue(value);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    if (passSelectedFolderId && data?.results) {
      const selectedFolder = data.results.find(
        (folder) => folder.id === passSelectedFolderId
      );
      if (selectedFolder) {
        setSelectedValue(selectedFolder.title);
        setFormData((prevFormData) => ({
          ...prevFormData,
          folder: selectedFolder.id,
        }));
      }
    }
  }, [passSelectedFolderId, data]);

  useEffect(() => {
    if (formData?.folder && data?.results) {
      const folder = data.results.find((item) => item.id === formData.folder);
      if (folder) {
        setSelectedValue(folder.title);
      }
    }
  }, [formData?.folder, data]);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
    setProgressValue(0);
    setSelectedFile(null);
  };

  const handleFileRemove = () => {
    setProgressValue(0);
    setSelectedFile(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFormData((prevFormData) => ({
        ...prevFormData,
        file: file,
      }));
      const totalTime = 4000;
      const stepTime = totalTime / 100;

      let currentProgress = 0;

      const intervalId = setInterval(() => {
        if (currentProgress < 100) {
          currentProgress += 1;
          setProgressValue(currentProgress);
        } else {
          clearInterval(intervalId);
        }
      }, stepTime);

      return () => clearInterval(intervalId);
    }
  };

  return (
    <section className="w-full relative flex mt-[20px] md:mt-[42px] pb-[56px] gap-[7px]">
      <img
        src="/dots.svg"
        className="absolute w-[100vh] h-[20vh] md:h-auto md:w-full top-[-100px] md:-[-130px] z-[1] object-cover"
      />
      <img
        src="/boxes.svg"
        className="absolute w-[100vh] md:w-[150vw] top-[-135px] h-[120vh] md:h-[75vw] z-[1] object-cover opacity-30"
      />
      <section className="w-full flex-1 flex flex-col md:gap-[20px] container z-[3]">
        <h4 className=" text-white  text-[22px]  md:text-[32px] leading-[64px] font-[400]">
          Root . Add Entry
        </h4>

        {/* <form enctype="multipart/form-data"> */}
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
          </div>
        </div>
        <div className="flex flex-col md:gap-[38px] flex-wrap md:flex-row">
          <div className="relative flex-1 flex flex-col md:gap-[4px]">
            <label className="dm-sans text-[#DFDFDF] text-[9.77px] sm:text-[16px] leading-[19.54px] sm:leading-[32px] font-[400]">
              Select Emoji
            </label>
            <div className="relative flex-1 cursor-pointer">
              <div
                contentEditable
                className="w-full dm-sans border-[1px] flex gap-2 mb-2 md:mb-0 sm:h-[62] rounded-[10px] border-[#374CC4] outline-none bg-[#101E71] py-[15px] px-[12px] md:px-[24px] placeholder:text-[#DFDFDF36] text-white text-[16px] leading-[32px] font-[400]"
                dangerouslySetInnerHTML={{ __html: selectedEmoji }}
                onClick={() => setShowPicker((prev) => !prev)}
              ></div>

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

              {showPicker && (
                <div className="absolute mt-2 top-[100%] left-0 bg-[#101E71] border-[1px] border-[#374CC4] rounded-[12.87px] z-50 w-full py-4 px-2">
                  <div className="grid grid-cols-7 md:grid-cols-9 lg:grid-cols-10 gap-5">
                    {emojiArray.map((emoji) => (
                      <div
                        key={emoji.name}
                        className="cursor-pointer w-[35.55px] h-[35.55px] flex justify-center items-center"
                        onClick={() => handleEmojiSelect(emoji)}
                      >
                        <img
                          src={emoji.url}
                          alt={emoji.name}
                          style={{ cursor: "pointer" }}
                          className="w-auto h-auto"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* {showPicker && <EmojiPicker onEmojiClick={onEmojiClick} />} */}
          </div>
          <div className="flex-1 flex flex-col md:gap-[4px]">
            <label className="dm-sans text-[#DFDFDF] text-[9.77px] sm:text-[16px] leading-[19.54px] sm:leading-[32px] font-[400]">
              Choose your folder
            </label>
            <div className="relative flex-1 cursor-pointer">
              <Folder className="w-[18px] h-[18px] sm:w-[28px] sm:h-[28px] absolute top-[40%] md:top-[50%] translate-y-[-50%] left-[20px]" />
              {selectedValue && (
                <span className="absolute top-[40%] md:top-[50%] translate-y-[-50%] left-[50px] sm:left-[60px] font-sans text-white text-[16px]">
                  {selectedValue}
                </span>
              )}
              <input
                placeholder="Click to choose folder here"
                className={`w-full dm-sans mb-2 md:mb-0 border-[1px] h-[37.86px] md:h-auto rounded-[10px] border-[#374CC4] outline-none bg-[#101E71] py-[15px] ${
                  selectedValue
                    ? " placeholder:text-[#101E71]"
                    : "placeholder:text-[#DFDFDF36]"
                } placeholder:pl-11 sm:placeholder:pl-8 md:px-[24px]  placeholder:text-[16px] text-white text-[16px] leading-[32px] font-[400]`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                readOnly
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
              {errors.folder && (
                <span className="absolute bottom-[-20px] left-0 text-red-500 text-[12px]">
                  {errors.folder[0]}
                </span>
              )}
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-full h-[273px] overflow-y-auto bg-[#101E71] text-white shadow-[0px 4px 32px 0px #00000040] rounded-[12px] z-10">
                  <ul className="p-4">
                    {data?.results?.map((folder) => (
                      <li
                        key={folder.id}
                        className="flex gap-[13px] cursor-pointer pl-1 py-2 text-[16px] font-sans"
                        onClick={() => handleSelect(folder.id, folder.title)}
                      >
                        <Folder
                          className={
                            "mt-[4px] sm:mt-0 sm:mb-[2px] w-[18px] h-[18px] sm:w-[28px] sm:h-[28px]"
                          }
                        />
                        {folder.title}
                      </li>
                    ))}
                    <li
                      className="flex gap-[13px] cursor-pointer pl-1 py-2 mt-1 text-[17px] font-sans"
                      onClick={() => handleCreateFolderModal()}
                    >
                      <Folders
                        className={
                          "mt-[4px] sm:mt-0 sm:mb-[2px] w-[18px] h-[18px] sm:w-[28px] sm:h-[28px]"
                        }
                      />
                      Create New Folder
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:gap-[4px]">
          <label className="dm-sans text-[#DFDFDF] text-[9.77px] sm:text-[16px] leading-[19.54px] sm:leading-[32px] font-[400]">
            Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={1}
            className=" w-full dm-sans border-[1px] h-[118.26px] md:h-auto rounded-[10px] border-[#374CC4] outline-none bg-[#101E71] py-[15px] px-[12px] md:px-[24px] placeholder:text-[#DFDFDF36] text-white text-[16px] leading-[32px] font-[400]"
          ></textarea>
          {errors.notes && (
            <span className="text-red-500 text-[12px]">{errors.notes[0]}</span>
          )}
        </div>
        <div className="flex flex-col mt-5 sm:mt-0">
          <div className="flex gap-3">
            <Cloud />
            <div>
              <p className="text-[14px] sm:text-[16px] leading-[32px] text-white font-sans">
                Add any Attachments, upload document or file here,{" "}
                <span
                  style={{
                    background: `linear-gradient(90deg, #963AFB 0%, #6211E4 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    cursor: "pointer",
                    borderBottom: "1px solid",
                    borderColor: "#963AFB",
                  }}
                  onClick={handleBrowseClick}
                >
                  Browse.
                </span>
              </p>
            </div>
          </div>
          {selectedFile && (
            <div className="flex items-center mt-6">
              <File className={"mb-5"} />
              <div className="flex flex-col ml-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-9">
                    <p className="text-[16px] leading-[32px] text-white font-sans">
                      {selectedFile.name}
                    </p>
                    <p className="text-[#DFDFDF99]">
                      {selectedFile.size > 0
                        ? (selectedFile.size / 1024).toFixed(2) + " kb"
                        : "File size is 0 MB"}
                    </p>
                  </div>
                  {/* Cross icon */}
                  <span
                    className="ml-2 cursor-pointer text-red-500"
                    onClick={handleFileRemove}
                  >
                    <Cross />
                  </span>
                </div>
                <progress
                  value={progressValue}
                  max="100"
                  className="w-[308px] sm:w-[408px] mt-2 h-[5px]"
                  style={{
                    appearance: "none",
                    WebkitAppearance: "none",
                  }}
                ></progress>
                <p className="text-[16px] leading-[32px] text-[#DFDFDF99] flex justify-end">
                  {progressValue}%
                </p>
              </div>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        <div className="flex gap-[12px] justify-center md:justify-end mt-[15px]">
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
            style={{
              background: loading
                ? "#0E1956"
                : "linear-gradient(90deg, #A143FF 0%, #5003DB 100%)",
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onClick={
              isUpdating
                ? () => handleConfirmChangesModal(formData)
                : handleSubmit
            }
            disabled={loading}
            className="py-[17px] w-[140px] h-[57px] rounded-[18.37px] bg-[#101E71] border-none outline-none text-white text-[15.5px] font-[400] 
            dm-sans
            bg-[linear-gradient(90deg,_#A143FF_0%,_#5003DB_100%)]
"
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
            Ok
          </button>
        </div>
        {/* </form> */}
      </section>
    </section>
  );
}

export default AddPassword;

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
const Cross = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 11L1 1M11 1L1 11"
      stroke="white"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const File = ({ className }) => (
  <svg
    width="23"
    height="29"
    viewBox="0 0 23 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M4.23921 29H18.7608C21.5916 29 23 27.5797 23 24.7663V12.4847C23 10.7395 22.8086 9.98235 21.7147 8.87313L14.1663 1.28523C13.1278 0.229692 12.2795 0 10.7345 0H4.23921C1.4224 0 0 1.43355 0 4.24756V24.7663C0 27.593 1.4224 29 4.23921 29ZM4.34831 26.8225C2.93991 26.8225 2.20128 26.0781 2.20128 24.7259V4.28796C2.20128 2.94905 2.93991 2.17745 4.36231 2.17745H10.4335V10.0366C10.4335 11.7408 11.3086 12.5794 13.0041 12.5794H20.7987V24.7259C20.7987 26.0781 20.0735 26.8225 18.6517 26.8225H4.34831ZM13.2503 10.5364C12.717 10.5364 12.4977 10.3205 12.4977 9.7792V2.59702L20.374 10.537L13.2503 10.5364ZM16.5321 16.2989H6.15286C5.66103 16.2989 5.30572 16.6642 5.30572 17.1241C5.30572 17.5974 5.66161 17.9627 6.15344 17.9627H16.5321C16.6439 17.9645 16.755 17.944 16.8586 17.9025C16.9623 17.861 17.0565 17.7993 17.1356 17.7211C17.2146 17.6429 17.277 17.5497 17.319 17.4471C17.3609 17.3446 17.3816 17.2348 17.3798 17.1241C17.3798 16.6642 17.0105 16.2989 16.5321 16.2989ZM16.5321 21.0197H6.15286C5.66103 21.0197 5.30572 21.3983 5.30572 21.8715C5.30572 22.3314 5.66161 22.6835 6.15344 22.6835H16.5321C17.0105 22.6835 17.3798 22.3314 17.3798 21.8715C17.3798 21.3983 17.0105 21.0197 16.5321 21.0197Z"
      fill="white"
    />
  </svg>
);
const Cloud = () => (
  <svg
    width="42"
    height="27"
    viewBox="0 0 42 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M33.8625 10.0387C33.2747 7.20944 31.6708 4.66177 29.3249 2.83085C26.9789 0.999935 24.0364 -0.000651921 21 3.18673e-07C15.9425 3.18673e-07 11.55 2.72574 9.3625 6.71462C6.79041 6.97861 4.41176 8.13601 2.68361 9.96444C0.955449 11.7929 -0.000300478 14.1633 7.08623e-08 16.6204C7.08623e-08 22.1217 4.7075 26.5926 10.5 26.5926H33.25C38.08 26.5926 42 22.8696 42 18.2824C42 13.8946 38.4125 10.3379 33.8625 10.0387Z"
      fill="url(#paint0_linear_1652_8665)"
    />
    <path
      d="M16.9619 17.8919H25.0909H16.9619ZM21.0264 15.6401V8.88477V15.6401ZM21.0264 8.88477L23.3974 10.8551L21.0264 8.88477ZM21.0264 8.88477L18.6555 10.8551L21.0264 8.88477Z"
      fill="url(#paint1_linear_1652_8665)"
    />
    <path
      d="M16.9619 17.8919H25.0909M21.0264 15.6401V8.88477M21.0264 8.88477L23.3974 10.8551M21.0264 8.88477L18.6555 10.8551"
      stroke="white"
      stroke-width="0.826311"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1652_8665"
        x1="-2.01923"
        y1="3.63461"
        x2="44.4231"
        y2="24.2308"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#A143FF" />
        <stop offset="1" stop-color="#5305DD" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_1652_8665"
        x1="16.5711"
        y1="10.1158"
        x2="26.6787"
        y2="12.6773"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#A143FF" />
        <stop offset="1" stop-color="#5305DD" />
      </linearGradient>
    </defs>
  </svg>
);
const Folder = ({ className }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M0.675887 4.8375L0.625887 3.75C0.625887 3.08696 0.889279 2.45107 1.35812 1.98223C1.82696 1.51339 2.46285 1.25 3.12589 1.25H7.71589C8.37887 1.25014 9.01466 1.51363 9.48339 1.9825L10.5184 3.0175C10.9871 3.48637 11.6229 3.74986 12.2859 3.75H17.2634C17.6108 3.74996 17.9544 3.82233 18.2723 3.96249C18.5901 4.10265 18.8753 4.30751 19.1096 4.56403C19.3439 4.82054 19.5221 5.12306 19.633 5.4523C19.7438 5.78155 19.7848 6.13028 19.7534 6.47625L18.9571 15.2262C18.9007 15.8474 18.6141 16.425 18.1536 16.8457C17.6932 17.2664 17.0921 17.4998 16.4684 17.5H3.53339C2.90968 17.4998 2.3086 17.2664 1.84813 16.8457C1.38767 16.425 1.10108 15.8474 1.04464 15.2262L0.248387 6.47625C0.196183 5.89732 0.34735 5.31828 0.675887 4.83875V4.8375ZM2.73839 5C2.56474 4.99999 2.393 5.03616 2.23411 5.1062C2.07522 5.17624 1.93267 5.27862 1.81554 5.4068C1.69841 5.53499 1.60927 5.68617 1.5538 5.85072C1.49833 6.01526 1.47776 6.18956 1.49339 6.3625L2.28964 15.1125C2.3177 15.4231 2.46084 15.7119 2.69096 15.9224C2.92107 16.1329 3.22154 16.2497 3.53339 16.25H16.4684C16.7802 16.2497 17.0807 16.1329 17.3108 15.9224C17.5409 15.7119 17.6841 15.4231 17.7121 15.1125L18.5084 6.3625C18.524 6.18956 18.5034 6.01526 18.448 5.85072C18.3925 5.68617 18.3034 5.53499 18.1862 5.4068C18.0691 5.27862 17.9265 5.17624 17.7677 5.1062C17.6088 5.03616 17.437 4.99999 17.2634 5H2.73839ZM8.60089 2.86625C8.48469 2.75002 8.34672 2.65784 8.19486 2.595C8.043 2.53215 7.88024 2.49987 7.71589 2.5H3.12589C2.79844 2.49994 2.48405 2.62837 2.2503 2.85768C2.01655 3.08699 1.88211 3.39886 1.87589 3.72625L1.88339 3.9C2.15255 3.80083 2.43755 3.75083 2.73839 3.75H9.48339L8.60089 2.86625Z"
      fill="white"
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
