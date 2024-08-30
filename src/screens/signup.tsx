import background from "../assets/background.png";
import logo from "../assets/coopridelogo.png";
import { ConfigProvider } from "antd";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useMutation } from "../../node_modules/@tanstack/react-query/build/legacy/useMutation";
import { signUp } from "../api/auth.api";
import { ValidatorClass } from "../utils/validator";

const Signup = () => {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    city: "",
    phone_number: "",
    business_name: "",
    password: "",
    privacyPolicy: false,
    user_type: "merchant",
  });

  const handleChangeFormData = (key: string, value: string | boolean) => {
    setFormData((prev) => {
      const newData = {
        ...prev,
        [key]: value,
      };

      return newData;
    });
  };

  const handleSignup = useMutation({
    mutationFn: () => signUp(formData),
    onSuccess(data: any) {
      navigate("/verifyotp", { state: { email: formData.email } });
    },
  });

  const validator = new ValidatorClass();
  const formError = validator
    .firstName(formData.first_name)
    .lastName(formData.last_name)
    .phone(formData.phone_number)
    .email(formData.email)
    .password(formData.password)
    .companyName(formData.business_name)
    .state(formData.city)
    .isPrivacyChecked(formData.privacyPolicy);

  return (
    <ConfigProvider
      theme={{
        token: {
          primary: "blue",
        },
      }}
    >
      <div
        className="flex justify-center items-center h-screen bg-cover bg-center p-5 "
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="bg-white flex flex-col items-center rounded-xl p-4 sm:m-0 h-full sm:h-fit overflow-y-auto w-full sm:w-fit">
          <img src={logo} className="w-28 justify-center" />
          <div className="pt-5 ">
            <h2 className="text-center font-bold text-[22px]">Sign Up to CoopRide Owner</h2>
            <h5 className="text-center font-thin text-[14px] pt-3">Manage & organize vehicle fleet seeminglessly</h5>
            <div className="gap-5 flex flex-col mt-5">
              <div className="gap-5 flex flex-col sm:flex-row">
                <div className="w-full">
                  <input
                    value={formData.first_name}
                    onChange={(e) => handleChangeFormData("first_name", e.target.value)}
                    type="text"
                    placeholder="Your first name"
                    className="w-full p-3 rounded-xl bg-transparent border border-gray text-sm"
                  />
                </div>
                <div className="w-full">
                  <input
                    value={formData.last_name}
                    onChange={(e) => handleChangeFormData("last_name", e.target.value)}
                    type="text"
                    placeholder="Your last name"
                    className="w-full p-3 rounded-xl bg-transparent border border-gray text-sm"
                  />
                </div>
              </div>

              <div className="gap-5 flex flex-col sm:flex-row">
                <div className="relative flex items-center">
                  <Icon
                    icon="ic:outline-mail"
                    width="1.6em"
                    height="1.6em"
                    className="absolute flex flex-col justify-evenly pl-3"
                    style={{ color: "#119001" }}
                  />
                  <input
                    value={formData.email}
                    onChange={(e) => handleChangeFormData("email", e.target.value)}
                    type="text"
                    placeholder="Email Address"
                    className="w-full p-3 rounded-xl bg-transparent border border-gray pl-12 text-sm"
                  />
                </div>
                <div className="relative flex items-center">
                  <Icon
                    icon="prime:lock"
                    width="1.6em"
                    height="1.6em"
                    className="absolute flex flex-col justify-evenly pl-3"
                    style={{ color: "#119001" }}
                  />
                  <input
                    value={formData.password}
                    onChange={(e) => handleChangeFormData("password", e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full p-3 rounded-xl bg-transparent border border-gray pl-12 text-sm"
                  />
                  <div
                    className="absolute flex justify-end right-2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Icon icon="iconamoon:eye-off-thin" width="1.2em" height="1.2em" className="" />
                    ) : (
                      <Icon icon="mdi-light:eye" width="1.2em" height="1.2em" className="" style={{}} />
                    )}
                  </div>
                </div>
              </div>

              <div className="relative flex items-center">
                <Icon
                  icon="carbon:phone"
                  width="1.6em"
                  height="1.6em"
                  className="absolute flex flex-col justify-evenly pl-3"
                  style={{ color: "#119001" }}
                />
                <input
                  value={formData.phone_number}
                  onChange={(e) => handleChangeFormData("phone_number", e.target.value)}
                  type="text"
                  placeholder="Phone Number"
                  className="w-full p-3 rounded-xl bg-transparent border border-gray pl-12 text-sm"
                />
              </div>
              <div>
                <div className="relative flex items-center cursor-pointer" onClick={() => setOpen(!open)}>
                  <Icon
                    icon="solar:global-linear"
                    width="1.6em"
                    height="1.6em"
                    className="absolute flex flex-col justify-evenly pl-3"
                    style={{ color: "#119001" }}
                  />
                  <input
                    value={formData.city}
                    onChange={(e) => handleChangeFormData("city", e.target.value)}
                    type="text"
                    placeholder="City"
                    className="w-full p-3 rounded-xl bg-transparent border border-gray pl-12 text-sm"
                  />
                  <Icon
                    icon={open ? "fe:arrow-up" : "fe:arrow-down"}
                    width="1.2em"
                    height="1.2em"
                    className="absolute flex justify-end right-2"
                    style={{ color: "#119001" }}
                  />
                </div>
                <p className="text-sm">This is where your fleet will operate</p>
              </div>

              <div>
                <input
                  value={formData.business_name}
                  onChange={(e) => handleChangeFormData("business_name", e.target.value)}
                  type="text"
                  placeholder="Company Name"
                  className="w-full p-3 rounded-xl bg-transparent border border-gray text-sm"
                />
                <p className="text-[12px]">Please use your company's legal name written in full</p>
              </div>

              <div className="flex">
                <input
                  onClick={() => handleChangeFormData("privacyPolicy", !formData["privacyPolicy"])}
                  type="checkbox"
                  value={formData.privacyPolicy ? "true" : ""}
                  className="accent-green"
                  style={{}}
                />
                <p className="text-[12px] pl-3">
                  By continuing, i agree to CoopRide’s <span className="text-green">terms & conditions</span> and{" "}
                  <span className="text-green">privacy policy</span>
                </p>
              </div>
              <div
                className="bg-yellow rounded-2xl p-3 cursor-pointer"
                onClick={() => !formError.hasError && handleSignup.mutate()}
              >
                <h3 className="text-center">{handleSignup.isPending ? "Registering..." : "Continue"}</h3>
              </div>
              <div
                className="flex justify-center"
              >
                <span>Already have an account? <span className="text-center cursor-pointer"
                onClick={() => navigate('/signin')}>Sign In</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Signup;
