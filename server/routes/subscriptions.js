import express from 'express';
import {
  getSubscriptions,
  getSubscription,
  addSubscription,
  updateSubscription,
  deleteSubscription,
  getStats,
  getMonthlyChartData,
  getYearlyChartData,
} from '../controllers/subscriptionController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All subscription routes require authentication
router.use(protect);

router.get('/', getSubscriptions);
router.post('/', addSubscription);
router.get('/stats/overview', getStats);
router.get('/stats/monthly-chart', getMonthlyChartData);
router.get('/stats/yearly-chart', getYearlyChartData);
router.get('/:id', getSubscription);
router.put('/:id', updateSubscription);
router.delete('/:id', deleteSubscription);

export default router;
