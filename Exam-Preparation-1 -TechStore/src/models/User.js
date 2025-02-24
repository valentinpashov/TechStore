import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';    // 9

//TODO:   Схемата подлежи на промени според условието
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required!'],
    minLength: 10,
  },
  name: {
    type: String,
    required: [true, 'Name is required!'],
    minLength: 2,
    maxLength: 20,
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
    minLength: 4,
  },
});

//9   //хеширане на паролата
userSchema.pre('save', async function() {
this.password = await bcrypt.hash(this.password, 10);
});

const User = model('User', userSchema);

export default User;