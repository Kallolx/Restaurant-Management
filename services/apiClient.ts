import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.hishabx.io/api";

// Maximum number of retries for 401 errors
const MAX_RETRIES = 3;

// Define public endpoints that don't need authorization
const PUBLIC_ENDPOINTS = [
  "/login/",
  "/register/",
  /^\/restaurants\/[^/]+\/menu\/?/,
];

// Check if the request URL is a public endpoint
const isPublicEndpoint = (url: string | undefined): boolean => {
  if (!url) return false;
  return PUBLIC_ENDPOINTS.some((pattern) => {
    if (pattern instanceof RegExp) {
      return pattern.test(url);
    }
    return url.includes(pattern);
  });
};

// Extend AxiosRequestConfig to include skipAuth
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log({ config });
    // Skip adding auth header for public endpoints or if skipAuth is true
    if (!isPublicEndpoint(config.url)) {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// // Response interceptor
// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as CustomAxiosRequestConfig & {
//       retryCount?: number;
//     };

//     // Skip refresh token logic for public endpoints or requests with skipAuth
//     if (isPublicEndpoint(originalRequest.url) || originalRequest.skipAuth) {
//       return Promise.reject(error);
//     }

//     // If error is 401 and we haven't exceeded max retries
//     if (error.response?.status === 401) {
//       // Initialize or increment retry count
//       originalRequest.retryCount = (originalRequest.retryCount || 0) + 1;

//       if (originalRequest.retryCount > MAX_RETRIES) {
//         localStorage.removeItem("auth");
//         localStorage.removeItem("access_token");
//         localStorage.removeItem("refresh_token");
//         window.location.href = "/login";
//         return Promise.reject(new Error("Max retry attempts exceeded"));
//       }

//       try {
//         const refreshToken = localStorage.getItem("refresh_token");
//         if (!refreshToken) {
//           throw new Error("No refresh token available");
//         }

//         // Attempt to refresh the token
//         const response = await axios.post<RefreshTokenResponse>(
//           `${BASE_URL}/refresh/`,
//           {
//             refresh: JSON.parse(refreshToken),
//           }
//         );

//         // Store new tokens
//         const { access, refresh } = response.data;
//         localStorage.setItem("access_token", JSON.stringify(access));
//         localStorage.setItem("refresh_token", JSON.stringify(refresh));

//         // Update auth data with new tokens
//         const authData = localStorage.getItem("auth");
//         if (authData) {
//           const parsedAuthData = JSON.parse(authData);
//           parsedAuthData.tokens = response.data;
//           localStorage.setItem("auth", JSON.stringify(parsedAuthData));
//         }

//         // Retry the original request with new token
//         originalRequest.headers.set("Authorization", `Bearer ${access}`);

//         return apiClient(originalRequest);
//       } catch (refreshError) {
//         localStorage.removeItem("auth");
//         localStorage.removeItem("access_token");
//         localStorage.removeItem("refresh_token");
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );
