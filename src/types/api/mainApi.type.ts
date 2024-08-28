export type DriverDetails = {
    first_name: string;
    last_name: string;
    email: string;
}

type ParcelDelivery = {
    // Define properties for ParcelDelivery
}

type Ride = {
    // Define properties for Ride
}

export type VehicleType = {
    color: string;
    date_created: string;
    date_updated: string;
    driver: string;
    driver_details: DriverDetails;
    earnings: number;
    exterior_url: string | null;
    id: number;
    interior_url: string | null;
    is_active: boolean;
    merchant: string;
    model: string;
    net_earnings: number;
    parcel_deliveries: ParcelDelivery[];
    no_of_deliveries:number;
    driver_rating: number;
    plate_no: string;
    plate_no_url: string | null;
    registration_doc_url: string | null;
    rides: RideType[];
    status: string;
    vehicle_code: string;
    verification_status: string;
    year: string;
}



interface CustomerDetails {
    first_name: string;
    last_name: string;
    email: string;
}

interface VehicleDetails {
    vehicle_code: string;
    plate_no: string;
    color: string;
}

export interface RideType {
    completion_date: string;
    customer: string;
    customer_details: CustomerDetails;
    date_created: string;
    date_updated: string;
    driver: string;
    driver_details: DriverDetails;
    dropoff_location: string;
    duration: string;
    estimated_fee: string;
    id: number;
    in_progress: boolean;
    is_cancelled: boolean;
    is_finished: boolean;
    journey_start_time: string;
    mins_away: number;
    payment_method: string;
    pickup_location: string;
    ratings: number;
    ride_accepted: boolean;
    ride_code: string;
    vehicle: number;
    vehicle_coordinates: Record<string, unknown>;
    vehicle_details: VehicleDetails;
}






export interface WithdrawalRequestType {
    amount: string;
    bank_name: string;
    account_holder: string;
    account_number: string;
    status: "not_approved";
    merchant: string; // Assuming UUID as a string
    vehicle: number;
  };
  







