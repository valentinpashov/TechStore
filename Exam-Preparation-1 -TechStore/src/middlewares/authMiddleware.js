import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import { AUTH_COOKIE_NAME } from "../config.js";

export const auth = (req, res, next) => {
  const token = req.cookies[AUTH_COOKIE_NAME]; //Взимам token-a

  if (!token) {    //Проверяваме потребителя ако няма да продължава
    return next();
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);

    req.user = decodedToken;
    res.locals.user = decodedToken;   
  } catch (err) {
    res.clearCookie(AUTH_COOKIE_NAME);
    return res.redirect("/auth/login");
  }
  next();    
};

export const isAuth = (req, res, next) => {
    if(!req.user){
        return res.redirect('/auth/login');
    }

    next();
};


//ако си логнат вече не може пак да се логваш
export const isGuest = ( req,res, next ) => {
  if(req.user){
    res.setError('You are already logged in!');
    return res.redirect('/')
  }
  next();
}
