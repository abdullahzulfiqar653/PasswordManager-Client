import React from "react";
import { Link } from "react-router-dom";

function RegisterInstruction({agreementHandler}) {
  return (
    <React.Fragment>
      <img
        className="w-[173px] lg:w-[255px] mx-auto"
        src="/registrationlogo.svg"
      />
      <h3 className="text-white text-center text-[31px] lg:text-[46px] leading-[43px] lg:leading-[64px] font-[400]">
        Register Account
      </h3>
      <form className="flex flex-col gap-[42px] lg:gap-[92px]">
        <div className="flex flex-col gap-[4px]">
          <div className="flex flex-col gap-[9px]">
            <p className="dm-sans text-[#DFDFDF] text-[16px] leading-[27px] font-[400] text-center">
              Important Note :
            </p>
            <p className="dm-sans text-[#DFDFDF] text-[16px] leading-[27px] font-[400] text-center">
              On the next page you will see a series of 16 words. This is your
              unique and private seed and it is the ONLY way to recover your
              wallet in case of loss or manifestation. It is your responsibility
              to write it down and store it in a safe place outside of the
              password manager app
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[14.64px] lg:gap-[32px]">
          <button
            className="dm-sans mx-[auto] bg-[linear-gradient(90deg,_#A143FF_0%,_#5003DB_100%)] py-[10px] 
              lg:py-[19px] max-w-[312px] w-[100%] rounded-[11.61px] lg:rounded-[18.37px] outline-none 
              border-none text-[12px] lg:text-[15.5px] leading-[15.26px] 
              lg:leading-[20.18px] font-[400] text-white"
              onClick={agreementHandler}
          >
            I understand, show me my seed
          </button>
          <p className="dm-sans text-center text-[#DFDFDF] text-[12px] lg:text-[16px] leading-[32px] font-[400]">
            Already have account?
            <Link className="text-[#A143FF]" to="/auth/login">
              {" "}
              Login here
            </Link>
          </p>
        </div>
      </form>
    </React.Fragment>
  );
}

export default RegisterInstruction;
