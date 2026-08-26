import mongoose, { Schema, Document, Model } from 'mongoose';
import { IProduct } from '@/types';

export interface IProductDocument extends Omit<IProduct, 'id'>, Document {}

const ProductSchema = new Schema<IProductDocument>(
  {
    nameEn: { type: String, required: true, trim: true },
    nameAr: { type: String, required: true, trim: true },
    descriptionEn: { type: String, required: true },
    descriptionAr: { type: String, required: true },
    category: {
      type: String,
      enum: ['uniforms', 'camp_gear', 'event_supplies', 'souvenirs'],
      required: true,
      default: 'uniforms',
    },
    priceEGP: { type: Number, required: true },
    imageUrl: { type: String },
    inStock: { type: Boolean, default: true },
    featuresEn: [{ type: String }],
    featuresAr: [{ type: String }],
  },
  { timestamps: true }
);

export const Product: Model<IProductDocument> =
  mongoose.models.Product || mongoose.model<IProductDocument>('Product', ProductSchema);