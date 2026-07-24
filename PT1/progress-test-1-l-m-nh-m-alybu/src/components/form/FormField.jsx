import { useId } from 'react'
import Form from 'react-bootstrap/Form'
import { useFormContext } from '../../context/FormContext'

export default function FormField({ name, label, type = 'text', placeholder }) {
  const inputId = useId()
  const { state, dispatch } = useFormContext()
  const value = state.values[name]
  const error = state.errors[name]
  const touched = state.touched[name]
  const showError = touched && error

  return (
    <Form.Group className="mb-4" controlId={inputId}>
      <Form.Label className="text-sm font-semibold text-slate-700">
        {label}
      </Form.Label>
      <Form.Control
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        isInvalid={Boolean(showError)}
        isValid={Boolean(touched && !error)}
        className="rounded-lg border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        onChange={(event) =>
          dispatch({
            type: 'CHANGE',
            field: name,
            value: event.target.value,
          })
        }
        onBlur={() => dispatch({ type: 'BLUR', field: name })}
      />
      <Form.Control.Feedback type="invalid">
        {error}
      </Form.Control.Feedback>
    </Form.Group>
  )
}
