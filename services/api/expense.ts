import { apiClient } from "@/services/apiClient";

// Define the API response type based on the provided JSON structure
export interface ExpenseAPIResponse {
  uuid: string;
  category_name: string;
  category_bangla_name: string;
  note: string;
  amount: string;
  due_expense: string;
  date: string;
  description: string;
  mode: "cash" | "card" | "digital" | string;
  created_at: string;
  updated_at: string;
}

// Convert API response to our app's Expense type
export const mapApiResponseToExpense = (
  apiExpense: ExpenseAPIResponse
) => {
  return {
    id: apiExpense.uuid,
    category: apiExpense.category_name,
    categoryBangla: apiExpense.category_bangla_name,
    note: apiExpense.note,
    amount: parseFloat(apiExpense.amount),
    dueAmount: parseFloat(apiExpense.due_expense),
    date: new Date(apiExpense.date),
    description: apiExpense.description,
    paymentMode: apiExpense.mode,
    createdAt: new Date(apiExpense.created_at),
    updatedAt: new Date(apiExpense.updated_at),
  };
};

// Fetch all expenses
export const fetchExpenses = async () => {
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
    const { data } = await apiClient.get<ExpenseAPIResponse[]>(
      "https://api.hishabx.io/api/expenses/",
      { headers }
    );
    
    console.log("Expenses data fetched:", data);
    
    // Return the mapped expense data
    return data.map(mapApiResponseToExpense);
  } catch (error: any) {
    console.error("Error fetching expenses:", error.response?.data || error.message);
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      throw new Error("Unauthorized. Please log in again.");
    }
    
    throw error;
  }
};

// Create a new expense
export const createExpense = async (expenseData: any) => {
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
    
    // Format the data if needed
    const formattedData = {
      ...expenseData,
      amount: expenseData.amount.toString(),
      due_expense: (expenseData.due_expense || "0").toString()
    };
    
    console.log("Creating expense with data:", formattedData);
    
    // Make the API request with proper authentication
    const { data } = await apiClient.post<ExpenseAPIResponse>(
      "https://api.hishabx.io/api/expenses/", 
      formattedData,
      { headers }
    );
    
    // Return the mapped expense data
    return mapApiResponseToExpense(data);
  } catch (error: any) {
    console.error("Error creating expense:", error.response?.data || error.message);
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      throw new Error("Unauthorized. Please log in again.");
    } else if (error.response?.status === 400) {
      // Safely handle the error message extraction
      let errorMessage = "Invalid expense data";
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

// Update an expense
export const updateExpense = async (id: string, expenseData: any) => {
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
    
    // Format the data if needed
    const formattedData = {
      ...expenseData,
      amount: expenseData.amount.toString(),
      due_expense: (expenseData.due_expense || "0").toString()
    };
    
    // Make the API request with proper authentication
    const { data } = await apiClient.patch<ExpenseAPIResponse>(
      `https://api.hishabx.io/api/expenses/${id}/`, 
      formattedData,
      { headers }
    );
    
    console.log(`Expense ${id} updated:`, data);
    
    // Return the mapped expense data
    return mapApiResponseToExpense(data);
  } catch (error: any) {
    console.error(`Error updating expense ${id}:`, error.response?.data || error.message);
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      throw new Error("Unauthorized. Please log in again.");
    } else if (error.response?.status === 404) {
      throw new Error("Expense not found.");
    } else if (error.response?.status === 400) {
      const errorMessage = error.response.data?.detail || "Invalid update request";
      throw new Error(errorMessage);
    }
    
    throw error;
  }
};

// Delete an expense
export const deleteExpense = async (id: string) => {
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
    await apiClient.delete(
      `https://api.hishabx.io/api/expenses/${id}/`,
      { headers }
    );
    
    console.log(`Expense ${id} deleted successfully`);
    
    return true;
  } catch (error: any) {
    console.error(`Error deleting expense ${id}:`, error.response?.data || error.message);
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      throw new Error("Unauthorized. Please log in again.");
    } else if (error.response?.status === 404) {
      throw new Error("Expense not found.");
    }
    
    throw error;
  }
}; 