import User from '../models/User';

async function checkUserExists(req, res, next) {
  const { email } = req.body;

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    return res.status(400).json({
      message: 'E-mail inválido',
    });
  }

  next();
}

async function checkPassword(req, res, next) {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email },
  });

  if (!(await user.checkPassword(password))) {
    return res.status(401).json({
      message: 'Senha não confere',
    });
  }

  next();
}

export { checkUserExists, checkPassword };
