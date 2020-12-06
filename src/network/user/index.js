import firebase from '../../firebase/config';

export const AddUser = async (name, email, uid, profileImg) => {
  console.log('work');
  try {
    return await firebase
      .database()
      .ref('users/' + uid)
      .set({
        name: name,
        email: email,
        uuid: uid,
        profileImg: profileImg,
      });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const UpdateUser = async (uuid, imgSource) => {
  try {
    return await firebase
      .database()
      .ref('users/' + uuid)
      .update({
        profileImg: imgSource,
      });
  } catch (error) {
    return error;
  }
};

export const addGroupToUser = async (uuid, groupId) => {
  try {
    return await firebase
      .database()
      .ref('users/' + uuid)
      .child('groups')
      .push({
        groupId: groupId,
      });
  } catch (error) {
    return error;
  }
};

export const getUser = async (uuid) => {
  console.log(uuid);
  try {
    return await firebase
      .database()
      .ref('users/' + uuid)
      .once('value');
  } catch (error) {
    return error;
  }
};

export const getUsers = async () => {
  try {
    return await firebase.database().ref('users/').once('value');
  } catch (error) {
    return error;
  }
};
