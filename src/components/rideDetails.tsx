import React from "react";
import pendlogo from "../assets/pending.svg";
import completelogo from "../assets/loctrack.svg";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { RideType } from "../types/api/mainApi.type";
import dayjs from "dayjs";

function RideDetails({ tripData }: { tripData: RideType }) {
//   console.log(tripData);

  return (
    <div>
      <div className={tripData.is_finished ? "flex flex-col" : "flex flex-col pt-2"}>
        <div className="py-3">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-md bg-blue"></div>
            <h2 className="pl-3 font-semibold text-[17.47px]">{`${tripData.driver_details.first_name} ${tripData.driver_details.last_name}`}</h2>
          </div>
        </div>
        <div>
          <div className="flex">
            <div className="">
              <div className={tripData.is_finished ? "pt-2" : "bg-[#F7F7F7] rounded-md p-2"}>
                <img
                  src={tripData.is_finished ? completelogo : pendlogo}
                  className={tripData.is_finished ? "h-24" : "h-4"}
                />
              </div>
            </div>
            {/* <Icon icon="weui:location-filled" width="1.2em" height="1.2em"  style={{color: #119001}} /> */}
            {tripData.is_finished ? (
              <div className="pl-5">
                <div className="">
                  <span className="text-[#808080] text-[9.18px]">Pickup Location</span>
                  <h3 className="text-[#15.28px] font-semibold">{tripData.pickup_location}</h3>
                </div>
                <div className="">
                  <span className="text-[#808080] text-[9.18px]">Delivery Location</span>
                  <h3 className="text-[#15.28px] font-semibold">{tripData.dropoff_location}</h3>
                </div>
              </div>
            ) : (
              <div className="pl-5">
                <h4 className="text-[12px] flex items-center">
                  <span className="flex items-center">
                    <Icon icon="weui:location-filled" width="1.2em" height="1.2em" style={{ color: "#119001" }} />
                  </span>
                  <span>Drop off</span>
                </h4>
                <span>
                  <h3 className="text-[#15.28px] font-semibold">{tripData.pickup_location}</h3>
                </span>
                <span className="text-[10px]" style={{}}>
                  <span className="text-[#17A008]">null time left mins</span> to delivery location
                </span>
              </div>
            )}
          </div>
        </div>
        <div>
          <div>
            <span className="text-[#808080] text-[9.18px]">Passenger</span>
            <h3 className="text-[#15.28px] font-semibold">
              {tripData.customer_details?.first_name} {tripData.customer_details?.last_name}
            </h3>
          </div>
          <div>
            <span className="text-[#808080] text-[9.18px]">Date/Time</span>
            <h3 className="text-[#15.28px] font-semibold">
              {dayjs(tripData.completion_date).format("YYYY-MM-DD HH:mm:ss")}
            </h3>
          </div>
          <div>
            <span className="text-[#808080] text-[9.18px]">Order ID</span>
            <h3 className="text-[#15.28px] font-semibold">{tripData.ride_code}</h3>
          </div>
          <div>
            <div className="flex justify-between pt-2">
              <span className="text-[#808080] text-[9.18px] capitalize w-full">Payment: {tripData.payment_method}</span>
              <span className="text-[#808080] text-[9.18px] w-1/2">Fee: {tripData.estimated_fee}</span>
            </div>
            {/* {tripData.paytype?.map((paymenttype) => ( */}
              <div className="flex justify-between">
                <h3 className='text-[#15.28px] font-semibold capitalize'>{tripData.payment_method}</h3>
                        {tripData.is_finished ? <h3 className='font-semibold'>₦ {tripData.payment_method == "card" ? 
                            tripData.estimated_fee : "" } {tripData.payment_method == "cash" ? 
                            tripData.estimated_fee : "" } NGN</h3>:  <h3 className='font-semibold'> ---</h3>
                                }
                                
              </div>
            {/* ))} */}
            {/* No Payment Type Property */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RideDetails;
