import firebase from "../util/firebase";

const db = firebase.ref("/admins");

class AdminService {

    addAdmin(uid, admin) {
        db.child("/").child(uid).set(admin);
    };

}

export default new AdminService();