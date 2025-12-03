import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { ThreeCircles, ThreeDots } from "react-loader-spinner";

import { useAuth } from "../AuthContext";
import useRegisterSeeds from "../hooks/useRegisterSeeds";
import useCreateToken from "../hooks/useCreateToken";
import {
  deriveSeedsHash,
  generateSeedPhrase,
  performSignup,
} from "../utils/cryptoOperations";

function RegisterInstruction() {
  const { signup } = useAuth();
  const { mutate: registerSeeds, isPending: isRegistering } =
    useRegisterSeeds();
  const { mutate: createToken, isPending: isCreatingToken } = useCreateToken();
  const retryAttempt = useRef(0);
  const [seedsData, setSeedsData] = useState(null);
  const [copytext, setCopyText] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  // Effect to generate seed phrase and crypto payload

  useEffect(() => {
    async function registerCryptoData() {
      setIsGenerating(true);
      try {
        const seedPhrase = await generateSeedPhrase();

        const cryptoData = await performSignup(seedPhrase);
        const payload = {
          enc_salt: cryptoData.encSalt,
          encrypted_private_key: cryptoData.encryptedPrivateKey,
          encrypted_private_key_iv:
            cryptoData.encryptedPrivateKeyIV,
          encrypted_private_key_tag:
            cryptoData.encryptedPrivateKeyTag,
          pass_phrase: cryptoData.loginHash,
          public_key: cryptoData.publicKey,
        };

        registerSeeds(payload, {
          onSuccess: () => {
            setSeedsData(seedPhrase);
            setIsGenerating(false);
          },
          onError: (error) => {
            console.log("Registration error:", error.response.data[0]);
            const errorMessage =
              error.response.data[0] || "Registration failed.Please try again.";
            if (retryAttempt.current === 0) {
              retryAttempt.current = 1;
              registerCryptoData();
            } else {
              toast.error(errorMessage);
              setIsGenerating(false);
            }
          },
        });
      } catch (error) {
        console.error("Crypto error:", error);
        if (retryAttempt.current === 0) {
          retryAttempt.current = 1;
          registerCryptoData();
        } else {
          toast.error("Failed to generate credentials. Please refresh.");
          setIsGenerating(false);
        }
      }
    }

    registerCryptoData();
  }, []);


  const copyToClipBoard = () => {
    if (!seedsData) return;
    setCopyText(true);
    navigator.clipboard.writeText(seedsData);
    setTimeout(() => {
      setCopyText(false);
    }, 700);
  };

  const savePdf = () => {
    if (!seedsData) return;

    const blob = new Blob([seedsData], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "seed.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async () => {
    const seedsHash = await deriveSeedsHash(seedsData);
    const payload = {
      pass_phrase: seedsHash.loginHash,
    };
    createToken(payload, {
      onSuccess: async(response) => {
        await handleSuccessfulLogin(response, seeds);
        toast.success("Logged In Successfully.");
        signup();
        navigate("/dashboard/folders");
      },
      onError: (error) => {
        toast.error("Login failed. Please try logging in manually.", {
          className: "toast-message",
        });
      },
    });
  };

  return (
    <>
      <img
        className="w-[173px] hidden md:block lg:w-[210px] mx-auto"
        src="/registrationlogov2.svg"
      />
      <h3 className="text-white z-[3] mt-[180px] md:mt-0 text-center flex items-center justify-center gap-4 text-[25px] lg:text-[46px] leading-[43px] lg:leading-[64px] font-[400]">
        Your Seed{" "}
        {console.log(
          "Generating:",
          isGenerating,
          "Registering:",
          isRegistering
        )}
        {(isGenerating || isRegistering) && (
          <ThreeCircles height="20" width="20" color="white" />
        )}
      </h3>

      {/* Loading state */}
      {/* {isGenerating && (
        <div className="text-white text-center my-8">
          <ThreeDots color="white" height={30} width={30} />
          <p>Generating secure credentials...</p>
        </div>
      )} */}

      {/* Display seed phrase when ready */}

      <div className="flex flex-col gap-[2px]">
        <div className="border-[1px] py-[8px] z-[3] md:py-[21px] pb-[10px] px-[19px] h-[166px] md:h-auto border-[#28399F] outline-none bg-[#0E1A60]">
          <div className="flex gap-[4px] md:gap-[8px] flex-wrap">
            {seedsData?.split(" ").map((word, index) => (
              <span
                key={index}
                className="dm-sans border-[#9F42FF] border-[1px] px-[8px] text-[12px] md:text-[16px] leading-[27px] font-[400] text-white rounded-[6px]"
              >
                {word}
              </span>
            ))}
          </div>
          <div className="flex justify-end gap-[26px] items-center mt-0 md:mt-[20px]">
            <span
              onClick={savePdf}
              className="dm-sans cursor-pointer flex gap-[4.96px] text-[#FFFFFFA1] text-[16px] font-[400] leading-[27px]"
            >
              <svg
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8887 13.6443L13.8792 16.6348L16.8697 13.6443"
                  stroke="white"
                  strokeOpacity="0.63"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.8789 4.67273V16.553"
                  stroke="white"
                  strokeOpacity="0.63"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M23.3645 14.2284C23.3645 19.3917 19.86 23.5737 14.0192 23.5737C8.17833 23.5737 4.67383 19.3917 4.67383 14.2284"
                  stroke="white"
                  strokeOpacity="0.63"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Save
            </span>
            <span
              onClick={copyToClipBoard}
              className="dm-sans cursor-pointer flex gap-[4.96px] text-[#FFFFFFA1] text-[16px] font-[400] leading-[27px]"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {copytext ? (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 11L8 17L20 3"
                      stroke="white"
                      strokeOpacity="0.63"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <>
                    <path
                      d="M18.2606 4.84595H7.58793C6.07452 4.84595 4.84766 6.07281 4.84766 7.58622V18.2589C4.84766 19.7723 6.07452 20.9991 7.58793 20.9991H18.2606C19.774 20.9991 21.0008 19.7723 21.0008 18.2589V7.58622C21.0008 6.07281 19.774 4.84595 18.2606 4.84595Z"
                      stroke="white"
                      strokeOpacity="0.63"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.1291 4.84599L17.1532 3.6922C17.1511 2.97881 16.8669 2.29521 16.3624 1.79077C15.858 1.28632 15.1744 1.00203 14.461 1H4.0768C3.26152 1.00241 2.48032 1.32734 1.90383 1.90383C1.32734 2.48032 1.00241 3.26152 1 4.0768V14.461C1.00203 15.1744 1.28632 15.858 1.79077 16.3624C2.29521 16.8669 2.97881 17.1511 3.6922 17.1532H4.84599"
                      stroke="white"
                      strokeOpacity="0.63"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </>
                )}
              </svg>
              {copytext ? "Copied" : "Copy"}
            </span>
          </div>
        </div>
        <p className="dm-sans z-[3] text-[#A143FF] text-[12px] md:text-[16px] leading-[27px] font-[400]">
          Please write these down incase you lose your seed
        </p>
      </div>

      <div className="flex flex-col gap-[5px] lg:gap-[20px]">
        <button
          onClick={handleSubmit}
          disabled={!seedsData || isCreatingToken}
          className="dm-sans z-[3] mx-[auto] bg-[linear-gradient(90deg,_#A143FF_0%,_#5003DB_100%)] py-[10px] 
                lg:py-[19px] max-w-[244px] md:max-w-[312px] w-[100%] rounded-[11.61px] lg:rounded-[18.37px] outline-none 
                border-none text-[12px] lg:text-[15.5px] leading-[15.26px] 
                lg:leading-[20.18px] font-[400] text-white flex items-center justify-center
                disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          {isCreatingToken && (
            <ThreeDots
              color="white"
              height={10}
              width={30}
              ariaLabel="loading"
              wrapperStyle={{
                marginLeft: "5%",
              }}
            />
          )}
        </button>
        <p className="dm-sans text-center z-[3] text-[#DFDFDF] text-[12px] lg:text-[16px] leading-[32px] font-[400]">
          Already have account?
          <Link className="text-[#A143FF]" to="/auth/login">
            {" "}
            Login here
          </Link>
        </p>
      </div>
    </>
  );
}

export default RegisterInstruction;
