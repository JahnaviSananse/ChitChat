import * as API from "../../api/user";
import * as TYPE from "../types/user";

//user/add_feed
export const addFeed = (request, token) => async (dispatch, store) => {
  try {
    dispatch({ type: TYPE.ADD_FEED_REQUEST });
    const data = await API.addFeed(request, token);
    console.log("ADD FEED RES", data);
    if (data.code === "1") {
      alert(data.message);
      dispatch({
        type: TYPE.ADD_FEED_SUCCESS,
        payload: data,
      });
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log("ADD FEED ERRROR", error);
    dispatch({
      type: TYPE.ADD_FEED_ERROR,
      payload: error,
    });
  }
};

//get feeds
export const getFeed = (request, token) => async (dispatch, store) => {
  try {
    dispatch({ type: TYPE.GET_FEED_REQUEST });
    const data = await API.getFeeds(request, token);
    console.log("FEED RES", data);
    if (data.code === "1") {
      dispatch({
        type: TYPE.GET_FEED_SUCCESS,
        payload: data.data,
      });
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log("FEED ERRROR", error);
    dispatch({
      type: TYPE.GET_FEED_ERROR,
      payload: error,
    });
  }
};

//get recent chat
export const getRecentChat = (token) => async (dispatch, store) => {
  try {
    dispatch({ type: TYPE.GET_RECENT_CHAT_REQUEST });
    const data = await API.getRecentChat(token);
    console.log("RECENT CHAT RES", data);
    if (data.code === "1") {
      dispatch({
        type: TYPE.GET_RECENT_CHAT_SUCCESS,
        payload: data.data,
      });
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log("RECENT CHAT ERRROR", error);
    dispatch({
      type: TYPE.GET_RECENT_CHAT_ERROR,
      payload: error,
    });
  }
};

//get chat
export const getChat = (request, token) => async (dispatch, store) => {
  try {
    dispatch({ type: TYPE.GET_CHAT_REQUEST });
    const data = await API.getChat(request, token);
    console.log("CHAT RES", data);
    if (data.code === "1") {
      dispatch({
        type: TYPE.GET_CHAT_SUCCESS,
        payload: data.data,
      });
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log("CHAT ERRROR", error);
    dispatch({
      type: TYPE.GET_CHAT_ERROR,
      payload: error,
    });
  }
};

//get users
export const getUsers = (token) => async (dispatch, store) => {
  try {
    dispatch({ type: TYPE.GET_USERS_REQUEST });
    const data = await API.getUsers(token);
    console.log("USERs RES", data);
    if (data.code === "1") {
      dispatch({
        type: TYPE.GET_USERS_SUCCESS,
        payload: data.data,
      });
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log("USERs ERRROR", error);
    dispatch({
      type: TYPE.GET_USERS_ERROR,
      payload: error,
    });
  }
};

//save doc / image
export const saveDocument = (file, type, token, feed) => async (
  dispatch,
  store
) => {
  try {
    dispatch({ type: TYPE.SAVE_DOCUMENT_REQUEST });
    const data = await API.saveDocument(file, type, token);
    console.log("Upload RES", data);
    if (data.code === "1") {
      dispatch({
        type: TYPE.SAVE_DOCUMENT_SUCCESS,
        payload: data.data,
      });
      if (feed) {
        dispatch(
          addFeed(
            {
              image: data.data?.image,
            },
            token
          )
        );
        dispatch(clearSaveDocument());
      }
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log("Upload ERRROR", error);
    dispatch({
      type: TYPE.SAVE_DOCUMENT_ERROR,
      payload: error,
    });
  }
};

export const clearSaveDocument = () => (dispatch, store) => {
  try {
    dispatch({ type: TYPE.CLEAR_SAVE_DOCUMENT_REQUEST });
  } catch (error) {
    dispatch({
      type: TYPE.CLEAR_SAVE_DOCUMENT_REQUEST,
      payload: error,
    });
  }
};

//like unlike
export const feedLikeUnlike = (req, token) => async (dispatch, store) => {
  try {
    dispatch({ type: TYPE.FEED_LIKE_UNLIKE_REQUEST });
    const data = await API.feedLikeUnlike(req, token);
    console.log("FEED LIKE UNLIKE RES", data);
    if (data.code === "1") {
      dispatch({
        type: TYPE.FEED_LIKE_UNLIKE_SUCCESS,
        payload: {},
      });
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log("FEED LIKE UNLIKE ERRROR", error);
    dispatch({
      type: TYPE.FEED_LIKE_UNLIKE_ERROR,
      payload: error,
    });
  }
};
