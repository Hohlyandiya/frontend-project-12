import cn from 'classnames'
import Button from 'react-bootstrap/Button'
import filter from 'leo-profanity'

const ButtonChannel = ({ channel, currentChannel, setCurrentChannel }) => {

  const btnClass = cn('', {
    secondary: currentChannel?.id === channel.id ? true : false,
  })

  const channelSelectionHandler = () => {
    setCurrentChannel(channel)
  }

  return (
    <Button variant={btnClass} className="w-100 rounded-0 text-start" onClick={channelSelectionHandler}>
      <span className="me-1">#</span>{filter.clean(channel.name)}
    </Button>
  )
}

export default ButtonChannel
