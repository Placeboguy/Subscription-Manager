const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth token
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to set auth token
export const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

// Helper function to clear auth token
export const clearAuthToken = () => {
  localStorage.removeItem('authToken');
};

// Helper function to get user info
export const getUserInfo = () => {
  const userStr = localStorage.getItem('userInfo');
  return userStr ? JSON.parse(userStr) : null;
};

// Helper function to set user info
export const setUserInfo = (user) => {
  localStorage.setItem('userInfo', JSON.stringify(user));
};

// Helper function to clear user info
export const clearUserInfo = () => {
  localStorage.removeItem('userInfo');
};

// Create headers with auth token
const getHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// ==================== AUTH ENDPOINTS ====================

export const authAPI = {
  // Register a new user
  register: async (name, email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setAuthToken(data.token);
        setUserInfo(data.user);
      }

      return data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setAuthToken(data.token);
        setUserInfo(data.user);
      }

      return data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  // Get current user
  getMe: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: getHeaders(),
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  // Update user profile
  updateProfile: async (name) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (data.success) {
        setUserInfo(data.data);
      }

      return data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  // Logout user
  logout: () => {
    clearAuthToken();
    clearUserInfo();
  },
};

// ==================== SUBSCRIPTION ENDPOINTS ====================

export const subscriptionAPI = {
  // Get all subscriptions
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/subscriptions`, {
        method: 'GET',
        headers: getHeaders(),
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: [],
      };
    }
  },

  // Get single subscription
  get: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/subscriptions/${id}`, {
        method: 'GET',
        headers: getHeaders(),
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  // Add subscription
  add: async (subscription) => {
    try {
      const response = await fetch(`${API_BASE_URL}/subscriptions`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(subscription),
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  // Update subscription
  update: async (id, subscription) => {
    try {
      const response = await fetch(`${API_BASE_URL}/subscriptions/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(subscription),
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  // Delete subscription
  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/subscriptions/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  // Get stats
  getStats: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/subscriptions/stats/overview`, {
        method: 'GET',
        headers: getHeaders(),
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: {},
      };
    }
  },

  // Get monthly chart data
  getMonthlyChartData: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/subscriptions/stats/monthly-chart`, {
        method: 'GET',
        headers: getHeaders(),
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: [],
      };
    }
  },

  // Get yearly chart data
  getYearlyChartData: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/subscriptions/stats/yearly-chart`, {
        method: 'GET',
        headers: getHeaders(),
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: [],
      };
    }
  },
};

export default {
  authAPI,
  subscriptionAPI,
};
