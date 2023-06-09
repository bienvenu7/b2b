import { createAction, createReducer } from '@reduxjs/toolkit';

export const initializedSuccess = createAction('INITIALIZED_SUCCESS');
export const setStatusCode = createAction('SET_INFO');
export const setErrors = createAction('SET_ERRORS');

const initialState = {
  appInitial: false,
  sendInfo: null,
  post: {
    status: null,
    message: null,
    errors: {},
  },
};

export const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('INITIALIZED_SUCCESS', (state = initialState) => {
      state.appInitial = true;
    })
    .addCase('SET_INFO', (state = initialState, action) => {
      state.sendInfo = action.payload;
    })
    .addCase('SET_ERRORS', (state = initialState, action) => {
      if (action.payload != null) {
        const { page } = action.payload;
        state.post.errors = page === 'signin' && {
          ...state.post.errors,
          signin: action.payload.error,
        };
        switch (page) {
          case 'signin':
            state.post.errors = {
              ...state.post.errors,
              signin: action.payload.error,
            };
            break;
          case 'authrequest':
            state.post.errors = {
              ...state.post.errors,
              authrequest: action.payload.error,
            };
            break;
          case 'signup':
            state.post.errors = {
              ...state.post.errors,
              signup: action.payload.error,
            };
            break;
          case 'forgot':
            state.post.errors = {
              ...state.post.errors,
              forgot: action.payload.error,
            };
            break;
          case 'upload-photos':
            // console.log({ ...state.post.errors });
            state.post.errors = {
              ...state.post.errors,
              uploadPhotos: [action.payload.error],
            };
          default:
            break;
        }
      } else {
        state.post.errors = {};
      }
    });
});
