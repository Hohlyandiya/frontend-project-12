import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

const channelsAdapter = createEntityAdapter()

const initialState = channelsAdapter.getInitialState()

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, { payload }) {
      channelsAdapter.setMany(state, payload)
    },
    addChannel(state, { payload }) {
      channelsAdapter.addOne(state, payload)
    },
    deleteChannel(state, { payload }) {
      const { id } = payload
      channelsAdapter.removeOne(state, id)
    },
    editedChannel(state, { payload }) {
      channelsAdapter.updateOne(state, payload)
    }
  }
})

export const selectors = channelsAdapter.getSelectors(state => state.channels)
export const { setChannels, addChannel, deleteChannel, editedChannel } = channelsSlice.actions;
export default channelsSlice.reducer;