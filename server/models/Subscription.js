import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide a subscription name'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Entertainment', 'Productivity', 'Fitness', 'Education', 'Streaming', 'Other'],
      default: 'Other',
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: [0, 'Price cannot be negative'],
    },
    frequency: {
      type: String,
      enum: ['monthly', 'yearly'],
      default: 'monthly',
    },
    status: {
      type: String,
      enum: ['active', 'paused', 'cancelled'],
      default: 'active',
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      default: null,
    },
    nextBillingDate: {
      type: Date,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Calculate next billing date before saving
subscriptionSchema.pre('save', function (next) {
  if (!this.nextBillingDate) {
    const next_date = new Date(this.startDate);
    if (this.frequency === 'monthly') {
      next_date.setMonth(next_date.getMonth() + 1);
    } else {
      next_date.setFullYear(next_date.getFullYear() + 1);
    }
    this.nextBillingDate = next_date;
  }
  next();
});

export default mongoose.model('Subscription', subscriptionSchema);
