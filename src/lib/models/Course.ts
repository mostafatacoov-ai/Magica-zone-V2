import mongoose, { Schema, Document, Model } from 'mongoose';
import { ICourse } from '@/types';

export interface ICourseDocument extends Omit<ICourse, 'id' | '_id'>, Document { }

const CourseSchema = new Schema<ICourseDocument>(
  {
    titleEn: { type: String, required: true, trim: true, default: '' },
    titleAr: { type: String, required: true, trim: true, default: '' },
    descriptionEn: { type: String, default: '' },
    descriptionAr: { type: String, default: '' },
    category: {
      type: String,
      enum: ['stem_robotics', 'leadership', 'creative_arts', 'outdoor_survival'],
      default: 'stem_robotics',
    },
    ageGroup: { type: String, default: '8-14 Years' },
    durationWeeks: { type: Number, default: 4 },
    sessionsCount: { type: Number, default: 8 },
    priceEGP: { type: Number, default: 0 },
    instructorNameEn: { type: String, default: 'Eng. Mohamed Moustafa' },
    instructorNameAr: { type: String, default: 'م. محمد مصطفى' },
    instructorTitleEn: { type: String, default: 'Head of STEM & Innovation' },
    instructorTitleAr: { type: String, default: 'رئيس مسار الابتكار وSTEM' },
    instructorImage: { type: String, default: '/0logo.png' },
    syllabusEn: { type: [String], default: [] },
    syllabusAr: { type: [String], default: [] },
    scheduleEn: { type: String, default: 'Saturdays & Tuesdays (4-6 PM)' },
    scheduleAr: { type: String, default: 'السبت والثلاثاء (4-6 مساءً)' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Course: Model<ICourseDocument> =
  mongoose.models.Course || mongoose.model<ICourseDocument>('Course', CourseSchema);