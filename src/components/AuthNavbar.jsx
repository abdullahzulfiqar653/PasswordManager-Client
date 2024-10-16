import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useState } from "react";

function Navbar() {
  const {
    search,
    setSearch,
    handleGeneratePassVisibility,
    handleSaveConfirmationModalVisibility,
  } = useAuth();

  return (
    <header className="bg-transparent z-10 relative">
      <section className="md:container">
        <nav className="relative flex justify-between items-center py-[16px] gradient-border gap-[26px]">
          <img src="/dots.svg" className="absolute w-full top-3 z-[1]" />
          {/* <img src="/HomeSideShade.png" className="absolute top-[60px] right-[200px] w-[900px]" /> */}
          <Link
            to="/"
            className="flex items-center gap-[4px]  md:gap-[15px] z-[2]"
          >
            <img
              src="/logov2.svg"
              className="w-[25px] sm:w-[70px] cursor-pointer ml-2 md:ml-0"
            />
            <h2 className="md:text-[22px] xs:pb-0 text-[14.3px] text-white whitespace-nowrap">
              Password Manager
            </h2>
          </Link>
          <div className="flex-1 items-center gap-[18px] flex justify-end z-[2]">
            <div className="relative flex-1 hidden md:block">
              <Search />
              <input
                className="dm-sans w-full border-[1px] rounded-[12px] border-[#374CC4] outline-none bg-[#101E71] py-[11px] pl-[41px] px-[24px] placeholder:text-[#DFDFDF36] text-white text-[16px] leading-[32px] font-[400]"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-[5px] md:gap-[19px] z-[2]">
              <div className="relative inline-block w-[32px] align-bottom md:hidden">
                <input
                  id="searchleft"
                  type="search"
                  name="q"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="absolute font-sans left-0 focus:w-[155px] focus:p-[0_16px_0_0] focus:pl-[10px] placeholder:text-white text-white text-[12px] focus:border-[.5px] rounded-[20px] border-[#374CC4] bg-[#101E71] outline-none p-0 w-0 h-full z-10 transition-[width] duration-400"
                />
                <label
                  htmlFor="searchleft" // Linking the label to the input
                  className="absolute w-[32px] h-[32px] flex items-center justify-center bg-[#101E71] border-[.3px] border-[#374CC4] rounded-full m-0 p-0 transition duration-400 cursor-pointer" // Added cursor pointer for better UX
                >
                  <span className="inline-block pointer-events-none">
                    <MobileSearch />
                  </span>
                </label>
              </div>
              <Link
                onClick={() => handleGeneratePassVisibility("navbar")}
                className="w-[32px] h-[32px] sm:w-[61px] sm:h-[61px] flex items-center justify-center bg-[#101E71] border-[.3px] border-[#374CC4] rounded-full"
              >
                <Dice />
              </Link>
              <Link
                to="/dashboard/add"
                className="w-[32px] h-[32px] sm:w-[61px] sm:h-[61px] flex items-center justify-center bg-[#101E71] border-[.3px] border-[#374CC4] rounded-full"
              >
                <Add />
              </Link>
              {/* <Link
                onClick={handleSaveConfirmationModalVisibility}
                className="w-[28px] h-[28px] sm:w-[61px] sm:h-[61px] flex items-center justify-center bg-[#101E71] border-[.3px] border-[#374CC4] rounded-full"
              >
                <Save />
              </Link> */}
              <Link
                to="/dashboard/folders/123"
                className="w-[32px] h-[32px] mr-3 sm:w-[61px] sm:h-[61px] flex items-center justify-center bg-[#101E71] border-[.3px] border-[#374CC4] rounded-full"
              >
                <Folder />
              </Link>
            </div>
          </div>
        </nav>
      </section>
    </header>
  );
}

export default Navbar;

