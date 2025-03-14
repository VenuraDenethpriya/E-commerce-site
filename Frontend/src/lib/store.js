import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counterSlice'
import cartReducer from './features/cartSlice'
import saveReducer from './features/saveSlice'
import buyReducer from './features/buySlice'

import { Api } from './api'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    save: saveReducer,
    buy: buyReducer,
    [Api.reducerPath]: Api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Api.middleware),
    
})

setupListeners(store.dispatch)