import jwt from 'jsonwebtoken'  //12
import { JWT_SECRET } from '../config.js';   //13

export const generateToken = (user) => {
    //Payload
    const payload ={
       id: user.id,
       email: user.email,
       name: user.name,
     };
   
     // Създаваме Token-а
     const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '2h'});  //13
     return token;
}