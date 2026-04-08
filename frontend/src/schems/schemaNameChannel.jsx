import * as yup from 'yup'
import { useTranslation } from 'react-i18next'

const schemaNameChannel = (listNameChannels) => {

  const { t } = useTranslation()

  return yup.object().shape({
    name: yup.string()
      .trim()
      .min(3, t('modals.minAndMaxChars'))
      .max(20, t('modals.minAndMaxChars'))
      .notOneOf(listNameChannels, t('modals.uniqueNameChannel'))
      .required(),
  })
}

export default schemaNameChannel
