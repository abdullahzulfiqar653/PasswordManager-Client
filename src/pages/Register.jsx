import { useState } from "react";
import { Link } from "react-router-dom";
import RegisterInstruction from "../components/RegistrationInstruction";
import RegistrationSeed from "../components/RegistrationSeed";
import useGetSeeds from "../hooks/useGetSeeds";

function Register() {
  const [isAgree, setIsAgree] = useState(false);
  const agreementHandler = () => setIsAgree(true);

  const { data } = useGetSeeds();
  const [seedsData, setSeedsData] = useState(null);
  const handlePassData = () => {
    setSeedsData(data);
  };

  return (
    <section className="flex min-h-screen w-full justify-between flex-col-reverse md:flex-row">
      <section className="w-full md:w-[45%] md:px-[100px] pb-[54px] md:pb-[182px] flex justify-center items-center">
        <div className="hidden md:flex flex-col w-full gap-[55px] mt-[95px]">
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
          <div className="w-[100vh]">
            <img
              className="w-full lg:w-[80%] md:w-[70%] h-full ml-[-100px] md:mt-0"
              src="/registerlock.svg"
              alt="register lock"
            />
          </div>
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
        <div className="w-full z-[3] h-[75vh] flex flex-col gap-[30px] md:gap-[42px] max-w-[637px]">
          {!isAgree ? (
            <RegisterInstruction
              agreementHandler={agreementHandler}
              onSelectSeeds={handlePassData}
            />
          ) : (
            <RegistrationSeed seedsData={seedsData} />
          )}
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
