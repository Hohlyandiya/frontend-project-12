import { useContext } from 'react'
import Button from 'react-bootstrap/esm/Button'
import deleteChannel from '../../api/deleteChannel'
import AuthContext from '../../context/index'
import 'bootstrap/dist/css/bootstrap.min.css'

const BodyDeletechannel = ({setShow, selectedChannel}) => {

  //const token = localStorage.getItem('token')
  const { user } = useContext(AuthContext)

  const handleClose = () => {
    setShow(false)
  }

  const removeChannel = async () => {
    await deleteChannel(user.token, selectedChannel.id)
    setShow(false)
  }

  return (
    <>
      <p className="lead">Уверены?</p>
      <div className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2" onClick={handleClose}>
          Отменить
        </Button>
        <Button
          variant="danger"
          onClick={removeChannel}
          onKeyDown={removeChannel}
        >
          Удалить
        </Button>
      </div>
    </>
  )
}

export default BodyDeletechannel