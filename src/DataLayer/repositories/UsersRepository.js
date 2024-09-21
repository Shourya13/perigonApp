import request from "../../helpers/httpClient";

class UsersRepository {
  getUsers() {
    return request("https://jsonplaceholder.typicode.com/users");
  }
}

const usersRepository = new UsersRepository();

export default usersRepository;
