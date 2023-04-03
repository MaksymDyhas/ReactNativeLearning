import { action, makeAutoObservable } from "mobx";

export type UsersField = {
  id: number,
  name: string,
  phone: string,
}

class Users {
  users: UsersField[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetchUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(action((data) => this.users = data));
  }

  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);
  }

  addUser(name: string, phone: string) {
    this.users = [...this.users, {
      id: this.users.length ? this.users[this.users.length - 1].id + 1 : 1,
      name,
      phone
    }];
  }

  array() {
    return this.users.slice();
  }

}

export default new Users();
