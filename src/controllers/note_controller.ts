import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Note from '../models/note_models';

const createNote = async (req: Request, res: Response, next: NextFunction) => {
  let { author, desc, title } = req.body;

  const note = new Note({
    _id: new mongoose.Types.ObjectId(),
    author,
    desc,
    title
  });

  try {
    const result = await note
      .save();
    return res.status(200).json({
      note: result
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};




const getAllNote = (req: Request, res: Response, next: NextFunction) => {
  Note.find()
    .exec()
    .then((notes) => {
      return res.status(200).json({
        notes: notes,
        count: notes.length
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error
      });
    });
};

const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
  let { id } = req.body;

  Note.findByIdAndDelete(id).then((note) => {
    res.status(200).json({
      error: false,
      message: 'Successfuly delete'
    })
  }).catch((error) => {
    return res.status(500).json({
      message: error.message
    });
  });
};

const updateNote = async (req: Request, res: Response, next: NextFunction) => {
  let { id, title } = req.body;

  Note.findByIdAndUpdate(id, { title }).then((note) => {
    res.status(200).json({
      error: false,
      message: 'Successfuly update'
    })
  }).catch((error) => {
    return res.status(500).json({
      error: true,
      message: error.message
    });
  });
};

export default { updateNote, deleteNote, createNote, getAllNote };