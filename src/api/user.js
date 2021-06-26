import { Platform } from "react-native";
import request from "./tokenRequest";

//like/unlike event
export async function likeUnlikeEvent(req) {
  return request.authCall(
    {
      url: "user/event_like_unlike",
      method: "POST",
      data: req,
    },
    token
  );
}

//list feeds
export async function getFeeds(req, token) {
  return request.authCall(
    {
      url: "user/feed_list",
      method: "post",
      data: req,
    },
    token
  );
}

//add feed
export async function addFeed(req, token) {
  return request.authCall(
    {
      url: "user/add_feed",
      method: "post",
      data: req,
    },
    token
  );
}

//list recent chat
export async function getRecentChat(token) {
  return request.authCall(
    {
      url: "chat/recent_chat_list",
      method: "post",
      data: {},
    },
    token
  );
}

//get chat
export async function getChat(req, token) {
  return request.authCall(
    {
      url: "chat/chat_list",
      method: "post",
      data: req,
    },
    token
  );
}

//get users
export async function getUsers(token) {
  return request.authCall(
    {
      url: "user/user_list",
      method: "post",
      data: {},
    },
    token
  );
}

//
//feed Like Unlike
export async function feedLikeUnlike(req, token) {
  return request.authCall(
    {
      url: "user/feed_like",
      method: "post",
      data: req,
    },
    token
  );
}

//save doc/images
export async function saveDocument(file, type, token) {
  // console.log("Before", file);
  let formData = new FormData();
  let tempFile = {
    name: file.filename,
    type: file.mime,
    uri:
      Platform.OS === "ios"
        ? file.sourceURL.replace("file://", "")
        : file.sourceURL,
  };
  formData.append("uploadall", tempFile);

  // console.log("D Request", formData);

  return request.authCall(
    {
      url: "user/uploadall/" + type,
      method: "post",
      data: formData,
    },
    token
  );
}
