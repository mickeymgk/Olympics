import { db } from "../util/firebase";

// export function readOrders() {
//     let orders = [];
//     db.ref("orders").on("value", snapshot => {
//         snapshot.forEach(snap => {
//             orders.push(snap.val())
//         });
//         return orders;
//     });
// }

// export function writeChats(message) {
//   return db.ref("chats").push({
//     content: message.content,
//     timestamp: message.timestamp,
//     uid: message.uid
//   });
// }

// export function writeTask(order, staffId) {
//   return db.ref("staffs").child.push({
//     content: message.content,
//     timestamp: message.timestamp,
//     uid: message.uid
//   });
// }
