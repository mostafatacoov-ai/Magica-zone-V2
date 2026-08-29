import mongoose, { Schema, Document, Model } from 'mongoose';
import { IActivity } from '@/types';

export interface IActivityDocument extends Omit<IActivity, 'id'>, Document {}

const ActivitySchema = new Schema<IActivityDocument>(
  {
    titleEn: { type: String, required: true, trim: true },
    titleAr: { type: String, required: true, trim: true },
    descriptionEn: { type: String, default: '' },
    descriptionAr: { type: String, default: '' },
    category: { type: String, default: 'kids_youth' }, // Flexible to accept kids_youth, corporate, camp, etc.
    ageRange: { type: String, default: '6+' },
    durationMinutes: { type: Number, default: 20 },
    participantsMin: { type: Number, default: 4 },
    participantsMax: { type: Number, default: 20 },
    pricePerDayEGP: { type: Number, default: 6000 },
    benefitsEn: { type: [String], default: [] },
    benefitsAr: { type: [String], default: [] },
    imageUrl: { type: String, default: '/magica-games-print.png' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Activity: Model<IActivityDocument> =
  mongoose.models.Activity || mongoose.model<IActivityDocument>('Activity', ActivitySchema);