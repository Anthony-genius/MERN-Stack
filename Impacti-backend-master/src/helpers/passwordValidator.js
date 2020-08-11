const strongPasswordRegex = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
);

const passwordIsStrongEnough = password => strongPasswordRegex.test(password);

const isPasswordCorrect = password =>
  password && password.length >= 7 && passwordIsStrongEnough(password);

const validate = password => isPasswordCorrect(password);

module.exports = { validate };
