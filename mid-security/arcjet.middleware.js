import aj from '../config/config.arcjet.js';

const arcjetMiddleware = async (req, res, next) => {
    try{
        const decision = await aj.protect(req, {requested: 1}); /// Deduct 5 tokens from the bucket
        console.log(`[Arcjet] Decision: ${JSON.stringify(decision)}`);


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
        next(error);
    };
};

export default arcjetMiddleware;