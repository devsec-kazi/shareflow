import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

export type UserRole = 'admin' | 'customer' | 'agent' | 'shop_owner';

export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  verificationStatus: 'pending' | 'approved' | 'rejected';
  walletBalance: number;
  referralCode: string;
  createdAt: string;
}

interface AuthContextType {
  user: AppUser | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  logout: () => Promise<void>;
  loginAsDemo: (demoUser: AppUser) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedDemo = localStorage.getItem('demoUser');
    if (savedDemo) {
      setUser(JSON.parse(savedDemo));
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (fUser) => {
      setFirebaseUser(fUser);
      if (fUser) {
        const userDoc = await getDoc(doc(db, 'users', fUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data() as AppUser);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loginAsDemo = (demoUser: AppUser) => {
    setUser(demoUser);
    localStorage.setItem('demoUser', JSON.stringify(demoUser));
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
    localStorage.removeItem('demoUser');
  };

  return (
    <AuthContext.Provider value={{ user, firebaseUser, loading, logout, loginAsDemo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
