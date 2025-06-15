import Subscription from '../models/subscription.model.js';
async function runExpireJob() {
  try {
    const result = await Subscription.expireOverdue();

    console.log(`Expired ${result.modifiedCount} subscriptions.`);
  } catch (error) {
    console.error('Cron job failed:', err);
    process.exit(1);
  }
}

export default runExpireJob;
