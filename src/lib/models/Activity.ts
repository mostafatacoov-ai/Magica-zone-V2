import mongoose, { Schema, Document, Model } from 'mongoose';
import { IActivity } from '@/types';

export interface IActivityDocument extends Omit<IActivity, 'id'>, Document {}

const ActivitySchema = new Schema<IActivityDocument>(
  {
    titleEn: { type: String, required: true, trim: true },
    titleAr: { type: String, required: true, trim: true },
    descriptionEn: { type: String, required: true },
    descriptionAr: { type: String, required: true },
    category: {
      type: String,
      enum: ['kids_youth', 'corporate', 'camp', 'bazar'],
      required: true,
      default: 'kids_youth',
    },
    ageRange: { type: String, default: '6+' },
    durationMinutes: { type: Number, required: true, default: 20 },
    participantsMin: { type: Number, required: true, default: 4 },
    participantsMax: { type: Number, required: true, default: 20 },
    pricePerDayEGP: { type: Number, required: true, default: 6000 },
    benefitsEn: [{ type: String }],
    benefitsAr: [{ type: String }],
    imageUrl: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Activity: Model<IActivityDocument> =
  mongoose.models.Activity || mongoose.model<IActivityDocument>('Activity', ActivitySchema);