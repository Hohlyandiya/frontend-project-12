const getDefaultChannel = (channels) => {
  return channels.find(channel => channel.name === 'general')
}

export default getDefaultChannel