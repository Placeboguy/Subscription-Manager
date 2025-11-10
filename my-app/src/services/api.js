const API_BASE_URL = 'http://localhost:5000/api';

// Create headers for API requests
const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
  };
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

export default subscriptionAPI;
