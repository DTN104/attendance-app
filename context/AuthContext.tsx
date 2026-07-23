import { createContext, ReactNode, useContext, useState } from 'react';

import { apiRequest } from '@/services/api';

type LoginResponse = {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
};

type AuthContextValue = {
  accessToken: string | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<LoginResponse | null>(null);

  const signIn = async (email: string, password: string) => {
    const result = await apiRequest<LoginResponse>('/auth/login', {
      body: JSON.stringify({ email, password, device: 'attendance-app' }),
      method: 'POST',
    });
    setSession(result);
  };

  const signOut = async () => {
    if (session) {
      await apiRequest('/auth/logout', {
        accessToken: session.accessToken,
        body: JSON.stringify({ refreshToken: session.refreshToken }),
        method: 'POST',
      }).catch(() => undefined);
    }
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken: session?.accessToken ?? null,
        isAuthenticated: Boolean(session),
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used inside AuthProvider');

  return context;
}
