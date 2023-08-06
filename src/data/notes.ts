import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { INote } from '../types/interfaceNotes.js';
// import { v4 as uuidv4 } from 'uuid';

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

const notes = { listNotes, getNotesById };

export default notes;
