import { Link, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import Words from "../data/Seeds";
import { toast } from "react-toastify";
import { useAuth } from "../AuthContext";
import useCreateToken from "../hooks/useCreateToken";

function Login() {
  const navigate = useNavigate();
  const { mutate } = useCreateToken();
  const { isAuthenticated, login } = useAuth();

  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [seedsValue, setSeedsValue] = useState([]);

  const handleSubmit = () => {
    mutate(seedsValue.join(" "), {
      onSuccess: (res) => {
        login();
        toast.success("Logged In Successfully.", {
          className: "toast-message",
        });
        navigate("/dashboard/folders");
      },
      onError: (error) => {
        toast.error(error.response.data.detail, { className: "toast-message" });
        setError(
          "Login failed. Please check your credentials.",
          error.response.data
        );
      },
    });
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "Enter":
        const filteredSuggestions = Words.filter((word) =>
          word.toLowerCase().startsWith(inputValue.toLowerCase())
        );
        setSeedsValue([...seedsValue, filteredSuggestions[0]]);
        setInputValue("");
        setSuggestions([]);
        break;
      case "Backspace":
        if (inputValue === "") {
          setSeedsValue(seedsValue.slice(0, seedsValue.length - 1));
        }
        break;
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.trim();
    setInputValue(value);

    if (value.split(" ").length > 1) {
      setSeedsValue(value.split(" "));
      setInputValue("");
    }
    if (value.length > 0) {
      const filteredSuggestions = Words.filter((word) =>
        word.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue("");
    setSeedsValue([...seedsValue, suggestion]);
    setSuggestions([]);
  };

  const removeSeed = (indexToRemove) => {
    setSeedsValue(seedsValue.filter((_, index) => index !== indexToRemove));
  };
  if (isAuthenticated) return <Navigate to="/dashboard/folders" />;

  return (
    <section className="flex min-h-screen w-full justify-between flex-col-reverse md:flex-row">
      <section className="w-full md:w-[45%] h-[20vh] md:h-[100vh] flex justify-center items-center">
        <div className="hidden md:flex flex-col gap-[26px] mt-[95px]">
          <div className="flex flex-col md:ml-2 lg:ml-0 gap-[29px] max-w-[450px]">
            <Link to="/" className="flex items-center gap-[15px]">
              <img src="/logo.svg" className="cursor-pointer" />
              <h2 className="text-[22px] text-white font-[400] leading-[64px]">
                Password Manager
              </h2>
            </Link>
            <p className="dm-sans text-[18px] leading-[26px] font-[400] text-white">
              Login to your account with seed , We do the heavy lifting in a
              no-nonsense, ad-free, tracker-free, and cloud-free manner. Free
              and open source.
            </p>
          </div>
          <img className="md:w-[250px] lg:w-[300px] md:ml-5 lg:ml-0" src="/loginlock.png" />
        </div>
        <img className="block md:hidden" src="/loginlockv2.svg" />
      </section>
      <section className="relative w-full flex-col items-center md:w-[55%] bg-[#101E71] rounded-[0px_0px_60px_60px] md:rounded-[166px_0px_0px_166px] px-[20px]  flex justify-center">
        <nav className="md:hidden flex justify-center items-center py-[14px] gradient-border z-[2]">
          <Link to="/" className="flex items-center gap-[15px]">
            <img src="/logov2.svg" className="cursor-pointer" />
            <h2 className="text-[12px] leading-[36px] font-[400] text-white">
              Password Manager
            </h2>
          </Link>
        </nav>
        <img
            className="absolute w-[100%] md:hidden left-0 right-0 mx-auto"
            src="/loginForMobile.svg"
          />
        <div className="w-full h-[65vh] md:h-[100vh] z-[1] justify-center flex flex-col gap-[30px] md:gap-[42px] max-w-[637px]">
          <img
            className="w-[173px] hidden md:block md:w-[200px] lg:w-[220px] mx-auto z-[1]"
            src="/loginmainlogo.svg"
          />
         
          <h3 className="text-white hidden md:block text-center text-[31px] md:text-[46px] leading-[43px] md:leading-[64px] font-[400]">
            Log In
          </h3>
          <div className="flex flex-col mt-[130px] md:mt-0 gap-[4px]">
            <div className="flex items-center justify-between">
              <label className="dm-sans text-[#DFDFDF] text-[16px] leading-[32px] font-[400]">
                Key Seed
              </label>
              {seedsValue.length == 16 && (
                <span>
                  <svg
                    width="27"
                    height="27"
                    viewBox="0 0 27 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="13.5" cy="13.5" r="13.5" fill="#1E9700" />
                    <path
                      d="M9 14L12.5 17.5L19.5 10"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </div>
            <div className="border-[1px] rounded-[10px] flex gap-[8px] py-[15px] px-[19px] flex-wrap border-[#28399F] outline-none bg-[#0E1A60]">
              {seedsValue?.map((seed, index) => (
                <span
                  key={index}
                  className="group cursor-pointer dm-sans border-[#9F42FF] border-[1px] px-[8px] text-[16px] leading-[27px] font-[400] text-white rounded-[6px]"
                >
                  {seed}
                  <span
                    className="cursor-pointer ml-1 text-[#ab1c1c] text-xl hidden group-hover:inline"
                    onClick={() => removeSeed(index)}
                  >
                    x
                  </span>
                </span>
              ))}
              {seedsValue.length < 16 && (
                <input
                  className="dm-sans outline-none bg-[#0E1A60] placeholder:text-[#DFDFDF36] text-white text-[16px] leading-[32px] font-[400]"
                  placeholder="Enter your key seed..."
                  value={inputValue}
                  onChange={(e) => handleInputChange(e)}
                  onKeyDown={handleKeyDown}
                />
              )}
            </div>
            <div className="flex gap-[8px] mt-[11px] flex-wrap">
              {suggestions.map((seed, index) => (
                <span
                  onClick={() => handleSuggestionClick(seed)}
                  key={index}
                  className="dm-sans cursor-pointer border-[#9F42FF] border-[1px] px-[8px] text-[16px] leading-[27px] font-[400] text-white rounded-[6px]"
                >
                  {seed}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-[14.64px] md:gap-[32px]">
            <button
              onClick={handleSubmit}
              className="mx-[auto] bg-[linear-gradient(90deg,_#A143FF_0%,_#5003DB_100%)] py-[10px] 
              md:py-[19px] md:max-w-[312px] max-w-[244px]  w-[100%] rounded-[11.61px] md:rounded-[18.37px] outline-none 
              border-none text-[12px] md:text-[15.5px] leading-[15.26px] 
              md:leading-[20.18px] font-[400] text-[#FFFFFF66] dm-sans"
            >
              Next
            </button>
            <p className="dm-sans text-center text-[#DFDFDF] text-[12px] md:text-[16px] leading-[32px] font-[400]">
              Don’t you have any account?{" "}
              <Link className="text-[#A143FF]" to="/auth/register">
                {" "}
                Register{" "}
              </Link>
            </p>
          </div>
        </div>
        <img
          className="hidden md:block absolute right-0 top-[-10px]"
          src="/loginpattern.svg"
        />
      </section>
    </section>
  );
}

export default Login;
