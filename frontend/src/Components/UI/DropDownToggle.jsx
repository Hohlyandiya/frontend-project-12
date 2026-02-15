import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonChannel from './ButtonChannel';
import cn from 'classnames'

const DropDownToggle = ({ channel, currentChannel, setCurrentChannel, setAction, setShow, setSelectedChannel}) => {

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
        <Dropdown.Toggle split variant={btnClass} id="dropdown-split-basic" />
      </ButtonGroup>

      <Dropdown.Menu>
        <Dropdown.Item variant="danger" href="#/action-1" onClick={removeChannel}>Удалить</Dropdown.Item>
        <Dropdown.Item href="#/action-2" onClick={editChannel}>Переименовать</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropDownToggle