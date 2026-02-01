import mongoose from "mongoose";
interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  mobile?: string;
  role: 'user' | 'admin' | 'deliveryboy';
  image?: string;
}

const userSchmema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  mobile: { type: String, required: false },
  role: { type: String, enum: ['user', 'admin', 'deliveryboy'], default: 'user' },
  image: { type: String }
},
  { timestamps: true }
);
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchmema);

export default User;


