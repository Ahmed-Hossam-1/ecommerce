import Cookies from 'universal-cookie';

export const getJWT = (): string => {
  const cookies = new Cookies();
  return cookies.get('token') || '';
};

export const getRole = (): string => {
  const cookies = new Cookies();
  return cookies.get('role') || '';
};

export const isLoggedIn = (): boolean => {
  const jwt = getJWT();
  return !!jwt;
};

export const logout = (): void => {
  const cookies = new Cookies();
  cookies.remove('token');
};
