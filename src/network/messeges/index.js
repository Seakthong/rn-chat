import firebase from '../../firebase/config';
import {v4 as uuidv4} from 'uuid';

export const senderMessage = async (msg, senderId, receiverId) => {
  try {
    console.log('work', senderId, receiverId);
    return await firebase
      .database()
      .ref('chats/' + senderId)
      .child(receiverId)
      .push({
        data: {
          _id: uuidv4(),
          text: msg,
          createdAt: `${new Date()}`,
          user: {
            _id: senderId, // sender
          },
        },
      });
  } catch (error) {
    return error;
  }
};

export const receiverMessage = async (msg, senderId, receiverId) => {
  try {
    return await firebase
      .database()
      .ref('chats/' + receiverId)
      .child(senderId)
      .push({
        data: {
          _id: uuidv4(),
          text: msg,
          createdAt: `${new Date()}`,
          user: {
            _id: senderId,
          },
        },
      });
  } catch (error) {
    return error;
  }
};

export const createGroup = async (groupId, groupName, groupMembers) => {
  try {
    return await firebase
      .database()
      .ref('groups/' + uuid)
      .push({
        uuid: groupId,
        name: groupName,
        members: groupMembers,
      });
  } catch (error) {
    return error;
  }
};

export const addUserToGroup = async (groupId, userId) => {};

export const botChat = async (uuid, name) => {
  try {
    return await firebase
      .database()
      .ref('bot_groups/' + uuid)
      .push({name: name, created_at: `${new Date()}`});
  } catch (error) {
    return error;
  }
};

export const getBotChat = async () => {
  try {
    return await firebase.database().ref('bot_groups').once('value');
  } catch (error) {
    return error;
  }
};

export const sendChatToBotChat = async (uuid, senderId, msg) => {
  try {
    return await firebase
      .database()
      .ref('bot_groups/' + uuid)
      .child(senderId)
      .push({
        _id: uuidv4(),
        text: msg,
        createdAt: `${new Date()}`,
        user: {_id: senderId},
      });
  } catch (error) {
    return error;
  }
};

export const senderMsg = async (msgValue, currentUserId, guestUserId, img) => {
  try {
    return await firebase
      .database()
      .ref('messeges/' + currentUserId)
      .child(guestUserId)
      .push({
        messege: {
          sender: currentUserId,
          reciever: guestUserId,
          msg: msgValue,
          img: img,
        },
      });
  } catch (error) {
    return error;
  }
};

export const recieverMsg = async (
  msgValue,
  currentUserId,
  guestUserId,
  img,
) => {
  try {
    return await firebase
      .database()
      .ref('messeges/' + guestUserId)
      .child(currentUserId)
      .push({
        messege: {
          sender: currentUserId,
          reciever: guestUserId,
          msg: msgValue,
          img: img,
        },
      });
  } catch (error) {
    return error;
  }
};
