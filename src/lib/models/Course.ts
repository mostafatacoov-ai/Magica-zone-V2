import mongoose, { Schema, Document, Model } from 'mongoose';
import { ICourse } from '@/types';

export interface ICourseDocument extends Omit<ICourse, 'id' | '_id'>, Document { }

const CourseSchema = new Schema<ICourseDocument>(
  {
    titleEn: { type: String, required: true, trim: true },
    titleAr: { type: String, required: true, trim: true },
    descriptionEn: { type: String, required: true },
    descriptionAr: { type: String, required: true },
    category: {
      type: String,
      enum: ['stem_robotics', 'leadership', 'creative_arts', 'outdoor_survival'],
      required: true,
      default: 'stem_robotics',
    },
    ageGroup: { type: String, required: true, default: '6-14 years' },
    durationWeeks: { type: Number, required: true, default: 4 },
    sessionsCount: { type: Number, required: true, default: 8 },
    priceEGP: { type: Number, required: true },
    instructorNameEn: { type: String, required: true, default: 'Eng. Mohamed Moustafa' },
    instructorNameAr: { type: String, required: true, default: 'م. محمد مصطفى' },
    instructorTitleEn: { type: String, default: 'Chief STEM & Innovation Facilitator' },
    instructorTitleAr: { type: String, default: 'رئيس مسار الابتكار وSTEM' },
    instructorImage: { type: String, default: '/0logo.png' },
    syllabusEn: [{ type: String }],
    syllabusAr: [{ type: String }],
    scheduleEn: { type: String, default: 'Twice a week (2 hrs/session)' },
    scheduleAr: { type: String, default: 'مرتان أسبوعياً (ساعتان لكل جلسة)' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Course: Model<ICourseDocument> =
  mongoose.models.Course || mongoose.model<ICourseDocument>('Course', CourseSchema);