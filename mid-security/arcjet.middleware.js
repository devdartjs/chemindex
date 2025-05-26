import aj from '../config/config.arcjet.js';

const arcjetMiddleware = async (req, res, next) => {
    try{
        const decision = await aj.protect(req, {requested: 5}); /// Deduct 5 tokens from the bucket
        
        if (process.env.NODE_ENV !== 'production') {
            console.log(`[Arcjet] Decision: ${JSON.stringify(decision)}`);
        }


        if(decision.isDenied()){
            console.log(`[Arcjet] isDenied: ${decision.isDenied()}, Reason: ${decision.reason?.kind}`);

            if(decision.reason.isRateLimit()) return res.status(429).json({ error: 'Too many requests' });
            if(decision.reason.isBot()) return res.status(403).json({ error: 'No bots allowed' });

            return res.status(403).json({ error: 'Access denied' });
        }

        next();
    }

    catch(error){
        console.log(`Arcjet Middleware Error: ${error}`);
        if (process.env.NODE_ENV === 'production') return res.status(503).json({ error: 'Security service unavailable' });  
        next(error);
    };
};

//// export default arcjetMiddleware;