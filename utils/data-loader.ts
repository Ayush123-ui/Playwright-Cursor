import users from '../test-data/users.json';
import { LoginCredentials } from './types';

interface UserTestData {
  standardUser: LoginCredentials;
}

export function getUserTestData(): UserTestData {
  return users as UserTestData;
}
