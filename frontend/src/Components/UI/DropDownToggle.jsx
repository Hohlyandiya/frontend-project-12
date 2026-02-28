import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonChannel from './ButtonChannel';
import cn from 'classnames'
import { useTranslation } from 'react-i18next';

const DropDownToggle = ({ channel, currentChannel, setCurrentChannel, setAction, setShow, setSelectedChannel}) => {

  const { t } = useTranslation()

    const btnClass = cn('', {
      'secondary': currentChannel?.id === channel.id ? true : false,
    })

    const removeChannel = () => {
      setShow(true)
      setAction('remove')
      setSelectedChannel(channel)
    }

    const editChannel = () => {
      setShow(true)
      setAction('edit')
      setSelectedChannel(channel)
    }

  return (
    <Dropdown>
      <ButtonGroup className="d-flex">
        <ButtonChannel
          channel={channel}
          currentChannel={currentChannel}
          setCurrentChannel={setCurrentChannel}
        />
        
        <Dropdown.Toggle split variant={btnClass} id="dropdown-split-basic">
          <label className="visually-hidden">{t('modals.channelManagement')}</label>
        </Dropdown.Toggle>
      </ButtonGroup>

      <Dropdown.Menu>
        <Dropdown.Item variant="danger" href="#/action-1" onClick={removeChannel}>{t('dropDownToggle.delete')}</Dropdown.Item>
        <Dropdown.Item href="#/action-2" onClick={editChannel}>{t('dropDownToggle.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropDownToggle