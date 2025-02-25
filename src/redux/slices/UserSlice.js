import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user:{},
    status:false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        signIn:(state,action)=>{
            state.user={...state.user, ...action.payload}
            state.status=true

        },
        signOut:(state,action)=>{
              state.user={}
              state.status=false
        }
    }
})

export const {signIn, signOut}= userSlice.actions
export default userSlice.reducer