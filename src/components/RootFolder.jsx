import React from "react";

const RootFolder = () => {
  return (
    <></>
    // <section className="bg-[#101E71] rounded-[12px] min-h-[201px] relative p-[14px]">
    //   <section className="absolute p-[4px] rounded-[0px_0px_12px_12px] left-[140px] top-[0] bg-[#010E59] flex items-center justify-center gap-[4px]">
    //     <button
    //       className="dm-sans mx-[auto] bg-[linear-gradient(90deg,_#A143FF_0%,_#5003DB_100%)] w-[76px] h-[36px] rounded-[11.61px] lg:rounded-[18.37px] outline-none
    //           border-none flex items-center justify-center text-[12px]
    //           leading-[32px] font-[400] text-white"
    //     >
    //       General
    //     </button>
    //     <button
    //       className="dm-sans mx-[auto] bg-[#101E71] w-[76px] h-[36px] rounded-[11.61px] lg:rounded-[18.37px] outline-none
    //           border-none flex items-center justify-center text-[12px]
    //           leading-[32px] font-[400] text-white"
    //     >
    //       Share
    //     </button>
    //   </section>
    //   <h3 className="pl-[5px] flex gap-[10px] items-center text-[16px] text-white font-[400] mt-[25px]">
    //     <svg
    //       width="22"
    //       height="19"
    //       viewBox="0 0 22 19"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <path
    //         d="M4.22907 13.0773H18.5396C19.1989 13.0773 19.7326 12.5437 19.7326 11.8843V0H3.03613V11.8843C3.03613 12.5437 3.56975 13.0773 4.22907 13.0773Z"
    //         fill="#FFEA00"
    //       />
    //       <path
    //         d="M2.71052 14.5951H17.0211C17.6804 14.5951 18.214 14.0615 18.214 13.4022V1.51782H1.51758V13.4022C1.51758 14.0615 2.0512 14.5951 2.71052 14.5951Z"
    //         fill="#FFFF8D"
    //       />
    //       <path
    //         d="M21.25 7.66047V16.7676C21.25 17.6048 20.5693 18.2855 19.7321 18.2855H1.51786C0.680664 18.2855 0 17.6048 0 16.7676V4.54886C0 3.71167 0.680664 3.03101 1.51786 3.03101H9.67871C10.2598 3.03101 10.7886 3.36067 11.0424 3.88243L12.1452 6.14261H19.7321C20.5693 6.14261 21.25 6.82328 21.25 7.66047Z"
    //         fill="#FFBC10"
    //       />
    //       <path
    //         d="M15.1786 7.58932C15.1786 7.09839 15.1454 6.61457 15.0813 6.14261H12.1452L11.0424 3.88243C10.7886 3.36067 10.2574 3.03101 9.67871 3.03101H1.51786C0.680664 3.03101 0 3.71167 0 4.54886V16.7676C0 16.9265 0.0237165 17.0807 0.0711496 17.2253C1.43248 17.8586 2.95271 18.2143 4.55357 18.2143C10.421 18.2143 15.1786 13.4568 15.1786 7.58932Z"
    //         fill="#FFD058"
    //       />
    //     </svg>
    //     Root
    //   </h3>
    //   <ul className="flex flex-col gap-[3px] mt-[23px]">
    //     <li className="flex gap-[30px]">
    //       <span className="text-[16px] min-w-[83px] font-[400] dm-sans leading-[32px] text-white">
    //         Autotype
    //       </span>
    //       <span className="text-[16px] font-[400] dm-sans leading-[32px] text-white">
    //         Enabled
    //       </span>
    //     </li>
    //     <li className="flex gap-[30px]">
    //       <span className="text-[16px] min-w-[83px] font-[400] dm-sans leading-[32px] text-white">
    //         Searching
    //       </span>
    //       <span className="text-[16px] font-[400] dm-sans leading-[32px] text-white">
    //         Enabled
    //       </span>
    //     </li>
    //     <li className="flex gap-[30px]">
    //       <span className="text-[16px] min-w-[83px] font-[400] dm-sans leading-[32px] text-white">
    //         Expiration
    //       </span>
    //       <span className="text-[16px] font-[400] dm-sans leading-[32px] text-white">
    //         Never
    //       </span>
    //     </li>
    //   </ul>
    //   <span className="absolute right-[10px] top-[10px] cursor-pointer">
    //     <svg
    //       width="37"
    //       height="35"
    //       viewBox="0 0 37 35"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <rect width="37" height="35" rx="6" fill="#00112B" />
    //       <path
    //         d="M17.2936 17.0006L13.1466 12.8546C13.1001 12.8081 13.0633 12.753 13.0381 12.6922C13.0129 12.6315 13 12.5664 13 12.5006C13 12.4349 13.0129 12.3698 13.0381 12.309C13.0633 12.2483 13.1001 12.1931 13.1466 12.1466C13.1931 12.1001 13.2483 12.0633 13.309 12.0381C13.3698 12.0129 13.4349 12 13.5006 12C13.5664 12 13.6315 12.0129 13.6922 12.0381C13.753 12.0633 13.8081 12.1001 13.8546 12.1466L18.0006 16.2936L22.1466 12.1466C22.2405 12.0527 22.3679 12 22.5006 12C22.6334 12 22.7607 12.0527 22.8546 12.1466C22.9485 12.2405 23.0013 12.3679 23.0013 12.5006C23.0013 12.6334 22.9485 12.7607 22.8546 12.8546L18.7076 17.0006L22.8546 21.1466C22.9485 21.2405 23.0013 21.3679 23.0013 21.5006C23.0013 21.6334 22.9485 21.7607 22.8546 21.8546C22.7607 21.9485 22.6334 22.0013 22.5006 22.0013C22.3679 22.0013 22.2405 21.9485 22.1466 21.8546L18.0006 17.7076L13.8546 21.8546C13.7607 21.9485 13.6334 22.0013 13.5006 22.0013C13.3679 22.0013 13.2405 21.9485 13.1466 21.8546C13.0527 21.7607 13 21.6334 13 21.5006C13 21.3679 13.0527 21.2405 13.1466 21.1466L17.2936 17.0006Z"
    //         fill="white"
    //       />
    //     </svg>
    //   </span>
    // </section>
  );
};

export default RootFolder;
