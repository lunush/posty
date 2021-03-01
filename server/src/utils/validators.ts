import User from '../models/User'

interface ErrorObject {
  [key: string]: any
}

export const validatePassword = (password: string, errors: ErrorObject) => {
  if (password.trim() === '') errors.password = 'Password must not be empty'
  return errors
}

export const validateUsername = async (
  username: string,
  errors: ErrorObject
) => {
  if (username.trim() === '') errors.username = 'Username must not be empty'
  if (
    username === 'login' ||
    username === 'register' ||
    username === 'settings'
  )
    errors.username = 'Illegal username'
  const user = await User.findOne({ username })
  if (!user) errors.username = 'This username is taken'

  return errors
}

export const validateName = (name: string, errors: ErrorObject) => {
  if (name.trim() === '') errors.username = 'Name must not be empty'
  return errors
}

export const validateUserRegistrationInput = (
  username: string,
  name: string,
  password: string
) => {
  const errors: ErrorObject = {}

  validateUsername(username, errors)
  validateName(name, errors)
  validatePassword(password, errors)

  return {
    errors,
    isValid: Object.keys(errors).length < 1
  }
}

export const validateUserLoginInput = (username: string, password: string) => {
  const errors: ErrorObject = {}

  validatePassword(password, errors)
  validateUsername(username, errors)

  return {
    errors,
    isValid: Object.keys(errors).length < 1
  }
}

export const validateUserProfileInput = (
  username: string,
  name: string,
  bio: string,
  location: string
) => {
  const errors: ErrorObject = {}

  validateUsername(username, errors)
  validateName(name, errors)
  //do something to others
  console.log(bio, location)

  return {
    errors,
    isValid: Object.keys(errors).length < 1
  }
}
