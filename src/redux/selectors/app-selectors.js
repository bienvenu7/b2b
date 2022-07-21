export const getInitialApp = ( state ) => {
    return state.app.appInitial
}

export const getStatusCode = (state) => {
    return state.app.sendInfo
}

export const getPostErrors = (state) => {
    return state.app.post.errors
}