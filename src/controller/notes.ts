import { Request, Response, NextFunction } from 'express';
import notesOperations from '../data/notes.js';
import HttpError from '../helpers/httpError.js';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await notesOperations.listNotes();
    res.json({ status: 'success', code: 200, data: { result: notes } });
  } catch (error) {
    next(error);
  }
};

const getByStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await notesOperations.statsNotes();
    res.json({ status: 'success', code: 200, data: { result: notes } });
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const note = await notesOperations.getNotesById(id);
    if (!note) {
      throw HttpError(404);
    }
    res.json({
      status: 'success',
      code: 200,
      data: { note },
    });
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await notesOperations.deleteNote(id);
    if (!result) {
      throw HttpError(404);
    }
    res.json({
      status: 'success',
      code: 200,
      data: { message: 'contact deleted' },
    });
  } catch (error) {
    next(error);
  }
};

const postNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const note = await notesOperations.addNote(req.body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: { note },
    });
  } catch (error) {
    next(error);
  }
};

const patchById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await notesOperations.updateNote(id, req.body);
    if (!result) {
      throw HttpError(404);
    }
    res.json({
      status: 'success',
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

const controller = {
  getAll,
  getByStats,
  getById,
  deleteById,
  postNote,
  patchById,
};

export default controller;
