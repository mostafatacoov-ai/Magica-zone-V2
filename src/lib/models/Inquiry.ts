import mongoose, { Schema, Document, Model } from 'mongoose';
import { IInquiry } from '@/types';

export interface IInquiryDocument extends Omit<IInquiry, 'id'>, Document {}

const InquirySchema = new Schema<IInquiryDocument>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    organization: { type: String, trim: true },
    category: {
      type: String,
      enum: ['kids_youth', 'corporate', 'camp', 'bazar'],
      required: true,
      default: 'kids_youth',
    },
    selectedActivities: [{ type: String }],
    estimatedParticipants: { type: Number, required: true, min: 1 },
    eventDate: { type: Date },
    location: { type: String, trim: true },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    notes: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

export const Inquiry: Model<IInquiryDocument> =
  mongoose.models.Inquiry || mongoose.model<IInquiryDocument>('Inquiry', InquirySchema);