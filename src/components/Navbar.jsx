import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="z-10 relative bg-[linear-gradient(352deg,_rgba(14, 26, 96, 0.00)_4.12%,_#0E1A60_72.05%)]">
      <section>
        <nav className="pt-[14px] pb-[11px] px-[10px] sm:px-[35px] gradient-border flex sm:justify-between sm:items-center ">
          <Link to="/" className="flex items-center gap-[6px] md:gap-[15px]">
            <img
              src="/newLogo.svg"
              className="cursor-pointer w-10 md:w-full ml-4 md:ml-0"
            />
            <h2 className="md:text-[20px] xs:font-medium xs:pb-2 text-[15px] md:font-normal text-white whitespace-nowrap">
              Password Manager
            </h2>
          </Link>
          <div className="items-center gap-[95px] hidden md:flex">
            {/* <button className="dm-sans outline-none cursor-pointer border-none text-[20px] leading-[26px] font-[400] text-white">
              Download
            </button> */}
            <div className="flex items-center gap-[20px]">
              <div className="w-[157px] h-[54.99px] bg-white hover:bg-[#e7e7e7] text-[#002550] border-[0.8px] border-[#FFFFFF] rounded-[14px] flex justify-center items-center">
                <Link
                  to="/auth/register"
                  className="dm-sans outline-none text-[20px] whitespace-nowrap cursor-pointer leading-[26px] font-[400]"
                >
                  Sign Up
                </Link>
              </div>

              <div className="w-[157px] h-[54.99px] border-white hover:bg-[#0e1a6163] border-[1px] border-[linear-gradient(175.15deg, #FFFFFF 10.76%, rgba(255, 255, 255, 0) 55.66%, rgba(255, 255, 255, 0.28) 95.49%)] rounded-[14px] flex justify-center items-center">
                <Link
                  to="/auth/login"
                  className="dm-sans outline-none cursor-pointer text-[20px] leading-[26px] font-[400] text-white"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
          {/*
            <img
              src="/hamburger.svg"
              className="sm:block md:hidden cursor-pointer"
              onClick={toggleMenu}
              alt="Menu"
            />
           "1px solid white", borderRadius: "5px" }}
            >
            */}

          {/* Mobile menu (Collapsible) */}
          {/* <Link
            to="/auth/register"
            className="dm-sans w-full pt-1 pr-4 pb-2 text-end text-[16px] font-[400] text-white md:hidden"
            onClick={() => setIsOpen(false)}
          >
            Register
          </Link> */}
        </nav>
      </section>
    </header>
  );
}

export default Navbar;
