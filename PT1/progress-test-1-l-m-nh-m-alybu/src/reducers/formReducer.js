import { validateField } from '../utils/validators'

export const fieldNames = ['fullName', 'email', 'password', 'confirmPassword']

export const initialState = {
  values: {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  errors: {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  touched: {
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  },
  status: 'idle',
}

function validateAll(values) {
  return fieldNames.reduce((errors, field) => {
    errors[field] = validateField(field, values[field], values)
    return errors
  }, {})
}

function touchAll() {
  return fieldNames.reduce((touched, field) => {
    touched[field] = true
    return touched
  }, {})
}

export function formReducer(state, action) {
  switch (action.type) {
    case 'CHANGE': {
      const { field, value } = action
      const values = {
        ...state.values,
        [field]: value,
      }
      const errors = { ...state.errors }

      if (state.touched[field]) {
        errors[field] = validateField(field, value, values)
      }

      if (field === 'password' && state.touched.confirmPassword) {
        errors.confirmPassword = validateField(
          'confirmPassword',
          values.confirmPassword,
          values
        )
      }

      return {
        ...state,
        values,
        errors,
        status: state.status === 'error' ? 'idle' : state.status,
      }
    }

    case 'BLUR': {
      const { field } = action

      return {
        ...state,
        touched: {
          ...state.touched,
          [field]: true,
        },
        errors: {
          ...state.errors,
          [field]: validateField(field, state.values[field], state.values),
        },
      }
    }

    case 'VALIDATE_ALL': {
      const errors = validateAll(state.values)
      const hasError = Object.values(errors).some(Boolean)

      return {
        ...state,
        errors,
        touched: touchAll(),
        status: hasError ? 'error' : state.status,
      }
    }

    case 'SET_STATUS':
      return {
        ...state,
        status: action.status,
      }

    case 'RESET':
      return initialState

    default:
      return state
  }
}
