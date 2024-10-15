import React from "react";
import { Link } from "react-router-dom";
import SpectreSecret from "../components/spectreSecret";
function Home() {
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
        <section className="container relative z-20 flex items-center">
          <section className="flex flex-col md:flex-row justify-between pt-[26px] w-full relative">
            <section className="flex flex-col gap-[10px] sm:gap-[30px] sm:w-[60%] items-start sm:px-[60px] sm:pt-[60px]">
              {/* Button */}
              <button
                className="rounded-[12px] border-[0.8px] border-[#fff] backdrop-blur-[11px] flex justify-between p-[5px] sm:p-[10px] items-center text-[#EFFAFF] font-[400] text-[12px] sm:text-[16px] xs:leading-[64px] h-[39px] dm-sans gap-[9px] outline-none min-w-[210px] md:min-w-[254px]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255, 255, 255, 0.19) 0%, rgba(153, 153, 153, 0.19) 100%)",
                }}
              >
                Cross-platform Password Manager
              </button>

              {/* Headline */}
              <h1 className="text-white text-[32px] md:text-[66px] font-[400] leading-[36px] md:leading-[61px]">
                Secure Your Systems with the Ultimate Password Manager
              </h1>
              <h1 className="text-[#FFFFFFB2] font-sans text-[12px] md:text-[18px] font-[400] leading-[15.62px] md:leading-[22px]">
                Let us store your passwords and auto-fill them into your
                favorite apps, so you can forget all about them. We do the heavy
                lifting in a no-nonsense, ad-free, tracker-free, and cloud-free
                manner. Free and open source.
              </h1>

              {/* Get Started Button */}
              <button className="bg-white hidden sm:block outline-none border-[0.797px] border-[#fff] rounded-[14px] py-[14px] px-[24px] text-[#002550] font-[400] text-[20px] dm-sans">
                Get Started
              </button>

              {/* Mobile buttons */}
              <div className="flex items-center gap-[20px] sm:hidden">
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
            </section>

            {/* Image section */}
            <section className="container flex flex-col sm:w-[50%] h-[100vh]">
              <img
                src="/lock_with_icon.png"
                className="lg:w-[95%]"
                alt="Lock"
              />
            </section>
          </section>
        </section>

        {/* Background Image for Larger Screens */}
        <img
          src="/background_img.png"
          className="absolute hidden top-[-81px] h-[100vh] w-[100vw] sm:block sm:object-cover"
          alt="Background"
        />

        {/* Background Image for Mobile Screens */}
        <img
          src="/bg_mobile.png"
          className="absolute top-[-81px] h-[100vh] w-full object-cover sm:hidden"
          alt="Mobile Background"
        />

        {/* Second section */}
        <section className="w-full h-[480px] relative bg-[#0e1a60]">
          <section className="flex flex-row justify-between w-full relative">
            <div className="flex gap-[30px] overflow-x-auto scrollbar-hide scroll-smooth mx-8">
              <div
                className="relative z-10 w-[384px] h-[274px] rounded-[16px] border-[0.8px] border-[#ffffff4d]"
                style={{
                  background: `linear-gradient(0deg, #0E1A60, #0E1A60), 
                           radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 100%), 
                           radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%), 
                           radial-gradient(50% 50% at 50% 50%, rgba(133, 102, 255, 0.05) 0%, rgba(133, 102, 255, 0) 100%)
                           `,
                }}
              >
                <div
                  className="w-[384px] h-[274px] rounded-[16px] border-[1px] border-[#ffffff4d]"
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
                  <div className="flex flex-col justify-start gap-[17px] pl-[35px] pr-[25px] py-[30px]">
                    <img src="/icon1.png" className="w-14" />
                    <h1 className="text-white text-[24px] leading-[24px]">
                      Instant Store, Safe & Sort
                    </h1>
                    <p className="text-[#FFFFFFB2] text-[18px] leading-[21px] font-sans">
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
                className="relative z-10 w-[384px] h-[274px] rounded-[16px] border-[0.8px] border-[#ffffff4d]"
                style={{
                  background: `linear-gradient(0deg, #0E1A60, #0E1A60), 
                           radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 100%), 
                           radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%), 
                           radial-gradient(50% 50% at 50% 50%, rgba(133, 102, 255, 0.05) 0%, rgba(133, 102, 255, 0) 100%)
                           `,
                }}
              >
                <div
                  className="w-[384px] h-[274px] rounded-[16px] border-[0.1px] border-[#ffffff4d]"
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
                  <div className="flex flex-col justify-start gap-[17px] pl-[35px] pr-[25px] py-[30px]">
                    <img src="/icon2.png" className="w-14" />
                    <h1 className="text-white text-[24px] leading-[24px]">
                      Store in High Security
                    </h1>
                    <p className="text-[#FFFFFFB2] text-[18px] leading-[21px] font-sans">
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
                className="relative z-10 w-[384px] h-[274px] rounded-[16px] border-[0.8px] border-[#ffffff4d]"
                style={{
                  background: `linear-gradient(0deg, #0E1A60, #0E1A60), 
                           radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 100%), 
                           radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%), 
                           radial-gradient(50% 50% at 50% 50%, rgba(133, 102, 255, 0.05) 0%, rgba(133, 102, 255, 0) 100%)
                           `,
                }}
              >
                <div
                  className="w-[384px] h-[274px] rounded-[16px] border-[0.1px] border-[#ffffff4d]"
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
                  <div className="flex flex-col justify-start gap-[17px] pl-[35px] pr-[25px] py-[30px]">
                    <img src="/icon3.png" className="w-14" />
                    <h1 className="text-white text-[24px] leading-[24px]">
                      Unbreakable Passwords
                    </h1>
                    <p className="text-[#FFFFFFB2] text-[18px] leading-[21px] font-sans">
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
                className="relative z-10 w-[384px] h-[274px] rounded-[16px] border-[0.8px] border-[#ffffff4d]"
                style={{
                  background: `linear-gradient(0deg, #0E1A60, #0E1A60), 
                           radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 100%), 
                           radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%), 
                           radial-gradient(50% 50% at 50% 50%, rgba(133, 102, 255, 0.05) 0%, rgba(133, 102, 255, 0) 100%)
                           `,
                }}
              >
                <div
                  className="w-[384px] h-[274px] rounded-[16px] border-[0.1px] border-[#ffffff4d]"
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
                  <div className="flex flex-col justify-start gap-[17px] pl-[35px] pr-[25px] py-[30px]">
                    <img src="/icon1.png" className="w-14" />
                    <h1 className="text-white text-[24px] leading-[24px]">
                      Instant Store, Safe & Sort
                    </h1>
                    <p className="text-[#FFFFFFB2] text-[18px] leading-[21px] font-sans">
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

          {/* Background Image */}
          <img
            src="/scroll_bg.svg"
            className="absolute hidden top-[-150px] w-full sm:block sm:object-cover z-0"
            alt="Scroll Background"
          />
        </section>

        {/* Third section */}
        <SpectreSecret />
      </section>
    </>
  );
}

export default Home;
