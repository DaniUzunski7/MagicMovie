import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET | 'BASICSECRET';

export const authMiddleware = (req, res, next) => {
    const token = req.cookies['auth'];

    if (token){
        next();
    }
    
    try {
        const decodetToken = jwt.verify(token, SECRET);

        req.user = decodetToken;

        next()
    } catch (error) {
        
    }

}