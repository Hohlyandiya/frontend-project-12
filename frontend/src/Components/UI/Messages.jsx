import filter from 'leo-profanity'

const Messages = ({ messages, currentChannel }) => {

  const channelMessageHistory = messages.filter(message => +currentChannel?.id === +message.channelId)
  return channelMessageHistory.map(message =>
    <div key={message.id} id="messages-box" className="chat-messages overflow-auto px-5 ">
      <div className ="text-break mb-2">
        <b>{message.username}</b>: {filter.clean(message.body)}
      </div>
    </div>
  )
}

export default Messages
