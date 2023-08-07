import express from 'express';

const router = express.Router();

import validation from '../middlewares/validation.js';
import schemas from '../schemas/note.js';
import controller from '../controller/notes.js';

router.get('/', controller.getAll);

router.get('/stats', controller.getByStats);

router.get('/:id', controller.getById);

router.delete('/:id', controller.deleteById);

router.post('/', validation(schemas.noteSchema), controller.postNote);

router.patch('/:id', validation(schemas.patchNoteSchema), controller.patchById);

export default router;
