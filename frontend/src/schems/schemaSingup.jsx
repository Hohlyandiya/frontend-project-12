import * as yup from 'yup'
// import { useTranslation } from 'react-i18next'

const schemaSignup = (t) => {

  // const { t } = useTranslation()

  return yup.object().shape({
    username: yup.string()
      .trim()
      .min(3, t('forms.minAndMaxChars'))
      .max(20, t('forms.minAndMaxChars'))
      .required(t('forms.requiredField')),
    password: yup.string()
      .trim()
      .min(6, t('forms.minChars'))
      .required(t('forms.requiredField')),
    confirmPassword: yup.string()
      .trim()
      .test({
        name: 'confirmPassword',
        message: t('forms.PasswordsDontMatch'),
        test: (password, context) => password === context.parent.password,
      }),
  })
}

export default schemaSignup
