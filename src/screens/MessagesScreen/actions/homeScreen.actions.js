import axios from "axios";
import { apiConfig } from "@/config";
import { getUserData } from "../../../selectors/user.selectors";

export const ACTIONS = {
  FETCH_USER_CONVERSATIONS: "FETCH_USER_CONVERSATIONS",
  FETCH_CONVERSATION_MESSAGES: "FETCH_CONVERSATION_MESSAGES",
  PUSH_NEW_MESSAGE: "PUSH_NEW_MESSAGE",
  FETCH_CONVERSATION_INFO: "FETCH_CONVERSATION_INFO",
  GET_PRESIGNED_URL: "GET_PRESIGNED_URL",
  PUSH_IMG_TO_MESSAGE: "PUSH_IMG_TO_MESSAGE",
  CLEAR_CONVERSATION: "CLEAR_CONVERSATIONs",
  SET_CONVERSATION_COLOR: "SET_CONVERSATION_COLOR",
  FETCH_CONVERSATION_PHOTOS: "FETCH_CONVERSATION_PHOTOS"
};

export const fetchConversations = () => (dispatch, getState) => {
  const user = getUserData(getState());

  return dispatch({
    type: ACTIONS.FETCH_USER_CONVERSATIONS,
    payload: axios({
      url: `${apiConfig.ROOT_URL}/api/users/conversations`,
      method: "get",
      headers: { Authorization: user.token }
    })
  });
};

export const clearConversation = () => {
  return {
    type: ACTIONS.CLEAR_CONVERSATION
  };
};

export const fetchConversation = (id, page, pageSize) => (
  dispatch,
  getState
) => {
  const user = getUserData(getState());

  return dispatch({
    type: ACTIONS.FETCH_CONVERSATION_MESSAGES,
    payload: axios({
      url: `${
        apiConfig.ROOT_URL
      }/api/conversations/${id}?page=${page}&&pageSize=${pageSize}`,
      method: "get",
      headers: { Authorization: user.token }
    })
  }).then(res => console.log(res));
};

export const fetchConversationPhotos = (id, page, pageSize) => (
  dispatch,
  getState
) => {
  const user = getUserData(getState());

  return dispatch({
    type: ACTIONS.FETCH_CONVERSATION_PHOTOS,
    payload: axios({
      url: `${
        apiConfig.ROOT_URL
      }/api/conversations/${id}/photos?page=${page}&&pageSize=${pageSize}`,
      method: "get",
      headers: { Authorization: user.token }
    })
  });
};

// export const initialFetchConversation = (id, page, pageSize) => (dispatch, getState) => {
//   const user = getUserData(getState());
//
//   return dispatch({
//     type: ACTIONS.FETCH_CONVERSATION,
//     payload: axios({
//       url: `${apiConfig.ROOT_URL}/api/conversations/${id}?page=${page}&&pageSize=${pageSize}`,
//       method: "get",
//       headers: { Authorization: user.token }
//     })
//   });
// };

export const fetchConversationInfo = id => (dispatch, getState) => {
  const user = getUserData(getState());

  return dispatch({
    type: ACTIONS.FETCH_CONVERSATION_INFO,
    payload: axios({
      url: `${apiConfig.ROOT_URL}/api/conversations/${id}/info`,
      method: "get",
      headers: { Authorization: user.token }
    })
  });
};

export const setConversationColor = (id, color) => (dispatch, getState) => {
  const user = getUserData(getState());

  return dispatch({
    type: ACTIONS.SET_CONVERSATION_COLOR,
    payload: axios({
      url: `${apiConfig.ROOT_URL}/api/conversations/${id}/color`,
      method: "post",
      headers: { Authorization: user.token },
      data: {
        color
      }
    })
  });
};

export const pushNewMessage = msg => {
  return {
    type: ACTIONS.PUSH_NEW_MESSAGE,
    payload: msg
  };
};

export const sendPhoto = file => async (dispatch, getState) => {
  const user = getUserData(getState());

  // console.log(file)

  try {
    const {
      data: { url, key }
    } = await getPresignedUrl(user.token);
    await uploadToS3(url, key, file);
    return Promise.resolve({ key, height: file.height, width: file.width });
  } catch (err) {
    Promise.reject(err);
  }
};

export const sendVideo = file => async (dispatch, getState) => {
  const user = getUserData(getState());

  try {
    const {
      data: { url, key }
    } = await getPresignedUrlForVideo(user.token);
    await uploadToS3(url, key, file);
    return Promise.resolve({ key });
  } catch (err) {
    Promise.reject(err);
  }
};

const getPresignedUrl = token => {
  return axios({
    url: `${apiConfig.ROOT_URL}/api/upload`,
    method: "get",
    headers: { Authorization: token }
  });
};

const getPresignedUrlForVideo = token => {
  return axios({
    url: `${apiConfig.ROOT_URL}/api/upload/video`,
    method: "get",
    headers: { Authorization: token }
  });
};

const uploadToS3 = async (url, key, file) => {
  let uriParts = file.uri.split(".");
  let fileType = uriParts[uriParts.length - 1];

  const photo = {
    uri: file.uri,
    name: key,
    type: `image/${fileType}`
  };

  await imageUploadRequest({ url, key, photo });
};

const imageUploadRequest = data => {
  return new Promise((resolve, reject) => {
    //eslint-disable-next-line
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", data.url);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve();
        } else {
          reject(xhr.status);
        }
      }
    };
    xhr.setRequestHeader("Content-Type", data.photo.type);
    xhr.send(data.photo);
  });
};
