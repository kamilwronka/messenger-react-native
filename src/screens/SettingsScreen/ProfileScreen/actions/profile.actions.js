import axios from "axios";
import { getUserData } from "../../../../selectors/user.selectors";
import apiConfig from "../../../../config/api_config";

export const ACTIONS = {
  SET_USER_AVATAR: "SET_USER_AVATAR",
  GET_PRESIGNED_URL: "GET_PRESIGNED_URL"
};

export const setUserAvatar = file => async (dispatch, getState) => {
  const user = getUserData(getState());

  try {
    const {
      data: { url, key }
    } = await getPresignedUrl(user.token);
    await uploadToS3(url, key, file);
    return pushImgUrl(key, user.token, dispatch);
  } catch (err) {}
};

const pushImgUrl = (url, token, dispatch) => {
  return dispatch({
    type: ACTIONS.SET_USER_AVATAR,
    payload: axios({
      url: `${apiConfig.ROOT_URL}/api/users/avatar`,
      method: "post",
      data: { url },
      headers: { Authorization: token }
    })
  });
};

const getPresignedUrl = token => {
  return axios({
    url: `${apiConfig.ROOT_URL}/api/upload`,
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
