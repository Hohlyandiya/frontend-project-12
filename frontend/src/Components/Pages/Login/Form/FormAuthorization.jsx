import { Formik, Form, Field } from 'formik'
import handlerLogin from '../api/handlerLogin';

const FormAuthorization = () => {
  return (
    <Formik       
      initialValues={{ username: "", password: "" }}
      onSubmit={ async ({ setSubmitting }) => {
        /* await axios.post('/api/v1/login', { username: 'admin', password: 'admin' })
          .then((response) => {
            console.log(response.data); // => { token: ..., username: 'admin' }
          }); */
        await handlerLogin()
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
              className="form-control"
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
              className="form-control"
            />
            <label className="form-label" htmlFor="password">Пароль</label>
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