import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IRadioTrack {
    id?: string;
    titleEn: string;
    titleAr: string;
    artistEn: string;
    artistAr: string;
    category: 'anthem' | 'song' | 'chant' | 'podcast';
    duration: string;
    audioSrc: string;
    isActive: boolean; // Controls whether this song plays on the live radio
    order: number;
}

export interface IRadioTrackDocument extends Omit<IRadioTrack, 'id'>, Document { }

const RadioTrackSchema = new Schema<IRadioTrackDocument>(
    {
        titleEn: { type: String, required: true, trim: true },
        titleAr: { type: String, required: true, trim: true },
        artistEn: { type: String, default: 'Magica Zone' },
        artistAr: { type: String, default: 'ماجيكا زون' },
        category: {
            type: String,
            enum: ['anthem', 'song', 'chant', 'podcast'],
            default: 'anthem',
        },
        duration: { type: String, default: '3:00' },
        audioSrc: { type: String, required: true },
        isActive: { type: Boolean, default: true },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export const RadioTrack: Model<IRadioTrackDocument> =
    mongoose.models.RadioTrack || mongoose.model<IRadioTrackDocument>('RadioTrack', RadioTrackSchema);