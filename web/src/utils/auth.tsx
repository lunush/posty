import { createContext, useReducer } from 'react';

export const AuthContext = createContext({
  token: sessionStorage.getItem('postyToken') || '',
  login: (_: string) => {},
  logout: () => {},
});

const reducer = (state: { token: string }, action: any) => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        token: action.token,
      };
    case 'logout':
      return {
        ...state,
        token: '',
      };
    default:
      throw new Error(`You made a horrible mistake again, you ${action.type}`);
  }
};

export const AuthProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, {
    token: sessionStorage.getItem('postyToken') || '',
  });

  const login = (token: string) => {
    sessionStorage.setItem('postyToken', token);
    dispatch({
      type: 'login',
      token,
    });
  };

  const logout = () => {
    sessionStorage.removeItem('postyToken');
    dispatch({
      type: 'logout',
    });
  };

  return (
    <AuthContext.Provider
      value={{ token: state.token, login, logout }}
      {...props}
    />
  );
};
