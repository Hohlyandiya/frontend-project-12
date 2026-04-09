import { useState, /* useContext, */ useRef, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import Button from 'react-bootstrap/esm/Button'
import * as yup from 'yup'
import cn from 'classnames'
import renameChannel from '../../api/renameChannel'
//import AuthContext from '../../context/index'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import schemaNameChannel from '../../schems/schemaNameChannel'

const BodyRenameChannel = ({setShow, selectedChannel, listNameChannels}) => {

  const fieldChangeName = useRef()
  //const { user } = useContext(AuthContext)
  const [isNotValidChannel, setIsNotValidChannel] = useState(false)
  const [errors, setErrors] = useState('')
  const { t } = useTranslation()

    useEffect(() => {
    fieldChangeName.current.focus()
  }, [fieldChangeName])

  const schema = schemaNameChannel(listNameChannels)

/*   const schema = yup.object().shape({
    name: yup.string()
      .trim()
      .min(3, t('modals.minAndMaxChars'))
      .max(20, t('modals.minAndMaxChars'))
      .notOneOf(listNameChannels, t('modals.uniqueNameChannel'))
      .required(),
  }); */

  const handleClose = () => setShow(false)

  const checkValidNewChannel = async (newNameChannel) => {
    const isValid = schema.isValidSync(newNameChannel)
    const listErrors = await schema.validate(newNameChannel).catch(err => err.errors)
    setErrors(listErrors)

    if (!isValid) {
      setIsNotValidChannel(!isValid)
    } else {
      setIsNotValidChannel(isValid)
      await renameChannel(newNameChannel, selectedChannel/* , user.token */)
      handleClose()
    }
  }

  return (
    <Formik       
      initialValues={{ name: "" }}
      onSubmit={(newNameChannel) => {
        checkValidNewChannel(newNameChannel)
        toast.success(t('toastContainer.channelRename'))
      }}
    >
      {() => (
        <Form className="">
          <div className="form-floating mb-3">
            <Field
            innerRef={fieldChangeName}
            type="text"
            name="name"
            className={cn("mb-2 form-control", {
              "is-invalid": isNotValidChannel
            })}
            autoComplete="name"
            required=""
            id="name"
          />
          <label htmlFor="name" className="form-label" >{t('modals.nameChannel')}</label>
          </div>
          {isNotValidChannel ? <div className="invalid-feedback">{errors[0]}</div> : null}
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={handleClose}>
              {t('modals.buttonClose')}
            </Button>
            <Button
              type="submit"
              variant="primary"
              onKeyDown={(newNameChannel) => {
                checkValidNewChannel(newNameChannel)
              }}
            >
              {t('modals.buttonSend')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default BodyRenameChannel;