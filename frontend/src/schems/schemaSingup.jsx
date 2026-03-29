import * as yup from 'yup'

const schemaSignup = yup.object().shape({
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
      test: (password, context) => password === context.parent.password,
    }),
})

export default schemaSignup
