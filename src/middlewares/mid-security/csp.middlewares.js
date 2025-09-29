import { PORT, NODE_ENV } from '../../config/config.env.js';
import generateNonce from '../../utils/create-nonce.js';

const cspMiddlewareDev = (req, res, next) => {
  const nonce = generateNonce();
  res.locals.nonce = nonce;

  const cspPolicy = {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", `'nonce-${nonce}'`, `http://localhost:${PORT}`],
    styleSrc: [
      "'self'",
      `'nonce-${nonce}'`,
      `http://localhost:${PORT}`,
      'https://fonts.gstatic.com',
    ],
    objectSrc: ["'none'"],
    imgSrc: ["'self'", 'data:', 'https:', `http://localhost:${PORT}`],
    fontSrc: ["'self'", 'https://fonts.gstatic.com'],
    connectSrc: ["'self'", `http://localhost:${PORT}`],
    formAction: ["'self'"],
    frameAncestors: ["'none'"],
  };

  const cspHeader = generateCSPHeader(cspPolicy);
  res.setHeader('Content-Security-Policy', cspHeader);
  next();
};

const cspMiddlewareProd = (req, res, next) => {
  const nonce = generateNonce();
  res.locals.nonce = nonce;

  const cspPolicy = {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", `'nonce-${nonce}'`],
    styleSrc: ["'self'", `'nonce-${nonce}'`],
    objectSrc: ["'none'"],
    imgSrc: ["'self'", 'data:', 'https:'],
    fontSrc: ["'self'", 'https://fonts.gstatic.com'],
    connectSrc: ["'self'"],
    formAction: ["'self'"],
    frameAncestors: ["'none'"],
  };

  res.setHeader('Content-Security-Policy', generateCSPHeader(cspPolicy));
  next();
};

// Função para gerar o cabeçalho CSP
const generateCSPHeader = policy => {
  return Object.entries(policy)
    .map(([key, value]) => `${key} ${value.join(' ')}`)
    .join('; ');
};

const cspMiddleware = (req, res, next) => {
  const env = NODE_ENV;

  if (env !== 'development') {
    res.locals.env = env;
    return cspMiddlewareProd(req, res, next);
  }

  res.locals.env = env;
  return cspMiddlewareDev(req, res, next);
};

export default cspMiddleware;
