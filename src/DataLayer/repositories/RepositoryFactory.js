import UserRepository from "./UsersRepository";

const repositories = {
  user: UserRepository,
};

const repositoryFactory = {
  get: (name) => repositories[name],
};

export default repositoryFactory;
