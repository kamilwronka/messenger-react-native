import { isEmpty, isNil } from 'lodash';

export const prepareAvatar = name => {
  return !isEmpty(name) ? name[0] : '';
};

export const prepareLastMessage = lastMessage => {
  if (!isNil(lastMessage)) {
    switch (lastMessage.messageType) {
      case 'text':
      case 'emoji':
        return lastMessage.messageContent;
      case 'photo':
        return 'Wysłano zdjęcie';
      default:
        return '';
    }
  } else {
    return null;
  }
};
