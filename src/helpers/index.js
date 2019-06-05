import { isEmpty, isNil } from "lodash";

export const prepareAvatar = name => {
  return !isEmpty(name) ? name[0] : "";
};

export const prepareLastMessage = lastMessage => {
  if (!isNil(lastMessage)) {
    switch (lastMessage.messageType) {
      case "text":
      case "emoji":
        return lastMessage.messageContent;
      case "photo":
        return "Sent photo";
      default:
        return "";
    }
  } else {
    return null;
  }
};

export const prepareLastMessageDate = lastMessage => {
  if (!isNil(lastMessage)) {
    const messageDate = new Date(lastMessage.date);
    const hour = messageDate.getHours();
    const minute = messageDate.getMinutes();

    return `${hour}:${minute}`;
  }
};
