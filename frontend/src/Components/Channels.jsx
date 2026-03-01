import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectors } from '../store/slices/channelsSlice'
import Channel from './Channel'
import { addChannel, deleteChannel, editedChannel } from '../store/slices/channelsSlice'
import { io } from 'socket.io-client'
import getDefaultChannel from '../lib/getDefaultChannel'
import ModalContainer from './Modals/ModalContainer'
import { useTranslation } from 'react-i18next'

const Channels = ({ currentChannel, setCurrentChannel }) => {

  const listChannels = Object.values(useSelector(state => selectors.selectEntities(state)))

  const [channels, setChannels] = useState([])
  const [show, setShow] = useState(false)
  const [action, setAction] = useState(null)
  const [selectedChannel, setSelectedChannel] = useState(null)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const defaultChannel = getDefaultChannel(listChannels)
  const listNameChannels = listChannels.map(channel => channel.name)

  useEffect(() => {
    if (channels.length !== listChannels.length) {
      setChannels(listChannels)
    }
  }, [listChannels])

  useEffect(() => {
    const newNameChannels = listChannels.map(channel => channel.name)
    const oldNameChannels = channels.map(channel => channel.name)
    newNameChannels.forEach((name) => {
      if (!oldNameChannels.includes(name)) {
        setChannels(listChannels)
      }
    })
  }, [listChannels])

  useEffect(() => {
    setCurrentChannel(defaultChannel)
  }, [defaultChannel])

  useEffect(() => {
    if (!currentChannel) {
      setCurrentChannel(defaultChannel)
    }
  }, [channels, currentChannel])

  useEffect(() => {
    const socket = io()

    socket.on('newChannel', (payload) => {
      dispatch(addChannel(payload))
    })

    socket.on('removeChannel', (payload) => {
      setCurrentChannel(null)
      dispatch(deleteChannel(payload))
    })

    socket.on('renameChannel', (payload) => {
      const { id, name } = payload
      const changes = { name }
      const changeData = { id, changes }
      dispatch(editedChannel(changeData))
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const addNewChannel = () => {
    setShow(true)
    setAction('add')
  }

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('mainPage.channels')}</b>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={addNewChannel}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-plus-square">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
          </svg>
          <span className="visually-hidden">{t('mainPage.addChannel')}</span>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => {
          return (
            <Channel
              channel={channel}
              currentChannel={currentChannel}
              setCurrentChannel={setCurrentChannel}
              setAction={setAction}
              setShow={setShow}
              key={channel.id}
              channels={channels}
              setSelectedChannel={setSelectedChannel}
            />
          )
        })}
      </ul>
      <ModalContainer
        show={show}
        setShow={setShow}
        action={action}
        selectedChannel={selectedChannel}
        listNameChannels={listNameChannels}
        setCurrentChannel={setCurrentChannel}
      />
    </div>
  )
}

export default Channels
