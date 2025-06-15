import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Subscription name is required'],
      minLength: 2,
      maxLength: 100,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Subscription price is required'],
      min: [0, 'price must be at least 0'],
    },
    currency: {
      type: String,
      enum: [
        'AED',
        'AFN',
        'ALL',
        'AMD',
        'ANG',
        'AOA',
        'ARS',
        'AUD',
        'AWG',
        'AZN',
        'BAM',
        'BBD',
        'BDT',
        'BGN',
        'BIF',
        'BMD',
        'BND',
        'BOB',
        'BRL',
        'BSD',
        'BWP',
        'BZD',
        'CAD',
        'CDF',
        'CHF',
        'CLP',
        'CNY',
        'COP',
        'CRC',
        'CVE',
        'CZK',
        'DJF',
        'DKK',
        'DOP',
        'DZD',
        'EGP',
        'ETB',
        'EUR',
        'FJD',
        'FKP',
        'GBP',
        'GEL',
        'GIP',
        'GMD',
        'GNF',
        'GTQ',
        'GYD',
        'HKD',
        'HNL',
        'HRK',
        'HTG',
        'HUF',
        'IDR',
        'ILS',
        'INR',
        'ISK',
        'JMD',
        'JPY',
        'KES',
        'KGS',
        'KHR',
        'KMF',
        'KRW',
        'KYD',
        'KZT',
        'LAK',
        'LBP',
        'LKR',
        'LRD',
        'LSL',
        'MAD',
        'MDL',
        'MGA',
        'MKD',
        'MMK',
        'MNT',
        'MOP',
        'MRO',
        'MUR',
        'MVR',
        'MWK',
        'MXN',
        'MYR',
        'MZN',
        'NAD',
        'NGN',
        'NIO',
        'NOK',
        'NPR',
        'NZD',
        'PAB',
        'PEN',
        'PGK',
        'PHP',
        'PKR',
        'PLN',
        'PYG',
        'QAR',
        'RON',
        'RSD',
        'RUB',
        'RWF',
        'SAR',
        'SBD',
        'SCR',
        'SEK',
        'SGD',
        'SHP',
        'SLL',
        'SOS',
        'SRD',
        'STD',
        'SZL',
        'THB',
        'TJS',
        'TOP',
        'TRY',
        'TTD',
        'TWD',
        'TZS',
        'UAH',
        'UGX',
        'USD',
        'UYU',
        'UZS',
        'VND',
        'VUV',
        'WST',
        'XAF',
        'XCD',
        'XOF',
        'XPF',
        'YER',
        'ZAR',
        'ZMW',
      ],
      default: 'USD',
    },

    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'yearly'],
      required: true,
    },

    category: {
      type: String,
      enum: [
        'news',
        'sports',
        'entertainment',
        'education',
        'music',
        'video',
        'software',
        'productivity',
        'cloud_storage',
        'gaming',
        'finance',
        'health',
        'fitness',
        'shopping',
        'food',
        'travel',
        'social',
        'books',
        'magazine',
        'utilities',
        'lifestyle',
        'other',
      ],
      required: true,
    },

    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ['active', 'cancelled', 'expired'],
      default: 'active',
    },
    startDate: {
      type: Date,
      validate: {
        validator(value) {
          return value <= new Date();
        },
        message: 'Start date must be in the past or today',
      },
      default: () => new Date(),
    },

    renewalDate: {
      type: Date,
      validate: {
        validator(value) {
          return this.startDate && value > this.startDate;
        },
        message: 'Renewal date must be in the future and after the start date',
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },

  { timestamps: true }
);

// Auto-calculate the renewal date if it missing.

subscriptionSchema.pre('save', function (next) {
  // ['daily', 'weekly', 'monthly', 'yearly'],
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  if (this.renewalDate < new Date()) {
    this.status = 'expired';
  }

  next();
});

subscriptionSchema.statics.expireOverdue = async function () {
  return this.updateMany(
    { renewalDate: { $lt: new Date() }, status: 'active' },
    { status: 'expired' }
  );
};

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
