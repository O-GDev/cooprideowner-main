import React, { useEffect, useState } from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import pendlogo from "../assets/pending.svg";
import completelogo from "../assets/loctrack.svg";
import RideDetails from "./rideDetails";
import pend from "../assets/pend.svg";
import chart from "../assets/chart.svg";
import { useNavigate } from "react-router-dom";
import { RideType, VehicleEarningsType, VehicleType, WithdrawalRequestType } from "../types/api/mainApi.type";
import { useQuery } from "../../node_modules/@tanstack/react-query/build/legacy/useQuery";
import { getVehicleEarningsByDate, makeWithdrawRequest } from "../api/main.api";
import { useMutation } from "../../node_modules/@tanstack/react-query/build/legacy/useMutation";
import { verifyPassword } from "../api/auth.api";

export const VehicleDetails = ({ data }: { data: VehicleType }) => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [earnDetails, setEarnDetails] = useState(false);
  const [uploadDoc, setUploadDoc] = useState(false);
  const [doctype, setDoctype] = useState("");
  const [docOpen, setDocOpen] = useState(false);
  const [tripDetails, setTripDetails] = useState({});
  const [id, setId] = useState("");
  const [pwithdrawOpen, setPwithdrawOpen] = useState(false);
  const [withdrawAuth, setWithdrawAuth] = useState(false);
  const [withdrawPending, setWithdrawPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [eOpen, setEOpen] = useState(false);
  const [setCurrentUrl, currentUrl] = useState("");
  const [withdrawInfo, setWithdrawInfo] = useState<WithdrawalRequestType>({
    amount: "",
    bank_name: "",
    account_holder: "",
    account_number: "",
    status: "not_approved",
    merchant: data.merchant,
    vehicle: data.id,
  });

  //   console.log(data.rides);

  // const proceedWithdrawal = () =>{
  //     setWithdrawOpen(false)
  //     setPwithdrawOpen(true)
  // }

  const handleWithDrawInfo = (key: string, value: string | number) => {
    setWithdrawInfo((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const hanldeWithdraw = useMutation({
    mutationFn: () => makeWithdrawRequest(withdrawInfo),
    onSuccess(data: any) {
      pendingWithdraw();
    },
  });

  const hanldeVerifyPassword = useMutation({
    mutationFn: () => verifyPassword({ password }),
    onSuccess(data: any) {
      console.log(data);
      hanldeWithdraw.mutate();
    },
  });

  console.log(data.status, "  ... ");

  const { data: vehicleEarnings } = useQuery<{}, {}, VehicleEarningsType>({
    queryKey: ["vehice_earnings"],
    queryFn: () => getVehicleEarningsByDate({ vehicle_code: data.vehicle_code, date: new Date().toISOString() }),
  });

  console.log(data);

  const requestWithdrawal = () => {
    setPwithdrawOpen(false);
    setWithdrawAuth(true);
  };

  const pendingWithdraw = () => {
    setWithdrawAuth(false);
    setWithdrawPending(true);
  };
  const withdrawComplete = () => {
    setWithdrawPending(false);
  };

  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="w-full">
        <div className=" w-full">
          <div
            className="bg-white rounded-2xl w-full shadow-sm my-7 px-2 py-16 pr-4"
            style={{ paddingTop: 10, paddingBottom: 10 }}
          >
            <div className="flex justify-between cursor-pointer w-full" onClick={() => setOpen(!open)}>
              <div className="w-full flex justify-center items-center text-[12px] lg:text-[14px] ">
                <h4>{data.model}</h4>
              </div>
              {/* <div className='w-50 flex justify-center items-center text-[12px] lg:text-[14px] whitespace-nowrap'><h4>{data.verifystatus}</h4></div> */}
              <div className="w-full text-[12px] lg:text-[14px] flex  justify-center items-center whitespace-nowrap">
                <h4 className="uppercase border border-green text-green rounded-full p-1 sm:p-2 flex-col flex">
                  {data.status}
                </h4>
              </div>
              <div className=" w-full flex justify-center items-center text-[12px] lg:text-[14px] whitespace-nowrap">
                <h4>{data.plate_no}</h4>
              </div>
              <div className=" w-full flex justify-between items-center text-[12px] lg:text-[14px] ">
                <h4 className="text-green font-bold">₦{data.earnings}</h4>
                <Icon
                  icon={open ? "fe:arrow-up" : "fe:arrow-down"}
                  width="1.2em"
                  height="1.2em"
                  className=""
                  style={{ color: "#119001" }}
                />
              </div>
            </div>
            {open &&
              data.status ===
                "ACTIVE" && (
                  <div>
                    <div className="mt-4 flex w-full gap-5 sm:flex-row flex-col">
                      <div className="w-full">
                        <div className="bg-[#F9F9F9] p-3 border border-[#E2E2E2] rounded-md pb-16">
                          <span className="text-[#7A7A7A] text-[12px]">Model</span>
                          <h2 className="text-[14px]">{data.model}</h2>
                          <div className="py-3">
                            <div className="w-full bg-[#DADADA] h-[0.6px]"></div>
                          </div>

                          <span className="text-[#7A7A7A] text-[12px]">Year</span>
                          <h2 className="text-[14px]">{data.year}</h2>
                          <div className="py-3">
                            <div className="w-full bg-[#DADADA] h-[0.6px]"></div>
                          </div>

                          <span className="text-[#7A7A7A] text-[12px]">License Plate</span>
                          <h2 className="text-[14px]">{data.plate_no}</h2>
                          <div className="py-3">
                            <div className="w-full bg-[#DADADA] h-[0.6px]"></div>
                          </div>

                          <span className="text-[#7A7A7A] text-[12px]">Color</span>
                          <h2 className="text-[14px]">{data.color}</h2>
                        </div>
                        <div className="bg-[#F9F9F9] p-3 border border-[#E2E2E2] rounded-md mt-2 flex">
                          <div className="flex flex-col mr-10">
                            <span className="text-[#7A7A7A] text-[12px]">Vehicle Id</span>
                            <span>{data.vehicle_code}</span>
                          </div>
                          <div>
                            <div className="bg-[#D8D8D8] h-16 w-[0.5px]"></div>
                          </div>
                          <div className="am:ml-10 ml-2 flex">
                            <div className="sm:h-16 sm:w-16 h-10 w-10 rounded-full bg-black flex"></div>
                            <div className="pl-2">
                              <h2 className="sm:text-xl ">{`${data.driver_details.first_name} ${data.driver_details.last_name}`}</h2>
                              <span className="text-[#4F4F4F] text-[12px]">
                                {data.no_of_deliveries} <span className="pl-1">Deliveries</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="sm:w-1/2 h-full">
                        <div className="bg-green rounded-lg text-white p-3 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between pb-4">
                              <h4> Net Earnings</h4>
                              <span className="font-semibold flex items-center ">
                                N<span className="pr-1">{data.net_earnings}</span>
                                <Icon
                                  icon={open ? "fe:arrow-up" : "fe:arrow-down"}
                                  width="1em"
                                  height="1em"
                                  className=""
                                  style={{ color: "white" }}
                                />
                              </span>
                            </div>
                            <div></div>
                          </div>

                          <div
                            className="p-3 rounded-xl flex items-center justify-center mt-4 cursor-pointer shadow border-[0.2px]"
                            style={{ backgroundColor: "rgba(255, 255, 255,0.2)" }}
                            onClick={() => setEarnDetails(true)}
                          >
                            {/* <Icon icon="emojione-monotone:up-arrow" width="1.2em" height="1.2em"  style={{color: '#119001'}} /> */}
                            <span className="text-white text-center pl-2">See Details</span>
                          </div>

                          <div
                            className="bg-white p-3 rounded-xl flex items-center justify-center mt-3 cursor-pointer shadow"
                            onClick={() => setPwithdrawOpen(true)}
                          >
                            <Icon
                              icon="emojione-monotone:up-arrow"
                              width="1.2em"
                              height="1.2em"
                              style={{ color: "#119001" }}
                            />
                            <span className="text-green text-center pl-2">Withdraw</span>
                          </div>
                        </div>
                        <div className="border border-[#E2E2E2] rounded-md my-3 p-4">
                          <h4 className="font-semibold">Documents</h4>
                          <div>
                            <div className="flex justify-between mt-3">
                              <h5 className="text-[15px] font-normal">Car License</h5>
                              <h5 className="capitalize text-[13px] text-green font-medium">
                                {data.verification_status ? "Approved" : "pending"}
                              </h5>
                            </div>
                            <div className="flex justify-between mt-3">
                              <h5 className="text-[15px] font-normal">Vehicle Registration</h5>
                              <h5 className="capitalize text-[13px] text-green font-medium">
                                {data.verification_status ? "Approved" : "pending"}
                              </h5>
                            </div>
                            <div className="flex justify-between mt-3">
                              <h5 className="text-[15px] font-normal">VIN document</h5>
                              <h5 className="capitalize text-[13px] text-green font-medium">
                                {data.verification_status ? "Approved" : "pending"}
                              </h5>
                            </div>
                            {/* <div className='cursor-pointer pt-4' onClick={() =>setUploadDoc(true)}>
                        <h5 className='text-green'>upload documents</h5>
                    </div> */}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between pb-2">
                        <h4>Recent Rides</h4>
                        <span className="text-green">see all</span>
                      </div>
                      {data.rides ? (
                        data.rides.slice(0, 8).map((tripData: RideType, index) => (
                          <div key={index.toString()}>
                            <div
                              className="flex justify-between mt-6 cursor-pointer"
                              onClick={() => {
                                setTripDetails(tripData);
                                setId(index);
                              }}
                            >
                              <div>
                                <h1>{tripData.ride_code}</h1>
                                <h4 className="text-[12px]">
                                  Recipient:{" "}
                                  {`${tripData.customer_details.first_name} ${tripData.customer_details.last_name}`}
                                </h4>
                                <div className={tripData.is_finished ? "flex" : "flex pt-2"}>
                                  <div className="">
                                    <div className={tripData.is_finished ? "pt-2" : "bg-[#F7F7F7] rounded-md p-2"}>
                                      <img
                                        src={tripData.is_finished ? completelogo : pendlogo}
                                        className={tripData.is_finished ? "h-24" : "h-4"}
                                      />
                                    </div>
                                  </div>
                                  {/* <Icon icon="weui:location-filled" width="1.2em" height="1.2em"  style={{color: #119001}} /> */}
                                  {tripData.is_cancelled || tripData.is_finished ? (
                                    <div className="pl-5">
                                      <div className="">
                                        <span className="text-[#808080] text-[9.18px]">Pickup Location</span>
                                        <h3 className="sm:text-[#11.69px] text-[10.69px]">
                                          {tripData.pickup_location}
                                        </h3>
                                      </div>
                                      <div className="">
                                        <span className="text-[#808080] text-[9.18px]">Delivery Location</span>
                                        <h3 className="sm:text-[#11.69px] text-[10.69px]">
                                          {tripData.dropoff_location}
                                        </h3>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="pl-5 w-full">
                                      <h4 className="text-[12px] flex items-center">
                                        <span className="flex items-center">
                                          <Icon
                                            icon="weui:location-filled"
                                            width="1.2em"
                                            height="1.2em"
                                            style={{ color: "#119001" }}
                                          />
                                        </span>
                                        <span>Pickup Location</span>
                                      </h4>
                                      <span>
                                        <h3 className="sm:text-[#11.69px] text-[10.69px]">
                                          {tripData.pickup_location}
                                        </h3>
                                      </span>
                                      <span className="text-[10px]" style={{}}>
                                        <span className="text-[#17A008]">{tripData.mins_away} mins</span> to delivery
                                        location
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              {tripData.is_finished ? (
                                <div className="w-3/12 flex justify-end items-start">
                                  <span className="bg-[#27794D] text-white p-1 text-[10px]">Completed</span>
                                </div>
                              ) : (
                                <div className="w-3/12 flex justify-end items-start">
                                  <span className="bg-[#FFF4C7] text-[#7E6604] p-1 text-[10px]">In progress</span>
                                </div>
                              )}
                            </div>
                            {tripDetails.id && (
                              <div className="fixed inset-0 z-50 w-full h-full bg-transparent flex justify-center items-center drop-shadow-md">
                                <div className="bg-white rounded-xl drop-shadow-md p-3 lg:p-5 pb-10 lg:w-3/12">
                                  <div className="flex justify-between items-center pb-4">
                                    <h2 className="text-[22px] font-bold">Ride Details</h2>
                                    <div
                                      className="cursor-pointer bg-white rounded-full p-1 shadow-md flex items-center"
                                      onClick={() => setTripDetails({})}
                                    >
                                      <Icon icon="iconoir:cancel" width="1.2em" height="1.2em" />
                                    </div>
                                  </div>
                                  <RideDetails tripData={tripData} key={index} id={id} {...data} />
                                </div>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="flex justify-center"> No History</div>
                      )}
                    </div>
                  </div>
                )}
          </div>
        </div>
      </div>

      {earnDetails && (
        <div className="fixed inset-0 z-50 w-full h-full bg-transparent flex justify-center items-center drop-shadow-md py-10 px-5 sm:px-0">
          <div className="bg-white rounded-xl drop-shadow-md p-3 lg:p-5 pb-10 lg:w-1/3 h-fit">
            <div className="flex justify-between items-center">
              <h2 className="text-[15.75px] font-normal flex items-center justify-center">
                <span className="flex justify-center cursor-pointer">
                  <Icon
                    icon="material-symbols:arrow-back-ios-rounded"
                    width="1em"
                    height="1em"
                    style={{ color: "black" }}
                  />
                </span>
                <span>Today's Earnings</span>
              </h2>
              <div
                className="cursor-pointer bg-white rounded-full p-1 shadow-md flex items-center"
                onClick={() => setEarnDetails(false)}
              >
                <Icon icon="iconoir:cancel" width="1.2em" height="1.2em" />
              </div>
            </div>
            <div className="w-full pt-5 flex flex-col justify-center items-center overflow-y-auto">
              <img src={chart} />
              <div className="flex gap-5 p-5">
                <div className="bg-[#F3F7F5] rounded-lg h-18 w-24">
                  <div className="flex items-start flex-col p-2">
                    <span className="bg-green flex items-center justify-center rounded-full p-2">
                      <Icon icon="ic:baseline-access-time" width="1.2em" height="1.2em" style={{ color: "white" }} />
                    </span>
                    <div className="py-3">
                      <h2 className="text-[12px] font-medium">Time</h2>
                      <span className="text-[9px]">{vehicleEarnings.total_time}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F3F7F5] rounded-lg h-18 w-24">
                  <div className="flex items-start flex-col p-2">
                    <span className="bg-green flex items-center justify-center rounded-full p-2">
                      <Icon icon="hugeicons:safe-delivery-01" width="1.2em" height="1.2em" style={{ color: "white" }} />
                    </span>
                    <div className="py-3">
                      <h2 className="text-[12px] font-medium">Deliveries</h2>
                      <span className="text-[9px]">38</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full bg-[#DADADA] h-[0.6px]"></div>

              <div className="w-full">
                <div className="w-full">
                  <div className="pb-4">
                    <div className="flex justify-between w-full pt-3 cursor-pointer" onClick={() => setEOpen(!eOpen)}>
                      <h4> Earnings</h4>
                      <span className="font-semibold flex items-center ">
                        ₦<span className="pr-1">{data.net_earnings}</span>
                        <Icon
                          icon={eOpen ? "fe:arrow-up" : "fe:arrow-down"}
                          width="1em"
                          height="1em"
                          className=""
                          style={{ color: "black" }}
                        />
                      </span>
                    </div>
                    {eOpen && (
                      <div className="flex">
                        <div className="w-[0.5px] bg-[#DDDDDD]"></div>
                        <div className="w-full pl-4 pt-2">
                          <div className="flex justify-between">
                            <h3>Cash Payment</h3>
                            <h3>₦ 450</h3>
                          </div>
                          <div className="flex justify-between">
                            <h3>Card Payment</h3>
                            <h3>₦ 450</h3>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div></div>
                </div>
              </div>

              <div className="w-full">
                <div className="w-full">
                  <div className="flex justify-between pb-4 w-full">
                    <h4>Commission</h4>
                    <span className="font-semibold flex items-center ">
                      ₦<span className="pr-1">{vehicleEarnings.commissions}</span>
                      <Icon icon={"fe:arrow-down"} width="1em" height="1em" className="" style={{ color: "black" }} />
                    </span>
                  </div>
                  <div></div>
                </div>
              </div>

              <div className="w-full">
                <div className="w-full">
                  <div className="flex justify-between pb-4 w-full">
                    <h4>Net Earnings</h4>
                    <span className="font-semibold flex items-center ">
                      ₦<span className="pr-1">{vehicleEarnings.net_earnings}</span>
                      {/* <Icon icon={open ? "fe:arrow-up" : "fe:arrow-down"} width="1em" height="1em"  className='' style={{color: 'black'}} /> */}
                    </span>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>

            {/* <div className='bg-yellow rounded-2xl p-3 cursor-pointer w-full mt-5' onClick={() => proceedWithdrawal()}>
            <h3 className='text-center text-[15px] font-medium'>Proceed to withdrawal</h3>
          </div> */}
          </div>
        </div>
      )}

      {pwithdrawOpen && (
        <div className="fixed inset-0 z-50 w-full h-full bg-transparent flex justify-center items-center drop-shadow-md">
          <div className="bg-white rounded-xl drop-shadow-md p-3 lg:p-5 pb-10 lg:w-1/3">
            <div className="flex justify-between items-center pb-3">
              <h2 className="text-[22px] font-bold">Withdraw</h2>
              <div
                className="cursor-pointer bg-white rounded-full p-1 shadow-md flex items-center"
                onClick={() => setPwithdrawOpen(false)}
              >
                <Icon icon="iconoir:cancel" width="1.2em" height="1.2em" />
              </div>
            </div>

            <div>
              <div className="pt-2">
                <p className="text-[14px] font-normal pb-1">Amount to withdraw</p>
                <div className="relative flex items-center">
                  <span className="absolute flex flex-col justify-evenly pl-3 text-[22px] text-[#110000] opacity-60">
                    ₦
                  </span>
                  <input
                    type="text"
                    value={withdrawInfo.amount}
                    onChange={(e) => handleWithDrawInfo("amount", e.target.value)}
                    placeholder="0.00"
                    className="w-full p-3 rounded-xl bg-transparent border border-[#E2E2E2] pl-8 text-[22px]"
                  />
                </div>
              </div>
              <div className="pt-2">
                <p className="text-[14px] font-normal pb-1">Bank Name</p>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={withdrawInfo.bank_name}
                    onChange={(e) => handleWithDrawInfo("bank_name", e.target.value)}
                    placeholder="e.g: Access Bank"
                    className="w-full p-3 rounded-xl bg-transparent border border-[#E2E2E2] text-[14px]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <p className="text-[14px] font-normal pb-1">Account Holder</p>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={withdrawInfo.account_holder}
                    onChange={(e) => handleWithDrawInfo("account_holder", e.target.value)}
                    placeholder="e.g: John Doe"
                    className="w-full p-3 rounded-xl bg-transparent border border-[#E2E2E2] text-[14px]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <p className="text-[14px] font-normal pb-1">Account Number</p>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={withdrawInfo.account_number}
                    onChange={(e) => handleWithDrawInfo("account_number", e.target.value)}
                    placeholder="000-000-000"
                    className="w-full p-3 rounded-xl bg-transparent border border-[#E2E2E2] text-[14px]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-yellow rounded-2xl p-3 cursor-pointer w-full mt-5" onClick={() => requestWithdrawal()}>
              <h3 className="text-center text-[15px] font-medium">Continue</h3>
            </div>
          </div>
        </div>
      )}

      {withdrawAuth && (
        <div className="fixed inset-0 z-50 w-full h-full bg-transparent flex justify-center items-center drop-shadow-md p-10">
          <div className="bg-white rounded-xl drop-shadow-md p-3 lg:p-5 pb-10 lg:w-1/3 w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-[22px] font-bold">Withdrawal Authorization</h2>
              <div
                className="cursor-pointer bg-white rounded-full p-1 shadow-md flex items-center"
                onClick={() => setWithdrawAuth(false)}
              >
                <Icon icon="iconoir:cancel" width="1.2em" height="1.2em" />
              </div>
            </div>

            <div>
              <div>
                <p className="text-[#7A7A7A] text-[15px] py-3">
                  You are about to request withdrawal for ₦100, please enter your password to continue
                </p>
              </div>
              <div className="relative flex items-center">
                <Icon
                  icon="prime:lock"
                  width="1.6em"
                  height="1.6em"
                  className="absolute flex flex-col justify-evenly pl-3 opacity-60"
                  style={{ color: "#110000" }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <div className="bg-yellow rounded-2xl p-3 cursor-pointer w-full mt-5" onClick={hanldeVerifyPassword.mutate}>
              <h3 className="text-center text-[15px] font-medium">Request Withdrawal</h3>
            </div>
          </div>
        </div>
      )}

      {withdrawPending && (
        <div className="fixed inset-0 z-50 w-full h-full bg-transparent flex justify-center items-center drop-shadow-md p-10">
          <div className="bg-white rounded-xl drop-shadow-md p-3 lg:p-5 pb-10 lg:w-1/3 w-full flex flex-col justify-center items-center">
            <div className="pt-3 flex flex-col justify-center items-center">
              <img src={pend} width="157.67px" height="157.67px" />
              <div>
                <h3 className="text-[25px] font-bold py-2">Withdrawal Pending</h3>
                <p></p>
              </div>
            </div>
            <div
              className="bg-yellow rounded-2xl p-3 cursor-pointer w-full mt-5"
              onClick={() => navigate("/transactionhistory")}
            >
              <h3 className="text-center text-[15px] font-medium">View Transaction History</h3>
            </div>
          </div>
        </div>
      )}

      {uploadDoc && (
        <div className="fixed inset-0 z-50 w-full h-full bg-transparent flex justify-center items-center drop-shadow-md">
          <div className="bg-white rounded-xl drop-shadow-md p-3">
            <div className="flex justify-between items-center">
              <h2 className="text-[22px] font-bold">Upload Document</h2>
              <div
                className="cursor-pointer bg-white rounded-full p-1 shadow-md flex items-center"
                onClick={() => setUploadDoc(false)}
              >
                <Icon icon="iconoir:cancel" width="1.2em" height="1.2em" />
              </div>
            </div>

            <div className="bg-[#F0F5F5] border-[#A8DADC] border-2 rounded-md cursor-pointer flex justify-center items-center my-3 mt-5">
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
                <span className="text-[13px]">Take Photos of your documents</span>
              </div>
            </div>

            <div className="relative flex items-center cursor-pointer" onClick={() => setDocOpen(!docOpen)}>
              <input
                type="text"
                value={doctype}
                placeholder="Select Document Type"
                className="w-full p-3 rounded-xl bg-[#F5F5F5] border border-[#E2E2E2] text-sm"
              />
              <Icon
                icon={docOpen ? "fe:arrow-up" : "fe:arrow-down"}
                width="1.2em"
                height="1.2em"
                className="absolute flex justify-end right-2"
                style={{ color: "#119001" }}
              />
            </div>

            <div className="bg-yellow rounded-2xl p-3 cursor-pointer w-full mt-5">
              <h3 className="text-center text-[15px]">Submit for review</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
