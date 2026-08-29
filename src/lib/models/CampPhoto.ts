import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICampPhoto {
  id?: string;
  _id?: string;
  imageUrl: string;
  captionEn?: string;
  captionAr?: string;
  order: number;
  isActive: boolean;
}

export interface ICampPhotoDocument extends Omit<ICampPhoto, 'id' | '_id'>, Document {}

const CampPhotoSchema = new Schema<ICampPhotoDocument>(
  {
    imageUrl: { type: String, required: true },
    captionEn: { type: String, default: 'Camp Adventure Moment' },
    captionAr: { type: String, default: 'لحظة مميزة من المعسكر' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const CampPhoto: Model<ICampPhotoDocument> =
  mongoose.models.CampPhoto || mongoose.model<ICampPhotoDocument>('CampPhoto', CampPhotoSchema);