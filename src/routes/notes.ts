import express from 'express';

const router = express.Router();

import notesOperations from '../data/notes.js';
import HttpError from '../helpers/httpError.js';
import validation from '../middlewares/validation.js';
import schemas from '../schemas/note.js';

router.get('/', async (req, res, next) => {
  try {
    const notes = await notesOperations.listNotes();
    res.json({ status: 'success', code: 200, data: { result: notes } });
  } catch (error) {
    next(error);
  }
});

router.get('/stats', async (req, res, next) => {
  try {
    const notes = await notesOperations.statsNotes();
    res.json({ status: 'success', code: 200, data: { result: notes } });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
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
});

router.delete('/:id', async (req, res, next) => {
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
});

router.post('/', validation(schemas.noteSchema), async (req, res, next) => {
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
});

router.patch('/:id', validation(schemas.patchNoteSchema), async (req, res, next) => {
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
});

export default router;
