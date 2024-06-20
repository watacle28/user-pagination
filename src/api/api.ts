import { USERS_API } from '../constants';

export const getUsersPage = (num: number) => {
  return fetch(`${USERS_API}/${num}/next`).then((response) => response.json());
};
