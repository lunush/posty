import { createContext, useReducer } from 'react';

export const AuthContext = createContext({
  token: '',
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
  const [state, dispatch] = useReducer(reducer, { token: '' });

  const login = (token: string) => {
    dispatch({
      type: 'login',
      token,
    });
  };

  const logout = () => {
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
