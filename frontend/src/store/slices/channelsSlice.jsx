import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

const channelsAdapter = createEntityAdapter()

const initialState = channelsAdapter.getInitialState()


/* const initialState = {
  channels: {
    entities: {},
    ids: []
  }
} */

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
    /* editedChannel(state, { payload }) {
      const { id } = payload
      const { [id]: value, ...channels } = state.entities
      const updateEntities = {...channels, payload}
      channelsAdapter.setAll(state, updateEntities)
      console.log(payload)
      channelsAdapter.updateOne(state, payload)
    } */
    editedChannel: channelsAdapter.updateOne
  }
})

export const selectors = channelsAdapter.getSelectors(state => state.channels)
export const { setChannels, addChannel, deleteChannel, editedChannel } = channelsSlice.actions;
export default channelsSlice.reducer;