import * as ActionTypes from './ActionTypes';

export const comments = (state = {
     errMess: null,
    comments:[]
}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      const comment = action.payload;
      comment.id = state.comments.length;
      const comments = state.comments.concat(comment);
      return {...state, errMess: null, comments: comments};

    case ActionTypes.COMMENTS_FAILED:
      return {...state, errMess: action.payload};

    default:
      return state;
  }
};