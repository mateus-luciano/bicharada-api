import User from '../models/User';

function validateData(req, res, next) {
  const { email, password, name, city, phone } = req.body;

  if (!email || !password || !name || !city || !phone) {
    return res.status(400).json({
      message: 'Dados inválidos',
    });
  }

  next();
}

async function checkEmail(req, res, next) {
  const { email } = req.body;

  const user = await User.findOne({
    where: { email },
  });

  if (user) {
    return res.status(409).json({
      message: 'E-mail já registrado.',
    });
  }

  next();
}

async function validateUserExists(req, res, next) {
  const { uid } = req.params;

  const user = await User.findOne({
    where: { uid },
  });

  if (!user) {
    return res.status(404).json({
      message: 'Não encontrado',
    });
  }

  next();
}

export { validateData, checkEmail, validateUserExists };
