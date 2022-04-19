import mongoose, { Schema } from 'mongoose';
import INote from '../interface/note_interface';


const BookSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    author: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

BookSchema.post<INote>('save', function () {
  console.log("not saved")
});

export default mongoose.model<INote>('notes', BookSchema);