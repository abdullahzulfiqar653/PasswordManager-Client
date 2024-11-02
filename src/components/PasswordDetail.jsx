import moment from "moment";
import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

const PasswordDetailContent = ({ passWordRecord, handleRowClick }) => {
  // const [copytext, setCopyText] = useState(false);
  const [copyName, setCopyName] = useState(false);
  const [copyURL, setCopyURL] = useState(false);

  const copyToClipBoard = (field) => {
    navigator.clipboard.writeText(
      field == "username" ? passWordRecord.username : passWordRecord.url
    );
    setTimeout(() => {
      setCopyName(false);
      setCopyURL(false);
    }, [700]);
  };
  const handleCopyName = (id) => {
    setCopyName((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };
  const handleCopyURL = (id) => {
    setCopyURL((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };

  return (
    <div className="text-white flex flex-col gap-[17px] bg-[#010E59] pb-[14px] pt-[28px] px-[14px] text-[14px] dm-sans font-[400] leading-[20px]">
      <div className="flex md:items-center xs:flex-row flex-wrap">
        <span className="inline-block w-[94px] font-[400] dm-sans text-[14px]">
          Username
        </span>
        <div className="flex flex-1 gap-[10px] sm:gap-[0] sm:justify-between sm:items-center flex-col sm:flex-row">
          <span className="flex-1 font-[400] w-[140px] overflow-hidden dm-sans text-[14px]">
            {passWordRecord?.username}
          </span>
          <div className="flex gap-[16px] absolute right-[30px]">
            {passWordRecord?.username && (
              <CopyToClipboard
                text={passWordRecord?.username}
                onCopy={() => handleCopyName(passWordRecord?.id)}
              >
                <div>
                  {copyName[passWordRecord.id] ? <TickIcon /> : <CopyIcon />}
                </div>
              </CopyToClipboard>
            )}
            <span
              className="cursor-pointer"
              onClick={() => {
                handleRowClick(passWordRecord);
              }}
            >
              <Edit />
            </span>
          </div>
        </div>
      </div>
      <div className="flex md:items-center xs:flex-row flex-wrap">
        <span className="inline-block w-[94px] font-[400] dm-sans text-[14px]">
          URL
        </span>
        <div className="flex flex-1 gap-[10px] sm:gap-[0] sm:justify-between sm:items-center flex-col sm:flex-row">
          <span className="flex-1 font-[400] w-[140px] overflow-hidden dm-sans text-[14px]">
            {passWordRecord?.url}
          </span>
          <div className="flex gap-[16px] absolute right-[30px]">
            {passWordRecord?.url && (
              <CopyToClipboard
                text={passWordRecord?.url}
                onCopy={() => handleCopyURL(passWordRecord?.id)}
              >
                <div>
                  {copyURL[passWordRecord.id] ? <TickIcon /> : <CopyIcon />}
                </div>
              </CopyToClipboard>
            )}
            <span
              className="cursor-pointer"
              onClick={() => {
                handleRowClick(passWordRecord);
              }}
            >
              <Edit />
            </span>
          </div>
        </div>
      </div>
      <div className="flex md:items-center xs:flex-row flex-wrap">
        <span className="inline-block w-[94px] font-[400] dm-sans text-[14px]">
          Modified
        </span>
        <div className="flex flex-1 gap-[10px] sm:gap-[0] sm:justify-between sm:items-center flex-col sm:flex-row">
          <span className="flex-1 font-[400] dm-sans text-[14px]">
            {moment(passWordRecord?.updated_at).format(
              "MMM Do YYYY, h:mm:ss a"
            )}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-[8px]">
        <span className="inline-block w-[94px] font-[400] dm-sans text-[14px]">
          Notes
        </span>
        <p className="font-[400] dm-sans text-[12px] text-[#DFDFDFBF]">
          {passWordRecord?.notes}
        </p>
      </div>
    </div>
  );
};

export default PasswordDetailContent;

const TickIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 6L9 17L4 12"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CopyIcon = () => (
  <svg
    width="20"
    height="22"
    viewBox="0 0 20 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 10C4 7.172 4 5.757 4.879 4.879C5.757 4 7.172 4 10 4H13C15.828 4 17.243 4 18.121 4.879C19 5.757 19 7.172 19 10V15C19 17.828 19 19.243 18.121 20.121C17.243 21 15.828 21 13 21H10C7.172 21 5.757 21 4.879 20.121C4 19.243 4 17.828 4 15V10Z"
      stroke="white"
      stroke-width="1.5"
    />
    <path
      d="M4 18C3.20435 18 2.44129 17.6839 1.87868 17.1213C1.31607 16.5587 1 15.7956 1 15V9C1 5.229 1 3.343 2.172 2.172C3.343 1 5.229 1 9 1H13C13.7956 1 14.5587 1.31607 15.1213 1.87868C15.6839 2.44129 16 3.20435 16 4"
      stroke="white"
      stroke-width="1.5"
    />
  </svg>
);

const Edit = () => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 2H3C2.46957 2 1.96086 2.21071 1.58579 2.58579C1.21071 2.96086 1 3.46957 1 4V18C1 18.5304 1.21071 19.0391 1.58579 19.4142C1.96086 19.7893 2.46957 20 3 20H17C17.5304 20 18.0391 19.7893 18.4142 19.4142C18.7893 19.0391 19 18.5304 19 18V11"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.3751 1.62498C16.7729 1.22716 17.3125 1.00366 17.8751 1.00366C18.4377 1.00366 18.9773 1.22716 19.3751 1.62498C19.7729 2.02281 19.9964 2.56237 19.9964 3.12498C19.9964 3.68759 19.7729 4.22716 19.3751 4.62498L10.3621 13.639C10.1246 13.8762 9.8313 14.0499 9.50909 14.144L6.63609 14.984C6.55005 15.0091 6.45883 15.0106 6.372 14.9883C6.28517 14.9661 6.20592 14.9209 6.14254 14.8575C6.07916 14.7942 6.03398 14.7149 6.01174 14.6281C5.98949 14.5412 5.991 14.45 6.01609 14.364L6.85609 11.491C6.95062 11.169 7.12463 10.876 7.36209 10.639L16.3751 1.62498Z"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
