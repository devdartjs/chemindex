    import crypto from 'crypto';
    import {NODE_ENV} from '../config/config.env.js'

    const generateNonce = () => {
        return crypto.randomBytes(16).toString('base64');
    };

    const cspMiddlewareDev = (req, res, next) => {
        const nonce = generateNonce();
        res.locals.nonce = nonce;
        console.log('nonce no res.locals:', res.locals.nonce);

        const cspPolicy = {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", `'nonce-${nonce}'`, 'http://localhost:3000', 'https://localhost:3000'],
            styleSrc: ["'self'", `'nonce-${nonce}'`, 'http://localhost:3000', 'https://localhost:3000', 'https://fonts.gstatic.com'],
            objectSrc: ["'none'"],
            imgSrc: ["'self'", 'data:', 'https:', 'http://localhost:3000', 'https://localhost:3000'],
            fontSrc: ["'self'", 'https://fonts.gstatic.com'],
            connectSrc: ["'self'", 'http://localhost:3000', 'https://localhost:3000'],
            formAction: ["'self'"],
            frameAncestors: ["'none'"]
        };
        
        const cspHeader = generateCSPHeader(cspPolicy);
        res.setHeader('Content-Security-Policy', cspHeader);
        next();
    };



    // Função para gerar o cabeçalho CSP
    const generateCSPHeader = (policy) => {
    return Object.entries(policy)
        .map(([key, value]) => `${key} ${value.join(' ')}`)
        .join('; ');        
    };

    
    const cspMiddleware = (req, res, next) => {
        const env = NODE_ENV;

            if (env === 'development') {
                return cspMiddlewareDev(req, res, next); 
            }
            
            res.locals.env = env;
            return cspMiddlewareDev(req, res, next);
    };
    
export default cspMiddleware;
