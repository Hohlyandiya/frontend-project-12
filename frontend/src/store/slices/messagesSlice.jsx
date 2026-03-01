import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { deleteChannel } from './channelsSlice'

const messagesAdapter = createEntityAdapter()

const initialState = messagesAdapter.getInitialState()

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages(state, { payload }) {
      messagesAdapter.setMany(state, payload)
    },
    addMessage(state, { payload }) {
      messagesAdapter.addOne(state, payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteChannel, (state, action) => {
        const { id } = action.payload
        const allEntites = Object.values(state.entities)
        const deletedMessages = allEntites.filter((message) => {
          if (message.channelId === id) {
            return message.id
          }
        })
        messagesAdapter.removeMany(state, deletedMessages)
      })
  },
})

export const selectors = messagesAdapter.getSelectors(state => state.messages)
export const { addMessages, addMessage } = messagesSlice.actions
export default messagesSlice.reducer
