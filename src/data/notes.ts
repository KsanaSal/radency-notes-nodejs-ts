import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { INote } from '../types/interfaceNotes.js';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const notesPath = join(__dirname, 'notes.json');

const listNotes = async () => {
  const result = await readFile(notesPath, 'utf-8');
  return JSON.parse(result);
};

const getNotesById = async (id: string) => {
  const recordId = String(id);
  const notes: INote[] = await listNotes();
  return notes.filter((el) => el.recordId === recordId)[0] || null;
};

function countArchivedNotesByCategory(notes: INote[]) {
  const countByCategory = {};

  notes.forEach((note) => {
    const categoryId = note.categoryId;
    const categoryName = note.categoryName;
    const isArchived = note.archived;

    if (!countByCategory[categoryName]) {
      countByCategory[categoryName] = { categoryId, archived: 0, notArchived: 0 };
    }

    if (isArchived) {
      countByCategory[categoryName].archived++;
    } else {
      countByCategory[categoryName].notArchived++;
    }
  });

  return countByCategory;
}

const statsNotes = async () => {
  const result: INote[] = await listNotes();
  return countArchivedNotesByCategory(result);
};

const deleteNote = async (id: string) => {
  const recordId = String(id);
  const notes: INote[] = await listNotes();
  const index = notes.findIndex((el) => el.recordId === recordId);
  if (index === -1) {
    return null;
  }
  const [note] = notes.splice(index, 1);
  await writeFile(notesPath, JSON.stringify(notes, null, 2));
  return note;
};

const addNote = async (body: INote) => {
  const note = await listNotes();
  body.recordId = uuidv4();
  body.archived = false;
  body.createDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  note.push(body);
  await writeFile(notesPath, JSON.stringify(note, null, 2));
  return body;
};

const updateNote = async (id: string, body: INote) => {
  const notes = await listNotes();
  const index = notes.findIndex((el: INote) => el.recordId === id);
  if (index === -1) {
    return null;
  }
  notes[index] = { ...notes[index], ...body };
  await writeFile(notesPath, JSON.stringify(notes, null, 2));
  return notes[index];
};

const notes = { listNotes, getNotesById, statsNotes, deleteNote, addNote, updateNote };

export default notes;
