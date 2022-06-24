import { createAction, createReducer } from "@reduxjs/toolkit"

export const setAuth = createAction('SET_AUTH')

const initialState = {
    isAuth: false,
    user: {
        id: null,
        email: null,
        firstName: null,
        lastName: null,
        companyName: null,
        createdAt: null,
        role: null,
    },
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsInJvbGUiOnsiaWQiOjEsIm5hbWUiOiJhZG1pbiIsIl9fZW50aXR5IjoiUm9sZSJ9LCJpYXQiOjE2NTYwNzgxNzksImV4cCI6MTY1NjE2NDU3OX0.Q44cLKFhQKw0i0VoRn9gY02BF2T6_EjybYueMNtEFz8"
}



const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('SET_AUTH', (state = initialState, action) => {
            state.isAuth = !state.isAuth
            state.user.email = action.payload.user.email
            state.user.id = action.payload.user.id
            state.user.firstName = action.payload.user.firstName
            state.user.lastName = action.payload.user.lastName
            state.user.companyName = action.payload.user.companyName
            state.user.createdAt = action.payload.user.createdAt
            state.user.role = action.payload.user.role.name
            
            state.token = action.payload.token
        })
})

export default authReducer