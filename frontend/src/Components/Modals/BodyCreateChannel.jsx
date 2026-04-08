import { useState, useContext, useRef, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import Button from 'react-bootstrap/esm/Button'
import * as yup from 'yup'
import cn from 'classnames'
import addNewChannel from '../../api/addNewChannel'
import AuthContext from '../../context/index'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import schemaNameChannel from  '../../schems/schemaNameChannel'

const BodyCreateChannel = ({setShow, listNameChannels}) => {

  const { t } = useTranslation()

  const fieldChannelName = useRef()
  const { user } = useContext(AuthContext)
  const [isNotValidChannel, setIsNotValidChannel] = useState(false)
  const [errors, setErrors] = useState('')

  useEffect(() => {
    fieldChannelName.current.focus()
  }, [fieldChannelName])

  const schema = schemaNameChannel(listNameChannels) /* yup.object().shape({
    name: yup.string()
      .trim()
      .min(3, t('modals.minAndMaxChars'))
      .max(20, t('modals.minAndMaxChars'))
      .notOneOf(listNameChannels, t('modals.uniqueNameChannel'))
      .required(),
  }); */

  const handleClose = () => setShow(false)

  const checkValidNewChannel = async (newChannel) => {
    const isValid = schema.isValidSync(newChannel)
    const listErrors = await schema.validate(newChannel).catch(err => err.errors)
    setErrors(listErrors)

    if (isValid) {
      setIsNotValidChannel(isValid)
      await addNewChannel(newChannel/* , user.token */)
      handleClose()
      toast.success(t('toastContainer.channelCreate'))
    } else {
      setIsNotValidChannel(!isValid)
    }
  }

  return (
    <Formik       
      initialValues={{ name: "" }}
      onSubmit={(newChannel) => {
        checkValidNewChannel(newChannel)
      }}
    >
      {() => (
        <Form className="">
          <Field
            innerRef={fieldChannelName}
            type="text"
            name="name"
            className={cn("mb-2 form-control", {
              "is-invalid": isNotValidChannel
            })}
            autoComplete="name"
            required=""
            id="name"
          />
          {isNotValidChannel ? <div className="invalid-feedback">{errors[0]}</div> : null}
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={handleClose}>
              {t('modals.buttonClose')}
            </Button>
            <Button 
              type="submit"
              variant="primary"
              onKeyDown={(newChannel) => checkValidNewChannel(newChannel)}
            >
              {t('modals.buttonSend')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default BodyCreateChannel;