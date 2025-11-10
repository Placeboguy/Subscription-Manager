import Subscription from '../models/Subscription.js';

// Default userId for public access (no authentication)
const DEFAULT_USER_ID = '507f1f77bcf86cd799439011';

// Helper to get userId from request or use default
const getUserId = (req) => {
  return req.user?.id || DEFAULT_USER_ID;
};

// @desc    Get all subscriptions for logged in user
// @route   GET /api/subscriptions
// @access  Public
export const getSubscriptions = async (req, res) => {
  try {
    const userId = getUserId(req);
    const subscriptions = await Subscription.find({ userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: subscriptions.length,
      data: subscriptions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single subscription
// @route   GET /api/subscriptions/:id
// @access  Public
export const getSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found',
      });
    }

    const userId = getUserId(req);
    // Check if user owns this subscription
    if (subscription.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this subscription',
      });
    }

    res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Add subscription
// @route   POST /api/subscriptions
// @access  Public
export const addSubscription = async (req, res) => {
  try {
    const { name, category, price, frequency, description } = req.body;

    // Validate input
    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name and price',
      });
    }

    const userId = getUserId(req);
    const subscription = await Subscription.create({
      userId,
      name,
      category,
      price,
      frequency,
      description,
    });

    res.status(201).json({
      success: true,
      message: 'Subscription added successfully',
      data: subscription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update subscription
// @route   PUT /api/subscriptions/:id
// @access  Public
export const updateSubscription = async (req, res) => {
  try {
    let subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found',
      });
    }

    const userId = getUserId(req);
    // Check if user owns this subscription
    if (subscription.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this subscription',
      });
    }

    subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Subscription updated successfully',
      data: subscription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete subscription
// @route   DELETE /api/subscriptions/:id
// @access  Public
export const deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found',
      });
    }

    const userId = getUserId(req);
    // Check if user owns this subscription
    if (subscription.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this subscription',
      });
    }

    await Subscription.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Subscription deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get subscription stats for logged in user
// @route   GET /api/subscriptions/stats/overview
// @access  Public
export const getStats = async (req, res) => {
  try {
    const userId = getUserId(req);
    const subscriptions = await Subscription.find({ userId });

    const activeSubscriptions = subscriptions.filter((sub) => sub.status === 'active').length;
    const monthlyTotal = subscriptions
      .filter((sub) => sub.status === 'active' && sub.frequency === 'monthly')
      .reduce((sum, sub) => sum + sub.price, 0);

    const yearlyTotal = subscriptions
      .filter((sub) => sub.status === 'active' && sub.frequency === 'yearly')
      .reduce((sum, sub) => sum + sub.price, 0);

    res.status(200).json({
      success: true,
      data: {
        totalActive: activeSubscriptions,
        monthlySpending: monthlyTotal,
        yearlySpending: yearlyTotal,
        totalSubscriptions: subscriptions.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get monthly spending chart data for logged in user
// @route   GET /api/subscriptions/stats/monthly-chart
// @access  Public
export const getMonthlyChartData = async (req, res) => {
  try {
    const userId = getUserId(req);
    const subscriptions = await Subscription.find({ userId });

    // Get current date
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    // Create array for current month and next 5 months (6 months forward)
    const monthsData = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Start from current month (not previous months)
    for (let i = 0; i < 6; i++) {
      const date = new Date(currentYear, currentMonth + i, 1);
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();

      // Calculate spending for this month
      let spending = 0;

      subscriptions.forEach((sub) => {
        if (sub.status === 'active') {
          if (sub.frequency === 'monthly') {
            // Monthly subscriptions always count
            spending += sub.price;
          } else if (sub.frequency === 'yearly') {
            // Yearly subscriptions - only count if created before or during this month
            const subCreatedDate = new Date(sub.createdAt);
            if (
              subCreatedDate.getFullYear() < year ||
              (subCreatedDate.getFullYear() === year && subCreatedDate.getMonth() <= date.getMonth())
            ) {
              spending += sub.price / 12; // Spread yearly cost across months
            }
          }
        }
      });

      monthsData.push({
        name: month,
        spending: parseFloat(spending.toFixed(2)),
      });
    }

    res.status(200).json({
      success: true,
      data: monthsData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get yearly spending chart data for logged in user
// @route   GET /api/subscriptions/stats/yearly-chart
// @access  Public
export const getYearlyChartData = async (req, res) => {
  try {
    const userId = getUserId(req);
    const subscriptions = await Subscription.find({ userId });

    // Get current date
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    // Create array for last 12 months
    const yearsData = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let i = 11; i >= 0; i--) {
      const date = new Date(currentYear, currentMonth - i, 1);
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();

      // Calculate spending for this month
      let spending = 0;

      subscriptions.forEach((sub) => {
        if (sub.status === 'active') {
          if (sub.frequency === 'yearly') {
            // Yearly subscriptions - only count if created before or during this month
            const subCreatedDate = new Date(sub.createdAt);
            if (
              subCreatedDate.getFullYear() < year ||
              (subCreatedDate.getFullYear() === year && subCreatedDate.getMonth() <= date.getMonth())
            ) {
              spending += sub.price;
            }
          } else if (sub.frequency === 'monthly') {
            // Monthly subscriptions - multiply by 12 to show annual impact
            const subCreatedDate = new Date(sub.createdAt);
            if (
              subCreatedDate.getFullYear() < year ||
              (subCreatedDate.getFullYear() === year && subCreatedDate.getMonth() <= date.getMonth())
            ) {
              spending += sub.price * 12;
            }
          }
        }
      });

      yearsData.push({
        name: month,
        spending: parseFloat(spending.toFixed(2)),
      });
    }

    res.status(200).json({
      success: true,
      data: yearsData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
