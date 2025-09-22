// Configuration for switching between Mock and Real API
export const APP_CONFIG = {
  // Change this to false when you want to use real API calls
  USE_MOCK_DATA: true,

  // API Base URL (used when USE_MOCK_DATA is false)
  API_BASE_URL: "http://localhost:3000/api",
} as const;