const Search = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute top-[50%] left-[13px] translate-y-[-50%]"
  >
    <path
      d="M12.5 11H11.71L11.43 10.73C12.4439 9.55402 13.0011 8.0527 13 6.5C13 5.21442 12.6188 3.95772 11.9046 2.8888C11.1903 1.81988 10.1752 0.986756 8.98744 0.494786C7.79973 0.00281635 6.49279 -0.125905 5.23192 0.124899C3.97104 0.375703 2.81285 0.994767 1.90381 1.90381C0.994767 2.81285 0.375703 3.97104 0.124899 5.23192C-0.125905 6.49279 0.00281635 7.79973 0.494786 8.98744C0.986756 10.1752 1.81988 11.1903 2.8888 11.9046C3.95772 12.6188 5.21442 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
      fill="white"
    />
  </svg>
);
const MobileSearch = () => (
  <svg
    width="9"
    height="9"
    viewBox="0 0 9 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[11px] h-[11px]"
  >
    <path
      d="M6.43225 5.66038H6.02573L5.88165 5.52144C6.40337 4.91631 6.6901 4.14375 6.68954 3.34477C6.68954 2.68324 6.49337 2.03656 6.12584 1.48652C5.75831 0.936472 5.23593 0.507764 4.62476 0.254607C4.01358 0.00144924 3.34106 -0.0647883 2.69224 0.0642703C2.04342 0.193329 1.44744 0.511887 0.979661 0.979661C0.511887 1.44744 0.193329 2.04342 0.0642703 2.69224C-0.0647883 3.34106 0.00144924 4.01358 0.254607 4.62476C0.507764 5.23593 0.936472 5.75831 1.48652 6.12584C2.03656 6.49337 2.68324 6.68954 3.34477 6.68954C4.17324 6.68954 4.93482 6.38594 5.52144 5.88165L5.66038 6.02573V6.43225L8.23328 9L9 8.23328L6.43225 5.66038ZM3.34477 5.66038C2.06347 5.66038 1.02916 4.62607 1.02916 3.34477C1.02916 2.06347 2.06347 1.02916 3.34477 1.02916C4.62607 1.02916 5.66038 2.06347 5.66038 3.34477C5.66038 4.62607 4.62607 5.66038 3.34477 5.66038Z"
      fill="white"
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
    className="w-[14px] h-[14px] sm:w-[24px] sm:h-[24px]"
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
const Add = () => (
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[14px] h-[14px] sm:w-[24px] sm:h-[24px]"
  >
    <circle cx="11.5" cy="11.5" r="11" stroke="white" />
    <path
      d="M15.328 12.56H11.76V16.16H10.72V12.56H7.168V11.6H10.72V8H11.76V11.6H15.328V12.56Z"
      fill="white"
    />
  </svg>
);
const Save = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[14px] h-[14px] sm:w-[24px] sm:h-[24px]"
  >
    <path
      d="M21.6673 8.04162V19.9171C21.6673 20.4155 21.5005 20.8318 21.1668 21.1662C20.8332 21.5006 20.4164 21.6674 19.9167 21.6667H6.08465C5.5856 21.6667 5.16923 21.4999 4.83557 21.1662C4.5019 20.8325 4.33471 20.4158 4.33398 19.916V6.08404C4.33398 5.58499 4.50118 5.16862 4.83557 4.83496C5.16996 4.50129 5.58632 4.3341 6.08465 4.33337H17.9591L21.6673 8.04162ZM20.584 8.50421L17.4965 5.41671H6.08465C5.88965 5.41671 5.72968 5.47918 5.60473 5.60412C5.47979 5.72907 5.41732 5.88904 5.41732 6.08404V19.9171C5.41732 20.1114 5.47979 20.271 5.60473 20.396C5.72968 20.5209 5.88965 20.5834 6.08465 20.5834H19.9177C20.112 20.5834 20.2716 20.5209 20.3966 20.396C20.5215 20.271 20.584 20.111 20.584 19.916V8.50421ZM13.0007 17.9162C13.5979 17.9162 14.1085 17.7046 14.5325 17.2814C14.9564 16.8582 15.168 16.3475 15.1673 15.7495C15.1666 15.1515 14.9546 14.6413 14.5314 14.2188C14.1082 13.7963 13.5979 13.5847 13.0007 13.584C12.4034 13.5832 11.8931 13.7948 11.4699 14.2188C11.0467 14.6427 10.8347 15.153 10.834 15.7495C10.8333 16.3461 11.0452 16.8567 11.4699 17.2814C11.8946 17.706 12.4048 17.9177 13.0007 17.9162ZM7.33482 10.5842H15.3753V7.33421H7.33482V10.5842ZM5.41732 8.50421V20.5834V5.41671V8.50421Z"
      fill="white"
    />
  </svg>
);
const Folder = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[14px] h-[14px] sm:w-[24px] sm:h-[24px]"
  >
    <path
      d="M0.675887 4.8375L0.625887 3.75C0.625887 3.08696 0.889279 2.45107 1.35812 1.98223C1.82696 1.51339 2.46285 1.25 3.12589 1.25H7.71589C8.37887 1.25014 9.01466 1.51363 9.48339 1.9825L10.5184 3.0175C10.9871 3.48637 11.6229 3.74986 12.2859 3.75H17.2634C17.6108 3.74996 17.9544 3.82233 18.2723 3.96249C18.5901 4.10265 18.8753 4.30751 19.1096 4.56403C19.3439 4.82054 19.5221 5.12306 19.633 5.4523C19.7438 5.78155 19.7848 6.13028 19.7534 6.47625L18.9571 15.2262C18.9007 15.8474 18.6141 16.425 18.1536 16.8457C17.6932 17.2664 17.0921 17.4998 16.4684 17.5H3.53339C2.90968 17.4998 2.3086 17.2664 1.84813 16.8457C1.38767 16.425 1.10108 15.8474 1.04464 15.2262L0.248387 6.47625C0.196183 5.89732 0.34735 5.31828 0.675887 4.83875V4.8375ZM2.73839 5C2.56474 4.99999 2.393 5.03616 2.23411 5.1062C2.07522 5.17624 1.93267 5.27862 1.81554 5.4068C1.69841 5.53499 1.60927 5.68617 1.5538 5.85072C1.49833 6.01526 1.47776 6.18956 1.49339 6.3625L2.28964 15.1125C2.3177 15.4231 2.46084 15.7119 2.69096 15.9224C2.92107 16.1329 3.22154 16.2497 3.53339 16.25H16.4684C16.7802 16.2497 17.0807 16.1329 17.3108 15.9224C17.5409 15.7119 17.6841 15.4231 17.7121 15.1125L18.5084 6.3625C18.524 6.18956 18.5034 6.01526 18.448 5.85072C18.3925 5.68617 18.3034 5.53499 18.1862 5.4068C18.0691 5.27862 17.9265 5.17624 17.7677 5.1062C17.6088 5.03616 17.437 4.99999 17.2634 5H2.73839ZM8.60089 2.86625C8.48469 2.75002 8.34672 2.65784 8.19486 2.595C8.043 2.53215 7.88024 2.49987 7.71589 2.5H3.12589C2.79844 2.49994 2.48405 2.62837 2.2503 2.85768C2.01655 3.08699 1.88211 3.39886 1.87589 3.72625L1.88339 3.9C2.15255 3.80083 2.43755 3.75083 2.73839 3.75H9.48339L8.60089 2.86625Z"
      fill="white"
    />
  </svg>
);
