import { useState } from "react";
import { Link } from "react-router-dom";

import RegistrationSeed from "../components/RegistrationSeed";
import RegisterInstruction from "../components/RegistrationInstruction";

function Register() {
  const [isAgree, setIsAgree] = useState(false);
  return (
    <section className="flex min-h-screen w-full justify-between flex-col-reverse md:flex-row">
      <section className="w-full md:w-[45%] md:px-[100px] pb-[54px] md:pb-[182px] flex justify-center items-center">
        <div className="hidden md:flex flex-col gap-[46px] md:mt-[65px] lg:mt-[95px]">
          <div className="flex flex-col gap-[29px] max-w-[450px]">
            <Link to="/" className="flex items-center gap-[15px]">
              <img src="/logo.svg" className="cursor-pointer" />
              <h2 className="text-[22px] text-white font-[400] leading-[64px] whitespace-nowrap">
                Password Manager
              </h2>
            </Link>
            <p className="dm-sans text-[18px] leading-[26px] font-[400] text-white">
              Login to your account with seed , We do the heavy lifting in a
              no-nonsense, ad-free, tracker-free, and cloud-free manner. Free
              and open source.
            </p>
          </div>
          <img className="w-[337px]" src="/registerlock.png" />
        </div>
        <img
          className="block md:hidden z-[1] mr-8 mt-4"
          src="/registerLocker.svg"
        />
      </section>
      <section className="relative w-full md:h-[100vh] flex-col md:items-center md:w-[55%] bg-[#101E71] rounded-[0px_0px_60px_60px] md:rounded-[166px_0px_0px_166px] px-[20px]  flex md:justify-center">
        <nav className="md:hidden flex justify-center items-center py-[14px] gradient-border z-[2]">
          <Link to="/" className="flex items-center gap-[15px]">
            <img src="/logov2.svg" className="cursor-pointer z-[3]" />
            <h2 className="text-[12px] leading-[36px] z-[3] font-[400] text-white">
              Password Manager
            </h2>
          </Link>
        </nav>
        <img
          className="absolute w-[100%] md:hidden top-12 left-0 right-0 mx-auto z-[1]"
          src="/registerLogo.svg"
        />
        <div className="w-full z-[3] flex flex-col gap-[30px] md:gap-[22px] max-w-[637px]">
          {isAgree && <RegistrationSeed />}
          {!isAgree && <RegisterInstruction agreementHandler={setIsAgree} />}
          <img
            className="hidden md:block absolute right-0 top-[-10px]"
            src="/loginpattern.svg"
          />
        </div>
      </section>
    </section>
  );
}

export default Register;
