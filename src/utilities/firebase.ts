import * as firebase from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// fill your firebase config data
var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

export const app = firebase.initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export const requestForToken = () => {
  return getToken(messaging, {
    // enter your unique key
    vapidKey: "",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
      } else {
        console.log(
          "No registration token available. Request permission to generate one.",
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });
