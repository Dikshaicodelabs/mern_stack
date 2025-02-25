import { configureStore } from '@reduxjs/toolkit'
import storage from "redux-persist/lib/storage";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
  } from "redux-persist";
import userReducer from './slices/UserSlice'
const store = configureStore({
  reducer: {
   user : persistReducer(
        {
          key: "user",
          storage,
        },
        userReducer
      ),
  },
})

const persistor = persistStore(store);

export { persistor, store };