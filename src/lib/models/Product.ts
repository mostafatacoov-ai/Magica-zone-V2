import mongoose, { Schema, Document, Model } from 'mongoose';
import { IProduct } from '@/types';

export interface IProductDocument extends Omit<IProduct, 'id'>, Document { }

const ProductSchema = new Schema<IProductDocument>(
  {
    nameEn: { type: String, required: true, trim: true, default: '' },
    nameAr: { type: String, required: true, trim: true, default: '' },
    descriptionEn: { type: String, default: '' },
    descriptionAr: { type: String, default: '' },
    category: {
      type: String,
      enum: ['uniforms', 'camp_gear', 'event_supplies', 'souvenirs'],
      default: 'event_supplies',
    },
    priceEGP: { type: Number, default: 0 },
    imageUrl: { type: String, default: '' },
    inStock: { type: Boolean, default: true },
    featuresEn: { type: [String], default: [] },
    featuresAr: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Product: Model<IProductDocument> =
  mongoose.models.Product || mongoose.model<IProductDocument>('Product', ProductSchema);