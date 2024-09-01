import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { useAppState } from "../context/AppContext";
import { useQuery } from "../../node_modules/@tanstack/react-query/build/legacy/useQuery";
import { getOwnerData } from "../api/dashboard.api";
import { useMutation } from "../../node_modules/@tanstack/react-query/build/legacy/useMutation";
import { updateProfile } from "@/api/auth.api";
import { showToast } from "@/utils/toast";
import { uploadMedia } from "@/api/main.api";

const Dashboard = () => {
  const { user, cacheUser } = useAppState();

  const { data } = useQuery({
    queryFn: getOwnerData,
  });

  const [fullName, setFullName] = useState(`${user.user_details.first_name} ${user.user_details.last_name}`);
  const [mail, setMail] = useState(user.user_details.email);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [country, setCountry] = useState({
    country: "Nigeria",
    countrylogo: "twemoji:flag-nigeria",
    countrycode: "+234",
  });
  const [profilePic, setProfilePic] = useState({});

  console.log(user)

  const uploadProfilePic = async () => {
    const formData = new FormData();
    formData.append("images", profilePic);
    try {
      const res = await uploadMedia(formData);
      return res.data[0].image_url;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleUpdateProfile = useMutation({
    mutationFn: async () => {
      const res = await uploadProfilePic();
      const profileData = await updateProfile(user.id, { profile_pic_url: res });
      cacheUser(profileData)
      showToast("Profile updated successfully", "success");
      setEditProfileOpen(false)
    },
    onError: () => {
      showToast("Unable to update profile, try again.");
    },
  });

  return (
    <div className="p-5 sm:p-10 w-full">
      <div className="flex w-full">
        <div className="w-96 hidden lg:flex"></div>
        <div className="w-16 lg:hidden"></div>
        <div className="w-full">
          <div className="">
            <h5 className="font-semibold text-xl">Dashboard</h5>
          </div>
          <div className="flex flex-col sm:flex-row sm:mt-10 w-full gap-10 p-5 sm:p-0">
            <div className="w-full">
              <div className="flex sm:flex-row flex-col gap-3 lg:gap-10">
                <div className="bg-white shadow-lg w-full rounded-xl">
                  <div className="flex justify-between p-5 items-center">
                    <h2>Total Earning</h2>
                    <div className="bg-green-light rounded-md flex justify-center items-center p-2">
                      <Icon icon="uit:bag" width="1.2em" height="1.2em" className="" />
                    </div>
                  </div>
                  <div className="px-5 pb-5">
                    <h1 className="text-3xl font-semibold">
                      <span className="pr-2"> N</span>
                      {data?.total_earnings}
                    </h1>
                  </div>
                </div>

                <div className="bg-white shadow-lg w-full rounded-xl">
                  <div className="flex justify-between p-5 items-center">
                    <h2>Total Vehicles</h2>
                    <div className="bg-green-light rounded-md flex justify-center items-center p-2">
                      <Icon icon="uit:bag" width="1.2em" height="1.2em" className="" />
                    </div>
                  </div>
                  <div className="px-5 pb-5">
                    <h1 className="text-5xl font-semibold">
                      <span className="pr-2"></span>
                      {data?.total_vehicles}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl w-full flex shadow-lg mt-3 p-5 flex-col">
                <h2>Company Code</h2>
                <span className="text-[#119001] pt-4 flex items-center">
                  {data?.company_code}
                  <span className="pl-2">
                    <Icon icon="fluent:copy-32-light" width="1.2em" height="1.2em" />
                  </span>
                </span>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-2xl flex sm:w-1/2 justify-content items-center flex-col p-5">
              <div className="w-full flex flex-col items-center my-auto">
                <div className="w-20 h-20 bg-red rounded-md overflow-hidden">
                  {user.profile_pic_url && <img src={user.profile_pic_url} alt="Profile picture" />}
                </div>
                <h2 className="font-bold">{fullName}</h2>
                <h3>{user.user_details.email}</h3>
                <div
                  className="bg-yellow rounded-2xl p-3 cursor-pointer w-full mt-5"
                  onClick={() => setEditProfileOpen(true)}
                >
                  <h3 className="text-center">View Profile</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {editProfileOpen && (
        <div className="fixed inset-0 z-50 w-full h-full bg-transparent flex justify-center items-center drop-shadow-md p-5">
          <div className="bg-white rounded-xl drop-shadow-md p-3 lg:p-5 pb-10 lg:w-1/3 w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-[22px] font-bold">Profile</h2>
              <div
                className="cursor-pointer bg-white rounded-full p-1 shadow-md flex items-center"
                onClick={() => setEditProfileOpen(false)}
              >
                <Icon icon="iconoir:cancel" width="1.2em" height="1.2em" />
              </div>
            </div>

            <div className="flex  flex-col gap-2 justify-center items-center p-2">
              <div
                className="overflow-hidden rounded-xl bg-blue flex flex-col justify-center items-center m-5 relative cursor-pointer bg-contain bg-no-repeat"
                style={{ backgroundImage: `${profilePic}` }}
              >
                {(profilePic.name || user.profile_pic_url) && <img src={profilePic.name ? URL.createObjectURL(profilePic) : user.profile_pic_url} alt="Profile picture" className="absolute top-0 left-0 w-20 h-20 rounded-[10px]" />}
                <input
                  type="file"
                  className="w-16 h-16 rounded-xl bg-red flex flex-col justify-end items-end opacity-0 z-50 cursor-pointer"
                  onChange={(e) => setProfilePic(e.target.files?.[0])}
                />
                <div className="bg-black rounded-full flex justify-center items-center p-1 absolute bottom-0 right-0 cursor-pointer">
                  <Icon icon="circum:edit" className="flex" width="1em" height="1em" style={{ color: "white" }} />
                </div>
              </div>

              <div className="w-full">
                <input
                  type="text"
                  value={fullName}
                  placeholder="Your full name"
                  className="w-full p-3 rounded-xl bg-transparent border border-gray text-sm"
                />
              </div>

              {/* <div className='w-full'>
          <input type="text" placeholder='Your last name' className='w-full p-3 rounded-xl bg-transparent border border-gray text-sm' />
          </div> */}

              <div className="w-full">
                <input
                  type="text"
                  value={user.user_details.email}
                  placeholder="Your email"
                  className="w-full p-3 rounded-xl bg-transparent border border-gray text-sm"
                />
              </div>

              <div
                className="relative flex items-center cursor-pointer w-full"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <Icon
                  icon={country.countrylogo}
                  width="1.6em"
                  height="1.6em"
                  className="absolute flex flex-col justify-evenly pl-3"
                  style={{ color: "#119001" }}
                />

                {/* {country.countrylogo} */}
                <input
                  type="text"
                  value={country.country}
                  placeholder="City"
                  className="w-full p-3 rounded-xl bg-transparent border border-gray pl-12 text-sm"
                />
                <Icon
                  icon={dropdownOpen ? "fe:arrow-up" : "fe:arrow-down"}
                  width="1.2em"
                  height="1.2em"
                  className="absolute flex justify-end right-2"
                  style={{ color: "#119001" }}
                />
              </div>

              <div
                className="relative flex items-center cursor-pointer w-full"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {/* <Icon icon="solar:global-linear" width="1.6em" height="1.6em"  className='absolute flex flex-col justify-evenly pl-3' style={{color: '#119001'}} /> */}
                <h2 className="absolute flex flex-col justify-evenly pl-3 pr-5">{country.countrycode}</h2>
                <input
                  type="text"
                  value={user.phone_number}
                  placeholder="Phone number"
                  className="w-full p-3 rounded-xl bg-transparent border border-gray pl-16 text-sm"
                />
                {/* <Icon icon={dropdownOpen ? "fe:arrow-up" : "fe:arrow-down"} width="1.2em" height="1.2em"  className='absolute flex justify-end right-2' style={{color: '#119001'}} /> */}
              </div>

              <div
                className="relative flex items-center cursor-pointer w-full"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {/* <Icon icon="solar:global-linear" width="1.6em" height="1.6em"  className='absolute flex flex-col justify-evenly pl-3' style={{color: '#119001'}} /> */}
                <input
                  type="text"
                  value={user.state}
                  placeholder="City"
                  className="w-full p-3 rounded-xl bg-transparent border border-gray text-sm"
                />
                <Icon
                  icon={dropdownOpen ? "fe:arrow-up" : "fe:arrow-down"}
                  width="1.2em"
                  height="1.2em"
                  className="absolute flex justify-end right-2"
                  style={{ color: "#119001" }}
                />
              </div>
            </div>

            <div className="bg-yellow rounded-2xl p-3 cursor-pointer w-full mt-5" onClick={handleUpdateProfile.mutate}>
              <h3 className="text-center">
                {handleUpdateProfile.isPending ? "updating profile..." : "Update Profile"}
              </h3>
            </div>

            {/* <div className='bg-yellow rounded-2xl p-3 cursor-pointer w-full mt-5' onClick={() => proceedWithdrawal()}>
            <h3 className='text-center text-[15px] font-medium'>Submit</h3>
          </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
