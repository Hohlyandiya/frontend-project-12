import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Button } from 'react-bootstrap'
import handlerLogin from '../api/handlerLogin'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const FormAuthorization = ({ navigate }) => {
  const { t } = useTranslation()
  const [stateField, setStateField] = useState('')
  const tooltip = (stateField !== '') ? <div className="invalid-tooltip">{t('pageLogin.errorMessage')}</div> : ''
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={ async () => {
        if (navigator.onLine) {
          await handlerLogin(username.value, password.value, setStateField, navigate)
        }
        else {
          toast.error(t('toastContainer.errNetwork'))
        }
      }}
    >
      {() => (
        <Form className="col-12 col-md-6 mt-3 mt-md-0">
          <h1 className="text-center mb-4">{t('pageLogin.login')}</h1>
          <div className="form-floating mb-3">
            <Field
              type="text"
              name="username"
              className={`form-control ${stateField}`}
              placeholder={t('forms.nickName')}
              autoComplete={t('forms.username')}
              required=""
              id="username"
            />
            <label htmlFor="username">{t('forms.nickName')}</label>
          </div>
          <div className="form-floating mb-4">
            <Field
              name="password"
              autoComplete="current-password"
              required=""
              placeholder={t('forms.password')}
              type="password"
              id="password"
              className={`form-control ${stateField}`}
            />
            <label className="form-label" htmlFor="password">{t('forms.password')}</label>
            {tooltip}
          </div>
          <Button type='submit' variant='outline-primary' className="w-100 mb-3">{t('pageLogin.login')}</Button>
        </Form>
      )}
    </Formik>
  )
}

export default FormAuthorization
