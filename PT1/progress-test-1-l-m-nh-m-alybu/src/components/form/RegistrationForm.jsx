import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import { validateField } from '../../utils/validators'
import { useFormContext } from '../../context/FormContext'
import FormField from './FormField'

const fields = ['fullName', 'email', 'password', 'confirmPassword']

export default function RegistrationForm() {
  const { state, dispatch } = useFormContext()
  const { status, values } = state
  const isSubmitting = status === 'submitting'

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch({ type: 'VALIDATE_ALL' })

    const hasError = fields.some((field) =>
      validateField(field, values[field], values)
    )

    if (hasError) {
      return
    }

    dispatch({ type: 'SET_STATUS', status: 'submitting' })
    await new Promise((resolve) => setTimeout(resolve, 1000))
    dispatch({ type: 'SET_STATUS', status: 'success' })
  }

  if (status === 'success') {
    return (
      <main className="min-h-[calc(100vh-64px)] bg-slate-50 py-10">
        <Container className="max-w-xl">
          <Card className="rounded-xl border-0 shadow-lg">
            <Card.Body className="p-6 sm:p-8">
              <Alert variant="success" className="mb-4 rounded-lg">
                Đăng ký thành công!
              </Alert>
              <Button
                type="button"
                variant="primary"
                className="rounded-lg px-4 py-2 font-semibold"
                onClick={() => dispatch({ type: 'RESET' })}
              >
                Đăng ký lại
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </main>
    )
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-50 py-10">
      <Container className="max-w-xl">
        <Card className="rounded-xl border-0 shadow-lg">
          <Card.Body className="p-6 sm:p-8">
            <h1 className="mb-2 text-2xl font-bold text-slate-900">
              Đăng ký tài khoản
            </h1>
            <p className="mb-6 text-sm text-slate-500">
              Nhập thông tin của bạn để tạo tài khoản mới.
            </p>

            <Form onSubmit={handleSubmit} noValidate>
              <FormField
                name="fullName"
                label="Họ và tên"
                placeholder="Nguyen Van A"
              />
              <FormField
                name="email"
                label="Email"
                type="email"
                placeholder="test@example.com"
              />
              <FormField
                name="password"
                label="Mật khẩu"
                type="password"
                placeholder="Nhập mật khẩu"
              />
              <FormField
                name="confirmPassword"
                label="Xác nhận mật khẩu"
                type="password"
                placeholder="Nhập lại mật khẩu"
              />

              {status === 'error' && (
                <Alert variant="danger" className="rounded-lg">
                  Vui lòng kiểm tra lại thông tin đăng ký.
                </Alert>
              )}

              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="w-full rounded-lg py-2 font-semibold"
              >
                {isSubmitting && (
                  <Spinner
                    animation="border"
                    size="sm"
                    className="me-2"
                    aria-hidden="true"
                  />
                )}
                {isSubmitting ? 'Đang xử lý...' : 'Đăng ký'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </main>
  )
}
