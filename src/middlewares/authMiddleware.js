import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const SECRET = process.env.JWT_SECRET || 'BASICSECRET';

export const authMiddleware = (req, res, next) => {
    const token = req.cookies['auth'];

    if (!token){
        return next();
    }
    
    try {
        const decodetToken = jwt.verify(token, SECRET);

        req.user = decodetToken;
        res.locals.user = decodetToken;

        next()
    } catch (error) {
        res.clearCookie();
        res.redirect('/auth/login');
    }

}