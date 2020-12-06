import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {senderMsg, recieverMsg} from '../../network';
import firebase from '../../firebase/config';

// export default function Chat({ route, navigation }) {
//   const [messages, setMessages] = useState([]);
//   const { params } = route
//   const { name, img, imgText, guestUserId, currentUserId } = params;
//   const [msgValue, setMsgValue] = useState("");

//   useEffect(() => {

//     try {
//       firebase
//         .database()
//         .ref("messeges")
//         .child(currentUserId)
//         .child(guestUserId)
//         .on("value", (dataSnapshot) => {
//           let msgs = [];
//           setMessages([])
//           dataSnapshot.forEach((child) => {
//             console.log(child.val())
//             msgs.push({
//               // _id: child.val().messege.reciever,
//               text: `${child.val().messege.msg}`,
//               user: {
//                 _id: child.val().messege.reciever,
//                 name: 'React Native',
//                 avatar: 'https://placeimg.com/140/140/any',
//               },
//             })
//             // console.log(child.val())
//             // msgs.push({
//             //   sendBy: child.val().messege.sender,
//             //   recievedBy: child.val().messege.reciever,
//             //   msg: child.val().messege.msg,
//             //   img: child.val().messege.img,
//             // });
//           });
//           // console.log(dataSnapshot)
//           // setMesseges(msgs.reverse());
//           setMessages(msgs.reverse())
//         });
//     } catch (error) {
//       alert(error);
//     }
//   }, []);

//   const onSend = (messages = []) => {
//     console.log(messages)
//     // setMsgValue("");
//     // console.log("ON SEND")
//     // if (msgValue) {
//     //   senderMsg(msgValue, currentUserId, guestUserId, "")
//     //     .then(() => {
//     //       console.log("SEND")
//     //     })
//     //     .catch((err) => alert(err));

//     //   // * guest user

//     //   recieverMsg(msgValue, currentUserId, guestUserId, "")
//     //     .then(() => {
//     //       console.log("RECIEVE")
//     //     })
//     //     .catch((err) => alert(err));
//     // }
//   }

//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={messages => onSend(messages)}
//       user={{
//         _id: currentUserId,
//         createdAt: new Date(),
//         user : {
//           _id : currentUserId,
//           name : name
//         }
//       }}
//     />
//   )
// }

import {senderMessage, receiverMessage} from '../../network/messeges';

export default function Chat({route, navigation}) {
  const [messages, setMessages] = useState([]);
  const {params} = route;
  const {name, img, imgText, receiverId, senderId} = params;

  useEffect(() => {
    try {
      firebase
        .database()
        .ref('chats/')
        .child(senderId)
        .child(receiverId)
        .on('value', (dataSnapshot) => {
          console.log('work');
          let msgs = [];
          setMessages([]);
          dataSnapshot.forEach((child) => {
            // console.log(child.val());
            var data = child.val().data;
            console.log(data)
            msgs.push({
              _id: data._id,
              text: data.text,
              createdAt: new Date(data.createdAt),
              user: data.user,
            });
          });

          console.log(msgs)
          setMessages(msgs.reverse())
        });
        
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onSend = useCallback((messages = []) => {
    console.log(messages[0].text)
    console.log('work');
    var msg = messages[0].text
    senderMessage(msg, senderId, receiverId)
      .then(() => {
        console.log('SENDER');
      })
      .catch((error) => console.log(error));
    receiverMessage(msg, senderId, receiverId)
      .then(() => {
        console.log("RECEIVER")
      })
    //   .catch((error) => console.log(error));
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: senderId,
      }}
    />
  );
}
