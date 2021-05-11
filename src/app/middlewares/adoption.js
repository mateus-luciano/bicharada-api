import createError from 'http-errors';

import Adoption from '../models/Adoption';

import HttpConstants from '../constants/http';
import MessagesError from '../constants/messagesError';

function validateData(req, res, next) {
  const { title, description, address, type } = req.body;

  if (!title || !description || !address || !type) {
    throw createError(HttpConstants.BadRequest, MessagesError.InvalidParams);
  }

  next();
}

async function validateAdoptionExists(req, res, next) {
  const { uid } = req.params;

  const adoption = await Adoption.findOne({
    where: { uid },
  });

  if (!adoption) {
    // throw createError(HttpConstants.NoContent, MessagesError.NotFound);
    return res
      .status(HttpConstants.NotFound)
      .json({ message: MessagesError.NotFound });
  }

  req.adoptionUid = adoption.uid;

  next();
}

export { validateData, validateAdoptionExists };
