import jwksRsa from 'jwks-rsa';
import jwt from 'express-jwt';

// WARNING!!: You need to have an API configured in a provider like Auth0 in order to use this middleware!
export const jwtChecker = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
  requestProperty: 'user'
});