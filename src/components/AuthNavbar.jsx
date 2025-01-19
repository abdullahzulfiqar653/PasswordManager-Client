import { Link, useLocation } from "react-router-dom";
import {
  AddA,
  Dice,
  Delete,
  Unselect,
  Search,
  MobileSearch,
  FolderA,
} from "../assets/icons";
import { useAuth } from "../AuthContext";

function Navbar() {
  const location = useLocation();

  const {
    search,
    setSearch,
    selectPasswordsId,
    setSelectedPasswordsId,
    clearFolderSelection,
    handleGeneratePassVisibility,
    handleOpenPasswordDeleteModal,
    handleSaveConfirmationModalVisibility,
  } = useAuth();
  return (
    <header className="bg-transparent z-1000 relative">
      <section className="md:container">
        <nav className="relative flex justify-between items-center py-[16px] mq2000:py-[24px]  gradient-border gap-[26px]">
          <Link
            to="/"
            className="flex items-center gap-[4px]  md:gap-[15px] z-[2]"
          >
            <img
              src="/logov2.svg"
              className="w-[25px] mq2000:w-[100px] sm:w-[70px] cursor-pointer ml-2 md:ml-0"
            />
            <h2 className="md:text-[22px] mq2000:text-[35px] xs:pb-0 text-[14.3px] text-white whitespace-nowrap">
              Password Manager
            </h2>
          </Link>
          <div className="flex-1 items-center gap-[18px] flex justify-end z-[2]">
            <div className="relative flex-1 hidden md:block">
              <Search />
              <input
                onClick={() => clearFolderSelection()}
                className="dm-sans w-full border-[1px] rounded-[12px] border-[#374CC4] outline-none bg-[#101E71] py-[11px] mq2000:py-[21px] pl-[41px] mq2000:pl-[51px] px-[24px] placeholder:text-[#DFDFDF36] text-white text-[16px] mq2000:text-[20px] leading-[32px] font-[400]"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-[5px] md:gap-[19px] z-[2]">
              <div className="relative inline-block w-[36px] align-bottom md:hidden">
                <input
                  id="searchleft"
                  type="search"
                  name="q"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="absolute font-sans left-0 focus:w-[160px] focus:p-[0_16px_0_0] focus:pl-[10px] placeholder:text-white text-white text-[12px] focus:border-[.5px] rounded-[20px] border-[#374CC4] bg-[#101E71] outline-none p-0 w-0 h-full z-10 transition-[width] duration-400"
                />
                <label
                  htmlFor="searchleft" // Linking the label to the input
                  className="absolute w-[36px] h-[36px]  flex items-center justify-center bg-[#101E71] border-[.3px] border-[#374CC4] rounded-full m-0 p-0 transition duration-400 cursor-pointer" // Added cursor pointer for better UX
                >
                  <span className="inline-block pointer-events-none">
                    <MobileSearch />
                  </span>
                </label>
              </div>
              {selectPasswordsId?.length === 0 ? (
                <>
                  {location.pathname == "/" ? (
                    ""
                  ) : (
                    <Link
                      onClick={() => handleGeneratePassVisibility("navbar")}
                      className="w-[36px] h-[36px]  sm:w-[61px] sm:h-[61px] mq2000:w-[81px] mq2000:h-[81px] flex items-center justify-center bg-[#101E71] border-[.3px] border-[#374CC4] rounded-full z-20"
                    >
                      <Dice />
                    </Link>
                  )}
                  <Link
                    to="/dashboard/add"
                    className="w-[36px] h-[36px]  sm:w-[61px] sm:h-[61px] mq2000:w-[81px] mq2000:h-[81px] flex items-center justify-center bg-[#101E71] border-[.3px] border-[#374CC4] rounded-full"
                  >
                    <AddA />
                  </Link>
                  {/* <Link
                onClick={handleSaveConfirmationModalVisibility}
                className="w-[28px] h-[28px] sm:w-[61px] sm:h-[61px] mq2000:w-[81px] mq2000:h-[81px] flex items-center justify-center bg-[#101E71] border-[.3px] border-[#374CC4] rounded-full"
              >
                <Save />
              </Link> */}
                  <Link
                    to="/dashboard/folders"
                    className="w-[36px] h-[36px]  mr-3 sm:w-[61px] sm:h-[61px] mq2000:w-[81px] mq2000:h-[81px] flex items-center justify-center bg-[#101E71] border-[.3px] border-[#374CC4] rounded-full"
                  >
                    <FolderA />
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setSelectedPasswordsId([])}
                    className="w-[36px] h-[36px]  mr-3 sm:w-[61px] sm:h-[61px] mq2000:w-[81px] mq2000:h-[81px] flex items-center justify-center bg-[#101E71] border-[.3px] border-[#374CC4] rounded-full"
                  >
                    <Unselect />
                  </button>
                  <button
                    onClick={() => handleOpenPasswordDeleteModal()}
                    className="w-[36px] h-[36px]  mr-3 sm:w-[61px] sm:h-[61px] mq2000:w-[81px] mq2000:h-[81px] flex items-center justify-center bg-[#101E71] border-[.3px] border-[#374CC4] rounded-full"
                  >
                    <Delete />
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
      </section>
    </header>
  );
}

export default Navbar;
