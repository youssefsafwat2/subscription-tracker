import arcjet, { shield, detectBot, tokenBucket } from '@arcjet/node';
import { ARCJET_KEY, NODE_ENV } from './env.js';

const isProduction = NODE_ENV === 'production';

const aj = arcjet({
  key: ARCJET_KEY,
  characteristics: ['ip.src'], // Track requests by IP
  rules: [
    // SQLi / XSS shield
    shield({ mode: isProduction ? 'LIVE' : 'DRY_RUN' }),

    // Bot detection
    detectBot({
      mode: isProduction ? 'LIVE' : 'DRY_RUN',
      allow: [
        'CATEGORY:SEARCH_ENGINE',
        'IP:127.0.0.1',
        'IP:your-real-public-ip',
      ],
    }),

    // Rate limiting
    tokenBucket({
      mode: isProduction ? 'LIVE' : 'DRY_RUN',
      refillRate: 1,
      interval: 1,
      capacity: 3,
    }),
  ],
});

export default aj;
