import { useState, useContext, useRef, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import Button from 'react-bootstrap/esm/Button'
import * as yup from 'yup'
import cn from 'classnames'
import renameChannel from '../../api/RenameChannel'
import AuthContext from '../../context/index'

const BodyRenameChannel = ({setShow, selectedChannel, listNameChannels}) => {

  const fieldChangeName = useRef()
  const { user } = useContext(AuthContext)
  const [isNotValidChannel, setIsNotValidChannel] = useState(false)
  const [errors, setErrors] = useState('')

    useEffect(() => {
    fieldChangeName.current.focus()
  }, [fieldChangeName])

  const schema = yup.object().shape({
    name: yup.string()
      .trim()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(listNameChannels, 'Должно быть уникальным')
      .required(),
  });

  const handleClose = () => setShow(false)

  const checkValidNewChannel = async (newNameChannel) => {
    const isValid = schema.isValidSync(newNameChannel)
    const listErrors = await schema.validate(newNameChannel).catch(err => err.errors)
    setErrors(listErrors)

    if (!isValid) {
      setIsNotValidChannel(!isValid)
    } else {
      setIsNotValidChannel(isValid)
      await renameChannel(newNameChannel, selectedChannel, user.token)
      handleClose()
    }
  }

  return (
    <Formik       
      initialValues={{ name: "" }}
      onSubmit={(newNameChannel) => {
        checkValidNewChannel(newNameChannel)
      }}
    >
      {() => (
        <Form className="">
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
          {isNotValidChannel ? <div className="invalid-feedback">{errors[0]}</div> : null}
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={handleClose}>
              Отменить
            </Button>
            <Button
              type="submit"
              variant="primary"
              onKeyDown={(newNameChannel) => checkValidNewChannel(newNameChannel)}
            >
              Отправить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default BodyRenameChannel;