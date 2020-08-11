const strongPasswordRegex = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
)

const passwordIsStrongEnough = password => strongPasswordRegex.test(password)

const isPasswordCorrect = password =>
  password && password.length >= 7 && passwordIsStrongEnough(password)

const checkError = password => {
  if (!password) {
    return 'Password cannot be empty'
  }

  if (password.length < 8) {
    return 'Password must be at least 8 characters long'
  }

  if (!passwordIsStrongEnough(password)) {
    return 'Password must contain: a lowercase letter, an uppercase letter, a special character and a digit'
  }

  return null
}

export const validate = ({ password, repeatedPassword }) => ({
  isPasswordCorrect: isPasswordCorrect(password),
  passwordError: checkError(password),
  repeatedPasswordTheSame: password === repeatedPassword,
  wasValidationPerformed: true
})
