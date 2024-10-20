import React from "react";

function SpectreComponent() {
  return (
    <>
      <section className="w-full h-[480px] relative bg-[#0e1a60]">
        <section className="flex flex-col sm:flex-row justify-arround gap-[250px] sm:pl-[60px]  pb-32 sm:pb-52 mq1024:pr-20 mq1150:pr-36 w-full relative z-10">
          <section className="flex flex-col gap-[20px] sm:gap-[30px] sm:w-[43%] items-start pb-[140px] sm:pb-0 sm:pt-[70px]">
            {/* Button */}
            <button
              className="rounded-[12px] border-[0.8px] border-[#fff] backdrop-blur-[11px] flex justify-between p-[5px] items-center text-[#EFFAFF] font-[400] text-[12px] sm:text-[16px] xs:leading-[64px] h-[39px] dm-sans outline-none w-[175px] md:w-[212px]"
              style={{
                background: `linear-gradient(180deg, rgba(255, 255, 255, 0.19) 0%, rgba(153, 153, 153, 0.19) 100%)`,
              }}
            >
              Try our Additional Solution
            </button>

            {/* Headline */}
            <h1 className="text-white text-[32px] sm:w-full md:text-[66px] font-[400] leading-[36px] md:leading-[61px]">
              Password <br /> without saving <br /> password
            </h1>
            <h1 className="text-[#FFFFFFB2] font-sans text-[12px] md:text-[18px] font-[400] leading-[15.62px] md:leading-[22px]">
              Let us store your passwords and auto-fill them into your favorite
              apps, so you can forget all about them. We do the heavy lifting in
              a no-nonsense, ad-free, tracker-free, and cloud-free manner. Free
              and open source.
            </h1>
          </section>

          <section className="flex relative flex-col justify-center items-center sm:gap-[30px]">
            <div
              className="mq350:w-[310px] mq425:w-[390.46px] mq400:w-[340.46px] h-[481.43px] sm:w-[471.7px] relative sm:h-[575.53px] rounded-[16.48px] sm:rounded-[19.73px] flex flex-col justify-center text-center border-[1px] border-[#ffffff94] pl-[10px] pr-0 sm:px-[25px] py-[8px]"
              style={{
                background: `
                linear-gradient(270deg, rgba(220, 216, 255, 0) 0%, rgba(220, 216, 255, 0) 48.96%, rgba(255, 255, 255, 0) 100%, rgba(220, 216, 255, 0) 100%),
                linear-gradient(0deg, #182783, #182783),
                radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
                radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
                radial-gradient(50% 50% at 50% 50%, rgba(133, 102, 255, 0.05) 0%, rgba(133, 102, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
               `,
              }}
            >
              <img
                src="\spreadsheet-grid.png"
                className="w-full pr-9 sm:pr-11 pb-[290px] sm:pb-[350px] absolute z-0"
              />
              <div className="flex flex-col gap-1 relative z-10 mt-5 sm:mt-0">
                <label
                  htmlFor="name"
                  className="flex font-sans  items-center text-[#FFFFFFB2] text-[12px] sm:text-[16px] leading-[19.69px]  gap-[0.5px]"
                >
                  <svg
                    width="23"
                    height="22"
                    viewBox="0 0 23 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.4"
                      d="M11.3102 2.23535C8.9651 2.23535 7.05859 4.14185 7.05859 6.48694C7.05859 8.78727 8.85769 10.649 11.2028 10.7296C11.2744 10.7206 11.346 10.7206 11.3997 10.7296C11.4176 10.7296 11.4265 10.7296 11.4444 10.7296C11.4534 10.7296 11.4534 10.7296 11.4623 10.7296C13.7537 10.649 15.5528 8.78727 15.5618 6.48694C15.5618 4.14185 13.6553 2.23535 11.3102 2.23535Z"
                      fill="white"
                    />
                    <path
                      d="M15.8571 13.1104C13.3598 11.4456 9.28723 11.4456 6.77208 13.1104C5.63534 13.8713 5.00879 14.9006 5.00879 16.0015C5.00879 17.1025 5.63534 18.1228 6.76313 18.8747C8.01623 19.7161 9.66316 20.1368 11.3101 20.1368C12.957 20.1368 14.604 19.7161 15.8571 18.8747C16.9848 18.1139 17.6114 17.0935 17.6114 15.9836C17.6024 14.8827 16.9848 13.8623 15.8571 13.1104Z"
                      fill="white"
                    />
                  </svg>
                  Your Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  className="p-2 text-[14px] font-sans  sm:text-[16px] font-[700] rounded-[4.49px] sm:rounded-[8px] mq350:w-[280.86px]  mq400:w-[309.86px] mq425:w-[349.86px] h-[38.87px] sm:w-[418.89px] sm:h-[46.54px] bg-[#0E1A60] text-white focus:outline-none"
                />
              </div>
              <div className="flex justify-center mb-3 mt-1">
                <h1 className="text-[16.11px] h-[20px] w-[11px] text-[#A143FF] font-[500]">
                  X
                </h1>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="secretKey"
                  className="flex items-center text-[#FFFFFFB2] text-[12px] sm:text-[16px] leading-[19.69px] gap-[1.5px] font-sans"
                >
                  <img src="\secret.svg" />
                  Your Spectre Secret
                </label>
                <input
                  type="password"
                  id="secretKey"
                  placeholder="Secret Key"
                  className="p-2 text-[14px] font-sans  sm:text-[16px] font-[700] rounded-[4.49px] sm:rounded-[8px] mq350:w-[280.86px] mq400:w-[309.86px] mq425:w-[349.86px] h-[38.87px] sm:w-[418.89px] sm:h-[46.54px] bg-[#0E1A60] text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col items-center text-center mb-1 mt-6">
                <p>
                  {" "}
                  <svg
                    width="431"
                    height="3"
                    viewBox="0 0 431 3"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mq350:w-[320px] w-[350px] sm:w-[431px]"
                  >
                    <path
                      d="M1.35938 1.73767H429.529"
                      stroke="url(#paint0_linear_1554_8622)"
                      stroke-width="2.46611"
                      stroke-linecap="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_1554_8622"
                        x1="1.35938"
                        y1="2.23767"
                        x2="429.529"
                        y2="2.23767"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop
                          offset="0.025"
                          stop-color="#2E3876"
                          stop-opacity="0"
                        />
                        <stop offset="0.515" stop-color="#404D9B" />
                        <stop
                          offset="0.99"
                          stop-color="#2E3876"
                          stop-opacity="0"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </p>

                <p className="mt-3">
                  <svg
                    width="13"
                    height="16"
                    viewBox="0 0 13 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.483622 8.69214C0.531018 8.57629 0.611301 8.47726 0.714318 8.40757C0.817334 8.33789 0.938457 8.30068 1.06237 8.30065L6.07455 8.30065L6.07455 0.692796C6.07455 0.524652 6.14056 0.363394 6.25806 0.244498C6.37555 0.125603 6.53491 0.0588083 6.70108 0.0588083C6.86724 0.0588083 7.0266 0.125603 7.14409 0.244498C7.26159 0.363394 7.3276 0.524652 7.3276 0.692796L7.3276 8.30065H12.3398C12.4638 8.30056 12.585 8.33769 12.6881 8.40734C12.7912 8.477 12.8716 8.57605 12.9191 8.69196C12.9665 8.80787 12.9789 8.93542 12.9547 9.05847C12.9305 9.18151 12.8708 9.29452 12.783 9.38319L7.14434 15.0891C7.08615 15.148 7.01706 15.1948 6.941 15.2267C6.86494 15.2586 6.78341 15.275 6.70108 15.275C6.61874 15.275 6.53721 15.2586 6.46116 15.2267C6.3851 15.1948 6.316 15.148 6.25781 15.0891L0.619106 9.38319C0.531514 9.29448 0.471889 9.18147 0.447773 9.05846C0.423656 8.93546 0.436132 8.80797 0.483622 8.69214Z"
                      fill="#A143FF"
                    />
                  </svg>
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="name"
                  className="flex items-center text-[#FFFFFFB2] text-[12px] sm:text-[16px] gap-[2px] leading-[19.69px] font-sans"
                >
                  <img src="\site_domain.svg" />
                  Sit Domain
                </label>
                <input
                  type="url"
                  id="url"
                  placeholder="https://example.com"
                  className="p-2 rounded-[4.49px] font-sans  text-[14px] sm:text-[16px] font-[700] sm:rounded-[8px] mq350:w-[280.86px]  mq400:w-[309.86px] mq425:w-[349.86px] h-[38.87px] sm:w-[418.89px] sm:h-[46.54px] bg-[#0E1A60] text-white focus:outline-none"
                />
              </div>
              <div className="flex justify-center mb-3 mt-3">
                <h1 className="text-[21.48px] leading-[16.96px] h-[20px] w-[11px] text-[#A143FF] font-[500]">
                  =
                </h1>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="secretKey"
                  className="flex items-center text-[#FFFFFFB2] text-[16px] leading-[19.69px] gap-[2px] font-sans"
                >
                  <img src="\pass_lock.svg" />
                  Site Password
                </label>
                <div className="bg-[#2A3992] mq350:w-[280.86px] mq400:w-[309.86px] mq425:w-[349.86px] h-[38.87px] sm:w-[418.89px] sm:h-[46.54px] rounded-[4.49px] sm:rounded-[5.37px] flex justify-between items-center px-3 focus:outline-none">
                  <div className="text-white text-[14px] sm:text-[16px] leading-[19.69px] font-[700] font-sans">
                    Cor657656
                  </div>
                  <div
                    style={{
                      background: `linear-gradient(90deg, #A143FF 0%, #5003DB 100%)`,
                    }}
                    className="flex items-center justify-center w-[34.39px] h-[30.65px] sm:w-[41.17px] sm:h-[36.7px] rounded-[5.37px]"
                  >
                    <svg
                      width="22"
                      height="23"
                      viewBox="0 0 22 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.14746 10.9039C6.14746 8.4639 6.14746 7.24391 6.90201 6.48579C7.65745 5.72766 8.87206 5.72766 11.3031 5.72766H13.8809C16.311 5.72766 17.5265 5.72766 18.2811 6.48579C19.0365 7.24391 19.0365 8.4639 19.0365 10.9039V15.2181C19.0365 17.6581 19.0365 18.8781 18.2811 19.6362C17.5265 20.3943 16.311 20.3943 13.8809 20.3943H11.3031C8.87206 20.3943 7.65745 20.3943 6.90201 19.6362C6.14657 18.8781 6.14746 17.6581 6.14746 15.2181V10.9039Z"
                        fill="white"
                      />
                      <path
                        opacity="0.5"
                        d="M3.97383 3.54182C2.9248 4.58995 2.9248 6.27806 2.9248 9.65337V11.4435C2.9248 14.8188 2.9248 16.5069 3.97383 17.5551C4.52609 18.1082 5.25647 18.3696 6.31892 18.4931C6.14706 17.7412 6.14706 16.7065 6.14706 15.2171V10.9038C6.14706 8.46382 6.14706 7.24384 6.90161 6.48571C7.65705 5.72759 8.87166 5.72759 11.3027 5.72759H13.8805C15.3591 5.72759 16.3867 5.72759 17.1368 5.89765C17.0132 4.82983 16.7519 4.09677 16.1969 3.54182C15.1488 2.4928 13.4607 2.4928 10.0854 2.4928C6.71006 2.4928 5.02196 2.4928 3.97383 3.54182Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-[12px] mt-2 sm:mt-4 font-sans leading-[19.69px] text-[#FFFFFFB2]">
                The information never leaves this page
              </p>
              <span className="mt-3 sm:mt-5">
                <svg
                  width="431"
                  height="4"
                  viewBox="0 0 431 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mq350:w-[320px] w-[350px] sm:w-[431px]"
                >
                  <path
                    d="M1.56934 2.20984H429.739"
                    stroke="url(#paint0_linear_1554_8594)"
                    stroke-width="2.46611"
                    stroke-linecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1554_8594"
                      x1="1.56934"
                      y1="2.70984"
                      x2="429.739"
                      y2="2.70984"
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
          </section>
        </section>

        {/*Web Background Image */}
        <img
          src="\webSectBG.svg"
          className="absolute hidden top-[-440px] w-full sm:block sm:object-cover z-0"
          alt="Scroll Background"
        />

        {/*Mobile Background Image */}
        <img
          src="\mobileSection2.svg"
          className="absolute mq350:bottom-[-280px] mq375:bottom-[-300px] mq400:bottom-[-370px] w-full sm:hidden"
          alt="Scroll Background"
        />
      </section>
    </>
  );
}

export default SpectreComponent;
