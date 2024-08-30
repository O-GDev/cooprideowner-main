import React, { useEffect, useState } from "react";
import logo from "../assets/coopridelogo.png";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppState } from "../context/AppContext";

function Sidebar() {
  const { user, logout } = useAppState();
  const [current, setCurrent] = useState();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <div>
      <div className={`flex fixed`}>
        <div
          className={`bg-white flex flex-col lg:w-80 h-screen shadow-md ${
            menuOpen ? "w-80" : "w-16"
          } transition-transform duration-100 delay-75`}
        >
          <div className="p-2">
            <div className={`text-[19px] lg:hidden ${menuOpen ? "flex" : "hidden"} justify-end`}>
              <div className="cursor-pointer bg-white rounded-full p-1 shadow-md" onClick={() => setMenuOpen(false)}>
                <Icon
                  icon="iconoir:cancel"
                  width="1em"
                  height="1em"
                  className="z-50 flex justify-center items-center"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className={`justify-center pt-12 items-center hidden lg:flex`}>
                <img src={logo} className="w-44 justify-center" />
              </div>
              <div className={`flex justify-center pt-5 items-center lg:hidden`}>
                {menuOpen ? (
                  <img src={logo} className="w-44 justify-center" />
                ) : (
                  <Icon
                    onClick={() => setMenuOpen(true)}
                    className="lg:hidden"
                    icon="material-symbols-light:menu"
                    width="1.8em"
                    height="1.8em"
                    style={{ color: "#616161" }}
                  />
                )}
              </div>
              <div className={`lg:mt-16 ${menuOpen ? "mt-16" : "my-6"}`}>
                <div className="ml-5 cursor-pointer" onClick={() => navigate("dashboard")}>
                  <div className={`${location.pathname == "/dashboard" ? "text-green" : "text-[#616161] "} flex`}>
                    <Icon
                      icon="solar:home-2-bold"
                      width="1.8em"
                      height="1.8em"
                      className={current ? "bg-[#119001]" : ""}
                    />
                    <h2 className={`text-[19px] pl-5 ${menuOpen ? "flex" : "hidden"} lg:flex`}>Dashboard</h2>
                  </div>
                </div>

                <div className="ml-5 my-8 cursor-pointer" onClick={() => navigate("vehicles")}>
                  <div className={`${location.pathname == "/vehicles" ? "text-green" : "text-[#616161] "} flex`}>
                    <Icon
                      icon="fluent:vehicle-cab-16-regular"
                      width="1.8em"
                      height="1.8em"
                      className={current ? "bg-[#119001]" : ""}
                    />
                    <h2 className={`text-[19px] pl-5 ${menuOpen ? "flex" : "hidden"} lg:flex`}>My Vehicles</h2>
                  </div>
                </div>

                <div className="ml-5 my-8 cursor-pointer" onClick={() => navigate("transactionhistory")}>
                  <div
                    className={`${location.pathname == "/transactionhistory" ? "text-green" : "text-[#616161] "} flex`}
                  >
                    <Icon
                      icon="material-symbols:history"
                      width="1.8em"
                      height="1.8em"
                      className={current ? "bg-[#119001]" : ""}
                    />
                    <h2 className={`text-[19px] pl-5 ${menuOpen ? "flex" : "hidden"} lg:flex`}>Transaction History</h2>
                  </div>
                </div>

                <div className="ml-5 my-8 cursor-pointer" onClick={() => navigate("settings")}>
                  <div className={`${location.pathname == "/settings" ? "text-green" : "text-[#616161] "} flex`}>
                    <Icon
                      icon="clarity:settings-line"
                      width="1.8em"
                      height="1.8em"
                      className={current ? "bg-[#119001]" : ""}
                    />
                    <h2 className={`text-[19px] pl-5 ${menuOpen ? "flex" : "hidden"} lg:flex`}>Settings</h2>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="relative bottom-12">
                <div className="flex justify-between w-full items-center px-4">
                  <div className={`text-[19px] pl-5 ${menuOpen ? "flex" : "hidden"} lg:flex`}>
                    <div className="text-[#616161] flex items-center">
                      <span className="w-12 h-12 rounded-full bg-[#D9D9D9]">
                        <img
                          src={user.profile_pic_url}
                          alt="profile picture"
                          style={{ maxWidth: "100%", height: "auto" }}
                        />
                      </span>
                      <h2 className="text-[19px] pl-3 text-black">{`${user.user_details.first_name} ${user.user_details.last_name}`}</h2>
                    </div>
                  </div>
                  <div onClick={logout} className="bg-red rounded-full flex">
                    <Icon
                      icon="ant-design:logout-outlined"
                      width="1.2em"
                      height="1.2em"
                      className="m-2"
                      style={{ color: "white" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="w-full">
    {(() => {
  switch () {
    case 'dashboard':
        return <Dashboard   />
        case 'myvehicles':
            return <Vehicles />
            case 'transactionhistory':
                return <TransactionHistory />
                case 'settings':
                    return <Settings />
                    default:
                        return <Dashboard   />
  }
})()}
    </div> */}
    </div>
  );
}

export default Sidebar;
