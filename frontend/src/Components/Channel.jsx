import DropDownToggle from './UI/DropDownToggle'
import ButtonChannel from './UI/ButtonChannel'

const Channel = ({ channel, currentChannel, setCurrentChannel, setAction, setShow, setSelectedChannel }) => {
  return channel.removable
    ? (
        <li key={channel.id} className="nav-item w-100">
          <DropDownToggle
            channel={channel}
            currentChannel={currentChannel}
            setCurrentChannel={setCurrentChannel}
            setAction={setAction}
            setShow={setShow}
            setSelectedChannel={setSelectedChannel}
          />
        </li>
      )
    : (
        <li key={channel.id} className="nav-item w-100">
          <ButtonChannel
            channel={channel}
            currentChannel={currentChannel}
            setCurrentChannel={setCurrentChannel}
          />
        </li>
      )
}

export default Channel
