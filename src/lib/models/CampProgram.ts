import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICampProgram {
  id?: string;
  titleEn: string;
  titleAr: string;
  season: 'summer' | 'winter' | 'spring' | 'midyear' | 'weekend';
  locationEn: string;
  locationAr: string;
  datesEn: string;
  datesAr: string;
  ageGroup: string;
  sessionDuration: string;
  priceUSD?: number;
  priceEGP?: number;
  descriptionEn: string;
  descriptionAr: string;
  inclusionsEn: string[];
  inclusionsAr: string[];
  bannerImage?: string;
  isActive: boolean;
  order: number;
}

export interface ICampProgramDocument extends Omit<ICampProgram, 'id'>, Document {}

const CampProgramSchema = new Schema<ICampProgramDocument>(
  {
    titleEn: { type: String, required: true, trim: true },
    titleAr: { type: String, required: true, trim: true },
    season: {
      type: String,
      enum: ['summer', 'winter', 'spring', 'midyear', 'weekend'],
      default: 'summer',
    },
    locationEn: { type: String, default: 'Royal Valley Campsite & Tech Village' },
    locationAr: { type: String, default: 'موقع الوادي الملكي وقرية التكنولوجيا' },
    datesEn: { type: String, default: 'July 1 - August 30' },
    datesAr: { type: String, default: '1 يوليو - 30 أغسطس' },
    ageGroup: { type: String, default: '6 - 15 Years' },
    sessionDuration: { type: String, default: '2-Week & Monthly Options' },
    priceUSD: { type: Number, default: 350 },
    priceEGP: { type: Number, default: 15000 },
    descriptionEn: { type: String, default: '' },
    descriptionAr: { type: String, default: '' },
    inclusionsEn: { type: [String], default: [] },
    inclusionsAr: { type: [String], default: [] },
    bannerImage: { type: String, default: '/magica-camp-print.png' },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const CampProgram: Model<ICampProgramDocument> =
  mongoose.models.CampProgram || mongoose.model<ICampProgramDocument>('CampProgram', CampProgramSchema);