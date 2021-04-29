import Adoption from '../models/Adoption';

function validateData(req, res, next) {
  const { title, description, address, type } = req.body;

  if (!title || !description || !address || !type) {
    return res.status(400).json({
      message: 'Dados inválidos',
    });
  }

  next();
}

async function validateAdoptionExists(req, res, next) {
  const { uid } = req.params;

  const adoption = await Adoption.findOne({
    where: { uid },
  });

  if (!adoption) {
    return res.status(404).json({
      message: 'Não encontrado',
    });
  }

  req.adoptionUid = adoption.uid;

  next();
}

export { validateData, validateAdoptionExists };
