import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { VehicleDetails } from "../components/vehicleDetails";
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { useQuery } from "../../node_modules/@tanstack/react-query/build/legacy/useQuery";
import { addVehicle, getVehicles, uploadMedia } from "../api/main.api";
import { AddVehiclePayloadType, VehicleType } from "../types/api/mainApi.type";
import React from "react";
import { useMutation } from "../../node_modules/@tanstack/react-query/build/legacy/useMutation";
import { useAppState } from "../context/AppContext";

const Vehicles = () => {
  const { user } = useAppState();
  const { data: vehicles } = useQuery<{}, {}, VehicleType[]>({
    queryFn: getVehicles,
  });

  const [isSubmitting, setIsSubmitting] = useState(false)

  const vehicleFilesUrl: { [key: string]: string } = {
    interior: "",
    exterior: "",
    plateNumber: "",
    regDoc: "",
  };

  const [vehicleFiles, setVehicleFiles] = useState<{ [key: string]: any }>({
    interior: {
      file: {},
      attemptedUpload: false,
      error: "",
    },
    exterior: {
      file: {},
      attemptedUpload: false,
      error: "",
    },
    plateNumber: {
      file: {},
      attemptedUpload: false,
      error: "",
    },
    regDoc: {
      file: {},
      attemptedUpload: false,
      error: "",
    },
  });

  const handleVehicleFiles = (key: string, value: any) => {
    setVehicleFiles((prev) => {
      prev[key].file = value;
      return { ...prev };
    });
  };

  const [addVehicleData, setAddVehicleData] = useState<AddVehiclePayloadType>({
    model: "",
    year: "",
    color: "",
    plate_no: "",
    verification_status: "not_approved",
    interior_url: vehicleFiles.interior.url,
    exterior_url: vehicleFiles.exterior.url,
    plate_no_url: vehicleFiles.plateNumber.url,
    registration_doc_url: vehicleFiles.regDoc.url,
    is_active: false,
    vehicle_code: "",
    merchant: user.id!,
    driver: "",
  });

  const handleAddVehicleData = (key: string, value: string | boolean) => {
    setAddVehicleData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleAddVehicle = useMutation({
    mutationFn: async () => {
      setIsSubmitting(true)
      await uploadFiles();
      const payload = {
        ...addVehicleData,
        interior_url: vehicleFilesUrl.interior,
        exterior_url: vehicleFilesUrl.exterior,
        plate_no_url: vehicleFilesUrl.plateNumber,
        registration_doc_url: vehicleFilesUrl.regDoc,
      };

      return await addVehicle(payload);
    },
    onSuccess(data: any) {
      console.log(data);
      setIsSubmitting(false)
    },
    onError(error: any) {
      setIsSubmitting(false)
      console.log(error);
    },
  });

  const uploadFiles = async () => {
    const filesKey: string[] = Object.keys(vehicleFiles);

    for (const key of filesKey) {
      const formData = new FormData();
      formData.append("images", vehicleFiles[key].file);
      try {
        if (!vehicleFiles[key].attemptedUpload || vehicleFiles[key].error) {
          vehicleFiles[key].attemptedUpload = true;
          const res = await uploadMedia(formData);
          vehicleFiles[key].error = false;
          vehicleFilesUrl[key] = res.data[0].image_url;
          console.log(vehicleFilesUrl);
        }
      } catch (error: any) {
        console.log(error);
        vehicleFiles[key].error = " > " + error?.message;
      }
    }
  };

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
                    value={addVehicleData.model}
                    onChange={(e) => handleAddVehicleData("model", e.target.value)}
                    placeholder=""
                    className="w-full p-2 rounded-xl bg-transparent border border-[#E2E2E2] text-sm"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-7 my-3">
                  <div className="w-full">
                    <p className="text-[14px] font-normal pb-1">Year</p>
                    <input
                      type="text"
                      value={addVehicleData.year}
                      onChange={(e) => handleAddVehicleData("year", e.target.value)}
                      placeholder=""
                      className="w-full p-2 rounded-xl bg-transparent border border-[#E2E2E2] text-sm"
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-[14px] font-normal pb-1 w-full">License Plate</p>
                    <input
                      type="text"
                      value={addVehicleData.plate_no}
                      onChange={(e) => handleAddVehicleData("plate_no", e.target.value)}
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
                      value={addVehicleData.color}
                      onChange={(e) => handleAddVehicleData("color", e.target.value)}
                      placeholder=""
                      className="w-full p-2 rounded-xl bg-transparent border border-[#E2E2E2] text-sm"
                    />
                  </div>
                  {/* SEAT FIELD <div className="w-full">
                    <p className="text-[14px] font-normal pb-1">Seats</p>
                    <input
                      type="text"
                    value={addVehicleData.se}
                    onChange={(e) => handleAddVehicleData('', e.target.value)}
                      placeholder=""
                      className="w-full p-2 rounded-xl bg-transparent border border-[#E2E2E2] text-sm"
                    />
                  </div> */}
                </div>
                <div className="bg-[#F0F5F5] border-[#A8DADC] border-2 rounded-md cursor-pointer flex justify-center items-center mb-2 relative">
                  <input
                    type="file"
                    className="w-full h-16 z-20 opacity-0 absolute top-0 left-0 cursor-pointer"
                    onChange={(e) => handleVehicleFiles("interior", e.target.files?.[0])}
                  />
                  <div className="flex flex-col justify-center items-center z-10">
                    <div className="bg-[#A8DADC] flex rounded-full p-1">
                      <Icon
                        icon="material-symbols-light:photo-camera-outline"
                        width="1.2em"
                        height="1.2em"
                        style={{ color: "#004448" }}
                      />
                    </div>
                    <span className="text-[13px]">
                      Take Photos of the car interior{" "}
                      {vehicleFiles.interior.file.name ? `(${vehicleFiles.interior.file.name})` : ""}
                    </span>
                  </div>
                </div>

                <div className="bg-[#F0F5F5] border-[#A8DADC] border-2 rounded-md cursor-pointer flex justify-center items-center mb-2 relative">
                  <input
                    type="file"
                    className="w-full h-16 z-20 opacity-0 absolute top-0 left-0 cursor-pointer"
                    onChange={(e) => handleVehicleFiles("exterior", e.target.files?.[0])}
                  />
                  <div className="flex flex-col justify-center items-center z-10">
                    <div className="bg-[#A8DADC] flex rounded-full p-1">
                      <Icon
                        icon="material-symbols-light:photo-camera-outline"
                        width="1.2em"
                        height="1.2em"
                        style={{ color: "#004448" }}
                      />
                    </div>
                    <span className="text-[13px]">
                      Take Photos of the car exterior
                      {vehicleFiles.exterior.file.name ? `(${vehicleFiles.exterior.file.name})` : ""}
                    </span>
                  </div>
                </div>

                <div className="bg-[#F0F5F5] border-[#A8DADC] border-2 rounded-md cursor-pointer flex justify-center items-center mb-2 relative">
                  <input
                    type="file"
                    className="w-full h-16 z-20 opacity-0 absolute top-0 left-0 cursor-pointer"
                    onChange={(e) => handleVehicleFiles("plateNumber", e.target.files?.[0])}
                  />
                  <div className="flex flex-col justify-center items-center z-10">
                    <div className="bg-[#A8DADC] flex rounded-full p-1">
                      <Icon
                        icon="material-symbols-light:photo-camera-outline"
                        width="1.2em"
                        height="1.2em"
                        style={{ color: "#004448" }}
                      />
                    </div>
                    <span className="text-[13px]">
                      Take Photos of the car plate number
                      {vehicleFiles.plateNumber.file.name ? `(${vehicleFiles.plateNumber.file.name})` : ""}
                    </span>
                  </div>
                </div>

                <div className="bg-[#F0F5F5] border-[#A8DADC] border-2 rounded-md cursor-pointer flex justify-center items-center mb-2 relative">
                  <input
                    type="file"
                    className="w-full h-16 z-20 opacity-0 absolute top-0 left-0 cursor-pointer"
                    onChange={(e) => handleVehicleFiles("regDoc", e.target.files?.[0])}
                  />
                  <div className="flex flex-col justify-center items-center z-10">
                    <div className="bg-[#A8DADC] flex rounded-full p-1">
                      <Icon
                        icon="material-symbols-light:photo-camera-outline"
                        width="1.2em"
                        height="1.2em"
                        style={{ color: "#004448" }}
                      />
                    </div>
                    <span className="text-[13px]">
                      Take Photos of vehicle registration document
                      {vehicleFiles.regDoc.file.name ? `(${vehicleFiles.regDoc.file.name})` : ""}
                    </span>
                  </div>
                </div>

                <div onClick={handleAddVehicle.mutate} className="bg-yellow rounded-2xl p-3 cursor-pointer w-full mt-5">
                  <h3 className="text-center text-[15px] font-medium">
                    {handleAddVehicle.isPending ? "Submitting..." : "Submit for Review"}
                  </h3>
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
