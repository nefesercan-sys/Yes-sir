import mongoose, { Schema, Document } from "mongoose";

export interface IIlan extends Document {
  _id: string;
  baslik: string;
  aciklama: string;
  fiyat: number;
  sektor: string;
  tip: "bireysel" | "ticari";
  sehir: string;
  ilce?: string;
  gorseller: string[];
  slug: string;
  aktif: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const IlanSchema = new Schema<IIlan>(
  {
    baslik:    { type: String, required: true },
    aciklama:  { type: String, required: true },
    fiyat:     { type: Number, required: true },
    sektor:    { type: String, required: true },
    tip:       { type: String, enum: ["bireysel", "ticari"], required: true },
    sehir:     { type: String, required: true },
    ilce:      { type: String },
    gorseller: [{ type: String }],
    aktif:     { type: Boolean, default: true },

    slug: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Ilan ||
  mongoose.model<IIlan>("Ilan", IlanSchema);
