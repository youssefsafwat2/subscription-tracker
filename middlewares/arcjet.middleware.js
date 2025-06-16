import aj from '../config/arcjet.js';

export const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, 1);
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit())
        return res.status(429).json({ error: 'Too many requests' });
      if (decision.reason.isBot())
        return res.status(403).json({ error: 'Bot detected' });

      return res.status(403).json({ error: 'Access denied' });
    }

    next();
  } catch (error) {
    console.log('Arcjet Middleware Error: ', error);
    next(error);
  }
};

export default arcjetMiddleware;
