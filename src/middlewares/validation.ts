import { Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import { INote } from '../types/interfaceNotes.js';

interface IExtendedError extends Error {
  status?: number;
}

const validation = (schema: ObjectSchema<INote>) => {
  return (req: Request, res: Response, next: () => void) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const err: IExtendedError = new Error(error.message || 'missing required name field');
      err.status = 400;
      throw err;
    }
    next();
  };
};

export default validation;
