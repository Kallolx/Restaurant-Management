import { apiClient } from "@/services/apiClient";

// Define the API response type based on the provided JSON structure
export interface ReservationAPIResponse {
  uuid: string;
  table_number: number;
  number_of_guests: number;
  reservation_token: string;
  status: "active" | "completed" | "cancelled";
  from_time: string;
  to_time: string;
  date: string;
  guest_name: string;
  guest_phone: string;
  guest_email: string;
  guest_note: string;
  created_by: number;
  created_by_details: {
    uuid: string;
    name: string;
    email: string;
    phone: string;
    profile_picture: string | null;
    created_at: string;
    updated_at: string;
  };
  created_at: string;
  updated_at: string;
}

// Convert API response to our app's Reservation type
export const mapApiResponseToReservation = (
  apiReservation: ReservationAPIResponse
) => {
  return {
    id: apiReservation.uuid,
    date: new Date(apiReservation.date),
    time: `${apiReservation.from_time} - ${apiReservation.to_time}`,
    tableNumber: apiReservation.table_number.toString(),
    guestCount: apiReservation.number_of_guests.toString(),
    customer: {
      name: apiReservation.guest_name,
      contact: apiReservation.guest_phone,
      address: apiReservation.guest_email || "",
      specialRequest: apiReservation.guest_note || "",
    },
    status: apiReservation.status === "active" ? "pending" : "completed" as "pending" | "completed",
    token: apiReservation.reservation_token,
  };
};

// Fetch all reservations
export const fetchReservations = async () => {
  try {
    // Get the authentication token from localStorage
    const auth = localStorage.getItem("auth");
    const authData = auth ? JSON.parse(auth) : null;
    const token = authData?.tokens?.access;
    
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }
    
    // Set up headers with authentication
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    // Make the API request with proper authentication
    const { data } = await apiClient.get<ReservationAPIResponse[]>(
      "https://api.hishabx.io/api/reservations/",
      { headers }
    );
    
    // Return the mapped reservation data
    return data.map(mapApiResponseToReservation);
  } catch (error: any) {
    console.error("Error fetching reservations:", error.response?.data || error.message);
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      throw new Error("Unauthorized. Please log in again.");
    }
    
    throw error;
  }
};

// Create a new reservation
export const createReservation = async (reservationData: any) => {
  try {
    // Get the authentication token from localStorage
    const auth = localStorage.getItem("auth");
    const authData = auth ? JSON.parse(auth) : null;
    const token = authData?.tokens?.access;
    
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }
    
    // Set up headers with authentication
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    // Make the API request with proper authentication
    const { data } = await apiClient.post<ReservationAPIResponse>(
      "https://api.hishabx.io/api/reservations/", 
      reservationData,
      { headers }
    );
    
    // Return the mapped reservation data
    return mapApiResponseToReservation(data);
  } catch (error: any) {
    console.error("Error creating reservation:", error.response?.data || error.message);
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      throw new Error("Unauthorized. Please log in again.");
    } else if (error.response?.status === 400) {
      // Safely handle the error message extraction
      let errorMessage = "Invalid reservation data";
      if (error.response?.data) {
        if (error.response.data.detail) {
          errorMessage = error.response.data.detail;
        } else if (typeof error.response.data === 'object') {
          // Get the first error message from any field
          const errorValues = Object.values(error.response.data);
          if (errorValues.length > 0 && Array.isArray(errorValues[0]) && errorValues[0].length > 0) {
            errorMessage = errorValues[0][0];
          }
        }
      }
      throw new Error(errorMessage);
    }
    
    throw error;
  }
};

// Update a reservation status
export const updateReservationStatus = async (id: string, status: string) => {
  try {
    // Get the authentication token from localStorage
    const auth = localStorage.getItem("auth");
    const authData = auth ? JSON.parse(auth) : null;
    const token = authData?.tokens?.access;
    
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }
    
    // Set up headers with authentication
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    // Make the API request with proper authentication
    const { data } = await apiClient.patch<ReservationAPIResponse>(
      `https://api.hishabx.io/api/reservations/${id}/`, 
      { status },
      { headers }
    );
    
    console.log(`Reservation ${id} status updated to ${status}`, data);
    
    // Return the mapped reservation data
    return mapApiResponseToReservation(data);
  } catch (error: any) {
    console.error(`Error updating reservation ${id} status:`, error.response?.data || error.message);
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      throw new Error("Unauthorized. Please log in again.");
    } else if (error.response?.status === 404) {
      throw new Error("Reservation not found.");
    } else if (error.response?.status === 400) {
      const errorMessage = error.response.data?.detail || "Invalid status update request";
      throw new Error(errorMessage);
    }
    
    throw error;
  }
}; 