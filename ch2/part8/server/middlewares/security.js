const { disablePoweredBy } = require("./disablePoweredBy");

const cors = require("cors");
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");
const slowDown = require("express-slow-down");

function secure(app) {
  app.use(disablePoweredBy);

  app.use(
    cors({
      origin: ["https://example.ru", "http://localhost:3001"],
    })
  );

  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          scriptSrc: [
            "'self'",
            "'unsafe-inline'",
            "https://cdn.jsdelivr.net",
            "https://code.jquery.com",
          ],
        },
      },
    })
  );

  // app.use(helmet.contentSecurityPolicy());
  // app.use(helmet.crossOriginEmbedderPolicy());
  // app.use(helmet.crossOriginOpenerPolicy());
  // app.use(helmet.crossOriginResourcePolicy());
  // app.use(helmet.dnsPrefetchControl());
  // app.use(helmet.expectCt());
  // app.use(helmet.frameguard());
  // app.use(helmet.hidePoweredBy());
  // app.use(helmet.hsts());
  // app.use(helmet.ieNoOpen());
  // app.use(helmet.noSniff());
  // app.use(helmet.originAgentCluster());
  // app.use(helmet.permittedCrossDomainPolicies());
  // app.use(helmet.referrerPolicy());
  // app.use(helmet.xssFilter());

  const limiter = rateLimiter({
    windowMs: 1 * 60 * 1000,
    max: 120, // limit each IP to 120 requests per minute
  });

  const speedLimiter = slowDown({
    windowMs: 1 * 60 * 1000, 
    delayAfter: 100, // allow 100 requests per minute,
    delayMs: 1000, // adding 1000ms of delay per request above 100
    // request # 101 is delayed by 1000ms
    // request # 102 is delayed by 2000ms
  });

  app.use(speedLimiter);
  app.use(limiter);
}

module.exports = { secure };
