import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { VehicleDetails } from "../components/vehicleDetails";
import { useState } from "react";
import Sidebar from "../components/sidebar";
import { useQuery } from "../../node_modules/@tanstack/react-query/build/legacy/useQuery";
import { getVehicles } from "../api/main.api";
import { VehicleType } from "../types/api/mainApi.type";
import React from "react";

const Vehicles = () => {
  const { data: vehicles } = useQuery<{}, {}, VehicleType[]>({
    queryFn: getVehicles,
  });

  // vehicles.map((item: VehicleType) => {console.log(item.name)})

  // console.log(vehicles)

  const [data, setData] = useState([
    {
      name: "Porsche 911 Carrera Targa - 1975",
      status: "active",
      license: "APP 858 FT",
      earning: "93.20",
      driversName: "Allan Smith",
      verifystatus: "Verified",
      totalDeliveries: "124",
      cash: "450",
      card: "450",
      bonus: "450",
      campaign: "450",
      doclicense: "approved",
      vehiclereg: "Not Approved",
      vindoc: "approved",
      year: "2006",
      color: "blue",
      vehicleId: "#22930",
      tripHistory: [
        {
          tripStatus: "completed",
          from: "32 Samwell Sq, Chevron",
          to: "21b, Karimu Kotun Street, Victoria Island",
          timeLeft: "20",
          reciepient: "Paul Pogba",
          paytype: ["card", "cash"],
          cash: "450",
          card: "450",
          orderId: "#29039",
          day: "26th July 2024",
          time: "06:09pm",
        },
        // {"tripStatus": "In Progress","from": "32 Samwell Sq, Chevron","to": "21b, Karimu Kotun Street, Victoria Island","timeLeft": "20","reciepient": "Paul Pogba"},
      ],
    },
    {
      name: "Porsche 911 Carrera Targa - 1975",
      status: "active",
      license: "APP 858 FT",
      earning: "93.20",
      driversName: "Allan Smith",
      verifystatus: "Not Verified",
      totalDeliveries: "124",
      cash: "450",
      card: "450",
      bonus: "450",
      campaign: "450",
      doclicense: "approved",
      vehiclereg: "Not Approved",
      vindoc: "approved",
      year: "2006",
      color: "blue",
      vehicleId: "#22930",
      tripHistory: [
        {
          tripStatus: "In Progress",
          from: "32 Samwell Sq, Chevron",
          to: "21b, Karimu Kotun Street, Victoria Island",
          timeLeft: "20",
          reciepient: "Paul Pogba",
          paytype: ["card", "cash"],
          cash: "450",
          card: "450",
          orderId: "#29039",
          day: "26th July 2024",
          time: "06:09pm",
        },
        // {  "tripStatus": "completed","from": "32 Samwell Sq, Chevron","to": "21b, Karimu Kotun Street, Victoria Island","timeLeft": "20","reciepient": "Paul Pogba"}
      ],
    },
  ]);

  const [addVehicleOpen, setAddVehicleOpen] = useState(false);
  return (
    <div className="w-full p-5 sm:p-0 md:pl-5 flex">
      <div className="flex w-full">
        <div className="w-96 hidden lg:flex"></div>
        <div className="w-16 lg:hidden "></div>
        <div className="flex w-full">
          {/* <Sidebar /> */}
          <div className="sm:m-10 w-full flex flex-col h-vh">
            <div className="flex justify-between w-full">
              <h5 className="font-semibold text-xl">Vehicles</h5>
              <div
                className="bg-yellow flex rounded-xl justify-center items-center p-3 cursor-pointer"
                onClick={() => setAddVehicleOpen(true)}
              >
                <Icon icon="ic:baseline-plus" width="1em" height="1em" className="" />
                <span className="text-[12px] font-semibold pl-1">Add Vehicle</span>
              </div>
            </div>

            <div className="pt-10 overflow-x-auto w-full">
              <div className="flex justify-between gap-10">
                <div className="w-full flex justify-center text-[12px] lg:text-[14px]">
                  <h2>Vehicles</h2>
                </div>
                {/* <div className="w-52 flex justify-center text-[12px] lg:text-[14px] whitespace-nowrap"><h2>Verification Status</h2></div> */}
                <div className="w-full flex justify-center text-[12px] lg:text-[14px]">
                  <h2>Status</h2>
                </div>
                <div className="w-full flex justify-start sm:justify-center text-[12px] lg:text-[14px] ">
                  <h2>License Plate</h2>
                </div>
                <div className="w-full flex justify-start sm:justify-center text-[12px] lg:text-[14px]">
                  {" "}
                  <h2>Earnings</h2>
                </div>
              </div>

              {vehicles && vehicles.length > 0 ? (
                <div className="w-full">
                  {vehicles.map((dat: VehicleType, index: number) => (
                    <VehicleDetails data={dat} key={index.toString()} />
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      {addVehicleOpen && (
        <div className="fixed inset-0 z-50 w-full h-full bg-transparent flex justify-center items-center drop-shadow-md p-10 sm:py-0">
          <div className="bg-white rounded-xl drop-shadow-md p-3 lg:p-5 pb-10 lg:w-1/3 h-full sm:h-fit flex flex-col">
            <div className="flex w-full justify-between items-center">
              <h2 className="text-[22px] font-bold">Add Vehicle</h2>
              <div
                className="cursor-pointer bg-white rounded-full p-1 shadow-md flex items-center"
                onClick={() => setAddVehicleOpen(false)}
              >
                <Icon icon="iconoir:cancel" width="1.2em" height="1.2em" />
              </div>
            </div>
            <div className=" overflow-y-auto h-fit">
              <div className="">
                <div className="mt-5">
                  <p className="text-[14px] font-normal pb-1">Car Model</p>
                  <input
                    type="text"
                    placeholder=""
                    className="w-full p-2 rounded-xl bg-transparent border border-[#E2E2E2] text-sm"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-7 my-3">
                  <div className="w-full">
                    <p className="text-[14px] font-normal pb-1">Year</p>
                    <input
                      type="text"
                      placeholder=""
                      className="w-full p-2 rounded-xl bg-transparent border border-[#E2E2E2] text-sm"
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-[14px] font-normal pb-1 w-full">License Plate</p>
                    <input
                      type="text"
                      placeholder=""
                      className="w-full p-2 rounded-xl bg-transparent border border-[#E2E2E2] text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-7 my-3 w-full">
                  <div className="w-full">
                    <p className="text-[14px] font-normal pb-1">Color</p>
                    <input
                      type="text"
                      placeholder=""
                      className="w-full p-2 rounded-xl bg-transparent border border-[#E2E2E2] text-sm"
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-[14px] font-normal pb-1">Seats</p>
                    <input
                      type="text"
                      placeholder=""
                      className="w-full p-2 rounded-xl bg-transparent border border-[#E2E2E2] text-sm"
                    />
                  </div>
                </div>
                <div className="bg-[#F0F5F5] border-[#A8DADC] border-2 rounded-md cursor-pointer flex justify-center items-center mb-2 relative">
                  <input type="file" className="w-full opacity-0 h-16" />
                  <div className="flex flex-col w-full justIfy-center items-center absolute">
                    <div className="bg-[#A8DADC] flex rounded-full p-1">
                      <Icon
                        icon="material-symbols-light:photo-camera-outline"
                        width="1.2em"
                        height="1.2em"
                        style={{ color: "#004448" }}
                      />
                    </div>
                    <span className="text-[13px]">Take Photos of the car interior</span>
                  </div>
                </div>

                <div className="bg-[#F0F5F5] border-[#A8DADC] border-2 rounded-md cursor-pointer flex justify-center items-center mb-2 relative">
                  <input type="file" className="w-full opacity-0 h-16" />
                  <div className="flex flex-col justfy-center items-center absolute">
                    <div className="bg-[#A8DADC] flex rounded-full p-1">
                      <Icon
                        icon="material-symbols-light:photo-camera-outline"
                        width="1.2em"
                        height="1.2em"
                        style={{ color: "#004448" }}
                      />
                    </div>
                    <span className="text-[13px]">Take Photos of the car exterior</span>
                  </div>
                </div>

                <div className="bg-[#F0F5F5] border-[#A8DADC] border-2 rounded-md cursor-pointer flex justify-center items-center mb-2 relative">
                  <input type="file" className="w-full opacity-0 h-16" />
                  <div className="flex flex-col justfy-center items-center absolute">
                    <div className="bg-[#A8DADC] flex rounded-full p-1">
                      <Icon
                        icon="material-symbols-light:photo-camera-outline"
                        width="1.2em"
                        height="1.2em"
                        style={{ color: "#004448" }}
                      />
                    </div>
                    <span className="text-[13px]">Take Photos of the car plate number</span>
                  </div>
                </div>

                <div className="bg-[#F0F5F5] border-[#A8DADC] border-2 rounded-md cursor-pointer flex justify-center items-center mb-2 h-fit relative">
                  <input type="file" className="w-full opacity-0 h-16" />
                  <div className="flex flex-col justfy-center items-center absolute">
                    <div className="bg-[#A8DADC] flex rounded-full p-1">
                      <Icon
                        icon="material-symbols-light:photo-camera-outline"
                        width="1.2em"
                        height="1.2em"
                        style={{ color: "#004448" }}
                      />
                    </div>
                    <span className="text-[13px]">Take Photos of vehicle registration document</span>
                  </div>
                </div>

                <div className="bg-yellow rounded-2xl p-3 cursor-pointer w-full mt-5">
                  <h3 className="text-center text-[15px] font-medium">Submit for Review</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vehicles;
