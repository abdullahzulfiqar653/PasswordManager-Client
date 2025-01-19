import moment from "moment";
import { TickIcon, CopyIcon, Edit } from "../assets/icons";
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
