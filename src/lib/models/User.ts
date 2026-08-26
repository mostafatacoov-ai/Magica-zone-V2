import mongoose, { Schema, Document, Model } from 'mongoose';
import { IUser } from '@/types';

export interface IUserDocument extends Omit<IUser, 'id' | '_id'>, Document {
  passwordHash: string;
}

const SubmissionSchema = new Schema({
  courseTitle: { type: String, required: true },
  assignmentTitle: { type: String, required: true },
  fileOrUrl: { type: String, required: true },
  notes: { type: String },
  submittedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['submitted', 'reviewed', 'graded'], default: 'submitted' },
});

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    phone: { type: String, trim: true },
    role: {
      type: String,
      enum: ['student', 'teacher', 'employee', 'admin'],
      default: 'student',
    },
    enrolledCourses: [{ type: String }],
    submissions: [SubmissionSchema],
  },
  { timestamps: true }
);

export const User: Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>('User', UserSchema);