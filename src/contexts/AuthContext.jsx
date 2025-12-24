import { createContext, use, useCallback, useMemo, useReducer } from 'react';

const AuthContext = createContext();

const FAKE_USER = {
  avatar: 'https://i.pravatar.cc/100?u=zz',
  email: 'jack@example.com',
  name: 'Jack',
  password: 'qwerty',
};

const initialState = {
  isAuthenticated: false,
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case 'logout':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      throw new Error('Unknown action type');
  }
}

function AuthProvider({ children }) {
  const [{ isAuthenticated, user }, dispatch] = useReducer(reducer, initialState);

  const login = useCallback((email, password) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ payload: FAKE_USER, type: 'login' });
    }
  }, []);

  const logout = useCallback(() => dispatch({ type: 'logout' }), []);

  const value = useMemo(() => ({ isAuthenticated, login, logout, user }), [isAuthenticated, login, logout, user]);
  return <AuthContext value={value}>{children}</AuthContext>;
}

function useAuth() {
  const context = use(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
