import * as yup from 'yup';
import { Formik, Form, Field } from 'formik'
import handlerLogin from '../api/handlerLogin';
import { useState } from 'react';

const FormAuthorization = (/* props */ {navigate}) => {
  //const navigate = props.navigate
  const [stateField, setStateField] = useState("")
  const tooltip = (stateField !== "") ? <div class="invalid-tooltip">Неверные имя пользователя или пароль</div> : ""
  return (
    <Formik       
      initialValues={{ username: "", password: "" }}
      onSubmit={ async ({ setSubmitting }) => {
        await handlerLogin(username.value, password.value, setStateField, navigate)
        setSubmitting(false);
      }}
    >
      {() => (
        <Form className="col-12 col-md-6 mt-3 mt-md-0">
          <h1 className="text-center mb-4">Войти</h1>
          <div className="form-floating mb-3">
            <Field
              type="text"
              name="username"
              className={`form-control ${stateField}`}
              autoComplete="username"
              required=""
              placeholder="Ваш ник"
              id="username"
            />
            <label htmlFor="username">Ваш ник</label>
          </div>
          <div className="form-floating mb-4">
            <Field
              name="password"
              autoComplete="current-password"
              required=""
              placeholder="Пароль"
              type="password"
              id="password"
              className={`form-control ${stateField}`}
            />
            <label className="form-label" htmlFor="password">Пароль</label>
            {tooltip}
          </div>
          <button
            type="submit"
            className="w-100 mb-3 btn btn-outline-primary"
          >
            Войти
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default FormAuthorization;