// import { useContext } from 'react'
import Button from 'react-bootstrap/esm/Button'
import deleteChannel from '../../api/deleteChannel'
// import AuthContext from '../../context/index'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const BodyDeletechannel = ({ setShow, selectedChannel }) => {

  // const { user } = useContext(AuthContext)
  const { t } = useTranslation()

  const handleClose = () => {

    setShow(false)
  }

  const removeChannel = async () => {

    await deleteChannel(/* user.token, */ selectedChannel.id)
    setShow(false)
    toast.success(t('toastContainer.channelDelete'))
  }

  return (
    <>
      <p className="lead">{t('modals.question')}</p>
      <div className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2" onClick={handleClose}>
          {t('modals.buttonClose')}
        </Button>
        <Button
          variant="danger"
          onClick={removeChannel}
          onKeyDown={removeChannel}
        >
          {t('modals.buttonDelete')}
        </Button>
      </div>
    </>
  )
}

export default BodyDeletechannel
