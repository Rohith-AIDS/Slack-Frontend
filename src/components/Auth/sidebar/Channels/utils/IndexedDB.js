import { ref, push, onValue } from 'firebase/database';
import { database } from '../../../../../server/firebase'; // Adjust path as necessary

const messagesRef = ref(database, 'messages');

export const getMessages = () => {
    return new Promise((resolve, reject) => {
        onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const messages = Object.values(data);
                resolve(messages);
            } else {
                resolve([]);
            }
        }, {
            onlyOnce: true // Fetch data only once
        });
    });
};

export const addMessage = (message) => {
    // Add a unique id to each message
    message.id = Date.now();
    return push(messagesRef, message)
        .then(() => {
            console.log("Message added successfully to Firebase Database");
        })
        .catch((error) => {
            console.error("Error adding message to Firebase Database:", error);
            throw error;
        });
};
