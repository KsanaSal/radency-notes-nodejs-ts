import express from 'express';

const router = express.Router();

import notesOperations from '../data/notes.js';
import HttpError from '../helpers/httpError.js';

router.get('/', async (req, res, next) => {
  try {
    const notes = await notesOperations.listNotes();
    res.json({ status: 'success', code: 200, data: { result: notes } });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await notesOperations.getNotesById(id);
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
