    import crypto from 'crypto';
    import {NODE_ENV} from '../config/config.env.js'

    const generateNonce = () => {
        return crypto.randomBytes(16).toString('base64');
    };

    const cspMiddlewareDev = (req, res, next) => {
        const nonce = generateNonce();
        console.log('Generated nonce:', nonce);
        res.locals.nonce = nonce;
        console.log('nonce no res.locals:', res.locals.nonce);

        const cspPolicy = {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", `'nonce-${nonce}'`, 'http://localhost:6000', 'https://localhost:6000'],
            styleSrc: ["'self'", `'nonce-${nonce}'`, 'http://localhost:6000', 'https://localhost:6000', 'https://fonts.gstatic.com'],
            objectSrc: ["'none'"],
            imgSrc: ["'self'", 'data:', 'https:', 'http://localhost:6000', 'https://localhost:6000'],
            fontSrc: ["'self'", 'https://fonts.gstatic.com'],
            connectSrc: ["'self'", 'http://localhost:6000', 'https://localhost:6000'],
            formAction: ["'self'"],
            frameAncestors: ["'none'"]
        };
        
        const cspHeader = generateCSPHeader(cspPolicy);
        console.log("Generated CSP Header:", cspHeader);
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
        frameAncestors: ["'none'"]
    };

    res.setHeader('Content-Security-Policy', generateCSPHeader(cspPolicy));
    next();
    };

    // Função para gerar o cabeçalho CSP
    const generateCSPHeader = (policy) => {
    return Object.entries(policy)
        .map(([key, value]) => `${key} ${value.join(' ')}`)
        .join('; ');        
    };

    
    const cspMiddleware = (req, res, next) => {
    if (NODE_ENV !== 'development') {
        return cspMiddlewareProd(req, res, next);
    }
    
    return cspMiddlewareDev(req, res, next);
    };

    

export default cspMiddleware;
