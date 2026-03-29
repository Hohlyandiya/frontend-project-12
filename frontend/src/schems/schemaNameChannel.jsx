import * as yup from 'yup'

const schemaNameChannel = (listNameChannels) => {
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
