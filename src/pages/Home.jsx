import React from "react";
import { Link } from "react-router-dom";
import SpectreComponent from "../components/SpectreComponent";
import { useAuth } from "../AuthContext";
import Navbar from "../components/Navbar";
import AuthNavbar from "../components/AuthNavbar";

function Home() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <section className="main-banner w-full relative bg-[#0e1a60]">
        <style>
          {`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
        </style>

        {/* Main container */}
        <section id="custom-section" className="relative w-full">
          {isAuthenticated ? <AuthNavbar /> : <Navbar />}
          <section className="flex h-[100vh] flex-col z-20 md:flex-row justify-start items-start pt-[40px] sm:pt-[60px] mq2000:pt-[100px] sm:pb-20 w-full relative">
            <section className="flex  flex-col gap-[10px] mq1240:gap-[20px] mq1370:gap-[30px] mq2000:gap-[50px] pl-6 pr-4 w-[95%] sm:w-[55%] items-start sm:px-[60px]">
              {/* Button */}
              <button
                className="rounded-[12px] border-[0.8px] border-[#fff] backdrop-blur-[11px] flex justify-between p-[5px] sm:p-[10px] items-center text-[#EFFAFF] font-[400] text-[12px] sm:text-[13px] mq1240:text-[16px] mq2000:text-[26px] xs:leading-[64px] h-[39px] mq1600:h-[69px] dm-sans gap-[9px] outline-none min-w-[210px] mq1240:min-w-[254px]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255, 255, 255, 0.19) 0%, rgba(153, 153, 153, 0.19) 100%)",
                }}
              >
                Cross-platform Password Manager
              </button>

              {/* Headline */}
              <h1 className="text-white text-[32px] md:text-[40px] mq1240:text-[50px] mq1370:text-[66px] mq2000:text-[86px] font-[400] leading-[36px] md:leading-[42px] mq1240:leading-[51px] mq1370:leading-[61px] mq2000:leading-[85px]">
                Secure Your Systems with the Ultimate Password Manager
              </h1>
              <h1 className="text-[#FFFFFFB2] font-sans text-[12px] md:text-[18px] font-[400] mq2000:text-[32px] leading-[15.62px] md:leading-[22px] mq2000:leading-[40px]">
                Let us store your passwords and auto-fill them into your
                favorite apps, so you can forget all about them. We do the heavy
                lifting in a no-nonsense, ad-free, tracker-free, and cloud-free
                manner. Free and open source.
              </h1>

              {/* Get Started Button */}
              <button className="bg-white hidden sm:block outline-none border-[0.797px] border-[#fff] rounded-[8px] mq1240:rounded-[10px] mq1370:rounded-[14px] mq2000:rounded-[26px] py-[10px] px-[15px] mq1240:py-[12px] mq1240:px-[18px] mq1370:py-[14px] mq1370:px-[24px] mq2000:py-[25px] mq2000:px-[40px]  text-[#002550] font-[400] text-[16px] mq1240:text-[18px] mq1370:text-[20px] mq2000:text-[40px] dm-sans">
                Get Started
              </button>

              {/* Mobile buttons */}
              {!isAuthenticated && (
                <div className="flex items-center gap-[20px] mt-6 mb-3 sm:hidden">
                  <div className="w-[108.63px] h-[38.05px] bg-white hover:bg-[#e7e7e7] text-[#002550] border-[0.8px] border-[#FFFFFF] rounded-[8px] flex justify-center items-center">
                    <Link
                      to="/auth/register"
                      className="dm-sans outline-none text-[13.84px] whitespace-nowrap cursor-pointer leading-[18.02px] font-[400]"
                    >
                      Sign Up
                    </Link>
                  </div>

                  <div className="w-[108.63px] h-[38.05px] border-white hover:bg-[#0e1a6163] border-[1px] border-[linear-gradient(175.15deg, #FFFFFF 10.76%, rgba(255, 255, 255, 0) 55.66%, rgba(255, 255, 255, 0.28) 95.49%)] rounded-[8px] flex justify-center items-center">
                    <Link
                      to="/auth/login"
                      className="dm-sans outline-none cursor-pointer text-[13.84px] leading-[18.02px] font-[400] text-white"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              )}
            </section>
          </section>
          {/* Background Image for Larger Screens */}
          {/* <img
            src="/background_img.svg"
            className="absolute hidden top-[-99px] mq1290:h-[] h-md:h-[235vh] mq1024:h-[210vh] sm:block sm:object-cover"
            alt="Background"
          /> */}

          {/* Background Image for Mobile Screens */}
          {/* <img
            src="/mobileSection.svg"
            className="absolute top-[-70px]  w-full object-cover sm:hidden"
            alt="Mobile Background"
          /> */}
        </section>

        {/* Second section */}
        <section className="w-full h-[1112px] sm:h-[480px] mq1500:h-[520px] mq2000:h-[820px] mq2400:h-[1000px] relative bg-[#0e1a60]">
          <section className="flex flex-row h-full justify-center sm:justify-center w-full relative mq2400:pt-28">
            <div className="flex flex-col z-20 mb-9 h-[1000px] sm:h-full sm:flex-row gap-[30px] overflow-y-auto sm:overflow-x-auto  scrollbar-hide scroll-smooth mx-3 sm:mx-8">
              <div
                className="relative z-10 mq375:w-[350px] w-[320px] sm:w-[384px] h-[274px] mq1500:w-[410px] mq1500:h-[310px] mq2000:w-[550px] mq2000:h-[470px] rounded-[16px] border-[0.8px] border-[#ffffff4d]"
                style={{
                  background: `linear-gradient(0deg, #0E1A60, #0E1A60), 
                           radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 100%), 
                           radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%), 
                           radial-gradient(50% 50% at 50% 50%, rgba(133, 102, 255, 0.05) 0%, rgba(133, 102, 255, 0) 100%)
                           `,
                }}
              >
                <div
                  className="mq375:w-[350px] w-[320px] sm:w-[384px] h-[274px] mq1500:w-[410px] mq1500:h-[310px] mq2000:w-[550px] mq2000:h-[470px]  rounded-[16px] border-[1px] border-[#ffffff4d]"
                  style={{
                    background: `linear-gradient(0deg, #0E1A60, #0E1A60),
                               radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 100%),
                               linear-gradient(0deg, rgba(220, 216, 255, 0.16), rgba(220, 216, 255, 0.16)),
                               linear-gradient(270deg, rgba(220, 216, 255, 0) 0%, rgba(220, 216, 255, 0) 48.96%, rgba(255, 255, 255, 0) 100%, rgba(220, 216, 255, 0) 100%)`,
                  }}
                >
                  <span>
                    <img
                      src="/grid.png"
                      className="mt-2 pr-2 w-full absolute"
                    />
                  </span>
                  <div className="flex flex-col justify-start gap-[17px] mq2000:gap-[47px] pl-[15px] mq375:pl-[35px] pr-[25px] py-[30px]">
                    <img
                      src="/icon1.png"
                      className="w-14 mq1500:w-16 mq2000:w-28"
                    />
                    <h1 className="text-white text-[24px] leading-[24px] mq1500:text-[28px] mq2000:text-[42px]">
                      Instant Store, Safe & Sort
                    </h1>
                    <p className="text-[#FFFFFFB2] text-[18px] mq1500:text-[22px] mq1500:leading-[25px] mq2000:text-[32px] mq2000:leading-[35px] leading-[21px] font-sans">
                      You can filter and sort data in Wope instantly , without
                      having to export it to a spreadsheet first
                    </p>
                  </div>
                  <span className="w-full flex text-center justify-center">
                    <svg
                      width="350"
                      height="3"
                      viewBox="0 0 350 3"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.62598 1.4281H348.869"
                        stroke="url(#paint0_linear_1452_18135)"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_1452_18135"
                          x1="1.62598"
                          y1="1.9281"
                          x2="348.869"
                          y2="1.9281"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop
                            offset="0.025"
                            stop-color="#2E3876"
                            stop-opacity="0"
                          />
                          <stop offset="0.515" stop-color="#2E3876" />
                          <stop
                            offset="0.99"
                            stop-color="#2E3876"
                            stop-opacity="0"
                          />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </div>
              </div>
              <div
                className="relative z-10 mq375:w-[350px] w-[320px] sm:w-[384px] h-[274px] mq1500:w-[410px] mq1500:h-[310px] mq2000:w-[550px] mq2000:h-[470px] rounded-[16px] border-[0.8px] border-[#ffffff4d]"
                style={{
                  background: `linear-gradient(0deg, #0E1A60, #0E1A60), 
                           radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 100%), 
                           radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%), 
                           radial-gradient(50% 50% at 50% 50%, rgba(133, 102, 255, 0.05) 0%, rgba(133, 102, 255, 0) 100%)
                           `,
                }}
              >
                <div
                  className="mq375:w-[350px] w-[320px] sm:w-[384px] h-[274px] mq1500:w-[410px] mq1500:h-[310px] mq2000:w-[550px] mq2000:h-[470px] rounded-[16px] border-[0.1px] border-[#ffffff4d]"
                  style={{
                    background: `linear-gradient(0deg, #0E1A60, #0E1A60),
                               radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 100%),
                               linear-gradient(0deg, rgba(220, 216, 255, 0.16), rgba(220, 216, 255, 0.16)),
                               linear-gradient(270deg, rgba(220, 216, 255, 0) 0%, rgba(220, 216, 255, 0) 48.96%, rgba(255, 255, 255, 0) 100%, rgba(220, 216, 255, 0) 100%)`,
                  }}
                >
                  <span>
                    <img
                      src="/grid.png"
                      className="mt-2 pr-2 w-full absolute"
                    />
                  </span>
                  <div className="flex flex-col justify-start gap-[17px] mq2000:gap-[47px] pl-[15px] mq375:pl-[35px] pr-[25px] py-[30px]">
                    <img
                      src="/icon2.png"
                      className="w-14 mq1500:w-16 mq2000:w-28"
                    />
                    <h1 className="text-white text-[24px] leading-[24px] mq1500:text-[28px] mq2000:text-[42px]">
                      Store in High Security
                    </h1>
                    <p className="text-[#FFFFFFB2] text-[18px] leading-[21px] mq1500:text-[22px] mq1500:leading-[25px] mq2000:text-[32px] mq2000:leading-[35px] font-sans">
                      Secure way to store your passwords in secrets and manage
                      them. Make your Passwords only for you.
                    </p>
                  </div>
                  <span className="w-full flex text-center justify-center">
                    <svg
                      width="350"
                      height="3"
                      viewBox="0 0 350 3"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.62598 1.4281H348.869"
                        stroke="url(#paint0_linear_1452_18135)"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_1452_18135"
                          x1="1.62598"
                          y1="1.9281"
                          x2="348.869"
                          y2="1.9281"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop
                            offset="0.025"
                            stop-color="#2E3876"
                            stop-opacity="0"
                          />
                          <stop offset="0.515" stop-color="#2E3876" />
                          <stop
                            offset="0.99"
                            stop-color="#2E3876"
                            stop-opacity="0"
                          />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </div>
              </div>
              <div
                className="relative z-10 mq375:w-[350px] w-[320px] sm:w-[384px] h-[274px] mq1500:w-[410px] mq1500:h-[310px] mq2000:w-[550px] mq2000:h-[470px] rounded-[16px] border-[0.8px] border-[#ffffff4d]"
                style={{
                  background: `linear-gradient(0deg, #0E1A60, #0E1A60), 
                           radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 100%), 
                           radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%), 
                           radial-gradient(50% 50% at 50% 50%, rgba(133, 102, 255, 0.05) 0%, rgba(133, 102, 255, 0) 100%)
                           `,
                }}
              >
                <div
                  className="mq375:w-[350px] w-[320px] sm:w-[384px] h-[274px] mq1500:w-[410px] mq1500:h-[310px] mq2000:w-[550px] mq2000:h-[470px] rounded-[16px] border-[0.1px] border-[#ffffff4d]"
                  style={{
                    background: `linear-gradient(0deg, #0E1A60, #0E1A60),
                               radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 100%),
                               linear-gradient(0deg, rgba(220, 216, 255, 0.16), rgba(220, 216, 255, 0.16)),
                               linear-gradient(270deg, rgba(220, 216, 255, 0) 0%, rgba(220, 216, 255, 0) 48.96%, rgba(255, 255, 255, 0) 100%, rgba(220, 216, 255, 0) 100%)`,
                  }}
                >
                  <span>
                    <img
                      src="/grid.png"
                      className="mt-2 pr-2 w-full absolute"
                    />
                  </span>
                  <div className="flex flex-col justify-start gap-[17px] mq2000:gap-[47px] pl-[15px] mq375:pl-[35px] pr-[25px] py-[30px]">
                    <img
                      src="/icon3.png"
                      className="w-14 mq1500:w-16 mq2000:w-28"
                    />
                    <h1 className="text-white text-[24px] mq1500:text-[28px] mq2000:text-[42px] leading-[24px]">
                      Unbreakable Passwords
                    </h1>
                    <p className="text-[#FFFFFFB2] text-[18px] leading-[21px] mq1500:text-[22px] mq1500:leading-[25px] mq2000:text-[32px] mq2000:leading-[35px] font-sans">
                      Use the strongest password for your accounts, located in
                      the internet. Give more work to the Hackers
                    </p>
                  </div>
                  <span className="w-full flex text-center justify-center">
                    <svg
                      width="350"
                      height="3"
                      viewBox="0 0 350 3"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.62598 1.4281H348.869"
                        stroke="url(#paint0_linear_1452_18135)"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_1452_18135"
                          x1="1.62598"
                          y1="1.9281"
                          x2="348.869"
                          y2="1.9281"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop
                            offset="0.025"
                            stop-color="#2E3876"
                            stop-opacity="0"
                          />
                          <stop offset="0.515" stop-color="#2E3876" />
                          <stop
                            offset="0.99"
                            stop-color="#2E3876"
                            stop-opacity="0"
                          />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </div>
              </div>
              <div
                className="relative z-20 mq375:w-[350px] w-[320px] sm:w-[384px] h-[274px] mq1500:w-[410px] mq1500:h-[310px] mq2000:w-[550px] mq2000:h-[470px] rounded-[16px] border-[0.8px] border-[#ffffff4d]"
                style={{
                  background: `linear-gradient(0deg, #0E1A60, #0E1A60), 
                           radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 100%), 
                           radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%), 
                           radial-gradient(50% 50% at 50% 50%, rgba(133, 102, 255, 0.05) 0%, rgba(133, 102, 255, 0) 100%)
                           `,
                }}
              >
                <div
                  className="mq375:w-[350px] w-[320px] sm:w-[384px] h-[274px] mq1500:w-[410px] mq1500:h-[310px] mq2000:w-[550px] mq2000:h-[470px] rounded-[16px] border-[0.1px] border-[#ffffff4d]"
                  style={{
                    background: `linear-gradient(0deg, #0E1A60, #0E1A60),
                               radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 100%),
                               linear-gradient(0deg, rgba(220, 216, 255, 0.16), rgba(220, 216, 255, 0.16)),
                               linear-gradient(270deg, rgba(220, 216, 255, 0) 0%, rgba(220, 216, 255, 0) 48.96%, rgba(255, 255, 255, 0) 100%, rgba(220, 216, 255, 0) 100%)`,
                  }}
                >
                  <span>
                    <img
                      src="/grid.png"
                      className="mt-2 pr-2 w-full absolute"
                    />
                  </span>
                  <div className="flex flex-col justify-start gap-[17px] mq2000:gap-[47px] pl-[15px]  mq375:pl-[35px] pr-[25px] py-[30px]">
                    <img
                      src="/icon1.png"
                      className="w-14 mq1500:w-16 mq2000:w-28"
                    />
                    <h1 className="text-white text-[24px] leading-[24px] mq1500:text-[28px] mq2000:text-[42px]">
                      Instant Store, Safe & Sort
                    </h1>
                    <p className="text-[#FFFFFFB2] text-[18px] leading-[21px] mq1500:text-[22px] mq1500:leading-[25px] mq2000:text-[32px] mq2000:leading-[35px] font-sans">
                      You can filter and sort data in Wope instantly , without
                      having to export it to a spreadsheet first
                    </p>
                  </div>
                  <span className="w-full flex text-center justify-center">
                    <svg
                      width="350"
                      height="3"
                      viewBox="0 0 350 3"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.62598 1.4281H348.869"
                        stroke="url(#paint0_linear_1452_18135)"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_1452_18135"
                          x1="1.62598"
                          y1="1.9281"
                          x2="348.869"
                          y2="1.9281"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop
                            offset="0.025"
                            stop-color="#2E3876"
                            stop-opacity="0"
                          />
                          <stop offset="0.515" stop-color="#2E3876" />
                          <stop
                            offset="0.99"
                            stop-color="#2E3876"
                            stop-opacity="0"
                          />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/*Web Background Image */}
          <img
            src="/scroll_bg.svg"
            className="absolute hidden top-[-150px] md:h-[480px] mq1330:h-auto w-full sm:block sm:object-cover z-10"
            alt="Scroll Background"
          />
          {/*Mobile Background Image */}
          <img
            src="/scroll_bg_m.svg"
            className="absolute  top-[-80px] w-full h-[1112px] sm:hidden object-cover z-10"
            alt="Scroll Background"
          />
        </section>

        {/* Third section */}
        <SpectreComponent />
      </section>
    </>
  );
}

export default Home;
