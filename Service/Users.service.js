import '../InitialFirebase';
import firebase from 'firebase';
import '@firebase/firestore';

export default class UserService {
    db = firebase.firestore();

    
    async getUsers(){
        let users = [];
        await this.getUserFirebase().then(value => users = value);
        return users;
    }

    async getUserFirebase(){
        let users_return = [];
        let getUsers_promise = new Promise((resolve, reject)=>{
            let users = [];
            this.db.collection('users').get().then(q => {
                q.forEach((value)=>{
                    users.push(value.data())
                })
                resolve(users);
            })
        })
        await getUsers_promise.then(users => users_return = users);
        return users_return;
    }

    async addUser(user){
        let addReturn;
        await this.addUserFirebase(user).then(value => addReturn = value);
        return addReturn;
    }

    async addUserFirebase(user){
        let addUser_promise = new Promise((resolve, reject)=>{
            this.db.collection('users').doc((user.user_id - 1).toString()).set(user).then(value => resolve(value));
        })
        let addReturn;
        await addUser_promise().then(value => addReturn = value);
        return addReturn;
    }
}