import express from 'express';

const router = express.Router();

import validation from '../middlewares/validation.js';
import schemas from '../schemas/note.js';
import controller from '../controller/notes.js';

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: API endpoints for managing notes.
 */

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Get a list of all notes.
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: Success. Returns a list of notes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 code:
 *                   type: integer
 *                 data:
 *                   type: object
 *                   properties:
 *                     result:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 */

router.get('/', controller.getAll);

/**
 * @swagger
 * /notes/stats:
 *   get:
 *     summary: Get a list of all notes.
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: Success. Returns a list of notes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 code:
 *                   type: integer
 *                 data:
 *                   type: object
 *                   properties:
 *                     result:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 */

router.get('/stats', controller.getByStats);

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Get a single note by ID.
 *     tags: [Notes]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the note to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success. Returns the requested note.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 code:
 *                   type: integer
 *                 data:
 *                   type: object
 *                   properties:
 *                     result:
 *                       type: object
 *       404:
 *         description: Not Found. The requested note does not exist.
 */

router.get('/:id', controller.getById);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Delete a single note by ID.
 *     tags: [Notes]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the note to delete.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success. Returns the deleted note.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 code:
 *                   type: integer
 *                 data:
 *                   type: object
 *                   properties:
 *                     result:
 *                       type: object
 *       404:
 *         description: Not Found. The requested note does not exist.
 */

router.delete('/:id', controller.deleteById);

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a new note.
 *     tags: [Notes]
 *     requestBody:
 *       description: Note object to be created.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: string
 *               categoryName:
 *                 type: string
 *               categoryImg:
 *                 type: string
 *               content:
 *                 type: string
 *               nameTitle:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created. Returns the newly created note.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 code:
 *                   type: integer
 *                 data:
 *                   type: object
 *                   properties:
 *                     result:
 *                       type: object
 *       400:
 *         description: Bad Request. Invalid input data.
 */

router.post('/', validation(schemas.noteSchema), controller.postNote);

/**
 * @swagger
 * /notes/{id}:
 *   patch:
 *     summary: Update a note by ID.
 *     tags: [Notes]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the note to update.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Note object with fields to be updated.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: string
 *               categoryName:
 *                 type: string
 *               categoryImg:
 *                 type: string
 *               content:
 *                 type: string
 *               nameTitle:
 *                 type: string
 *               archived:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Success. Returns the updated note.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 code:
 *                   type: integer
 *                 data:
 *                   type: object
 *                   properties:
 *                     result:
 *                       type: object
 *       400:
 *         description: Bad Request. Invalid input data.
 *       404:
 *         description: Not Found. The requested note does not exist.
 */

router.patch('/:id', validation(schemas.patchNoteSchema), controller.patchById);

export default router;
