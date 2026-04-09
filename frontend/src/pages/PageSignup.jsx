import { useState } from 'react'
import NavBar from '../Components/UI/NavBar'
import img from '../assets/signup.jpg'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Button } from 'react-bootstrap'
//import * as yup from 'yup'
import createNewUser from '../api/createNewUser'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import schemaSignup from '../schems/schemaSingup'

const PageSignup = () => {

  const { t } = useTranslation()

  const navigate = useNavigate()

  const [isUserExists, setIsUserExists] = useState(false)

  const schema = schemaSignup(t)

  /*   const schema = yup.object().shape({
    username: yup.string()
      .trim()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле'),
    password: yup.string()
      .trim()
      .min(6, 'Не менее 6 символов')
      .required('Обязательное поле'),
    confirmPassword: yup.string()
      .trim()
      .test({
        name: 'confirmPassword',
        message: 'Пароли должны совпадать',
        test: (password, context) => password === context.parent.password
      })
  }); */

  /*   const checkIsUserExists = async (user) => {
    const {username, password} = user
    const newUser = {
      username: username,
      password: password,
    }
    const result = await createNewUser(newUser)
    if (result) {
      setIsUserExists(false)
      navigate('/')
    } else {
      setIsUserExists(true)
    }
  } */

  const checkIsUserExists = async (user) => {
    if (navigator.onLine) {
      const { username, password } = user
      const newUser = {
        username,
        password,
      }
      const result = await createNewUser(newUser)
      if (result) {
        setIsUserExists(false)
        navigate('/')
      }
      else {
        setIsUserExists(true)
      }
    }
    else {
      toast.error(t('toastContainer.errNetwork'))
    }
  }

  return (
    <>
      <div className="d-flex flex-column h-100">
        <NavBar/>
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                  <div>
                    <img src={img} className="rounded-circle" alt="Регистрация"/>
                  </div>
                  <Formik
                    initialValues={{ username: '', password: '', confirmPassword: '' }}
                    validationSchema={schema}
                    onSubmit={(newUser) => {
                      checkIsUserExists(newUser)
                      /* if (navigator.onLine) {
                        checkIsUserExists(newUser)
                      } else {
                        toast.error(t('toastContainer.errNetwork'))
                      } */
                    }}
                  >
                    {({ values, errors, touched }) => (
                      <Form className="w-50">
                        <h1 className="text-center mb-4">{t('pageSignup.registration')}</h1>
                        {Object.keys(values).map((fieldValue) => {
                          const labelBody = {
                            username: t('forms.username'),
                            password: t('forms.password'),
                            confirmPassword: t('forms.confirmPassword'),
                          }
                          const listValues = Object.keys(values)
                          const lastElement = listValues[listValues.length - 1]
                          const userExit = fieldValue === lastElement ? 'Такой пользователь уже существует' : ''
                          return (
                            <div key={fieldValue} className={cn('form-floating', {
                              'mb-3': fieldValue !== lastElement ? true : false,
                              'mb-4': fieldValue === lastElement ? true : false,
                            })}>
                              <Field
                                type={'username' === fieldValue ? 'text' : 'password'}
                                name={fieldValue}
                                className={cn('form-control', {
                                  'is-invalid': touched[fieldValue] && errors[fieldValue] || isUserExists ? true : false,
                                })}
                                autoComplete={cn('', {
                                  username: fieldValue === 'username',
                                  'new-password': fieldValue !== 'username',
                                })}
                                required=""
                                id={fieldValue}
                                placeholder={labelBody[fieldValue]}
                              />
                              <label className="form-label" htmlFor={fieldValue}>{labelBody[fieldValue]}</label>
                              <ErrorMessage name={fieldValue}>{message => <div placement="right" className="invalid-tooltip">{message}</div>}</ErrorMessage>
                              {isUserExists ? <div placement="right" className="invalid-tooltip">{userExit}</div> : null}
                            </div>
                          )
                        })}
                        <Button type="submit" variant="outline-primary" className="w-100">{t('pageSignup.signup')}</Button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PageSignup
