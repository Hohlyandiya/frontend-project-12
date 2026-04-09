import Modal from 'react-bootstrap/Modal'
import BodyCreateChannel from './BodyCreateChannel'
import BodyDeletechannel from './BodyDeleteChannel'
import BodyRenameChannel from './BodyRenameChannel'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useTranslation } from 'react-i18next'

const ModalContainer = ({ show, setShow, action, selectedChannel, listNameChannels, setCurrentChannel }) => {

  const { t } = useTranslation()

  const modalTitle = {
    add: t('modals.addChannel'),
    remove: t('modals.removeChannel'),
    edit: t('modals.editChannel'),
  }

  const modalBody = () => {

    switch (action) {

      case ('add'):
        return (
          <BodyCreateChannel
            setShow={setShow}
            listNameChannels={listNameChannels}
            setCurrentChannel={setCurrentChannel}
          />
        )
      case('remove'):
        return (
          <BodyDeletechannel
            setShow={setShow}
            selectedChannel={selectedChannel}
          />
        )
      case('edit'):
        return (
          <BodyRenameChannel
            setShow={setShow}
            selectedChannel={selectedChannel}
            listNameChannels={listNameChannels}
          />
        )
    }
  }

  const handleClose = () => setShow(false)

  return (
    <Modal show={show} onHide={handleClose} centered>

      <Modal.Header closeButton>
        <Modal.Title>{modalTitle[action]}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {modalBody()}
      </Modal.Body>

    </Modal>
  )
}

export default ModalContainer
