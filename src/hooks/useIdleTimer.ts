import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

export function useIdleTimer(timeoutInMinutes: number = 1) {
  const { logout, firebaseUser } = useAuth();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!firebaseUser) return;

    timerRef.current = setTimeout(() => {
      console.log('User inactive, logging out...');
      logout();
    }, timeoutInMinutes * 60 * 1000);
  };

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    if (firebaseUser) {
      events.forEach(event => window.addEventListener(event, resetTimer));
      resetTimer();
    }

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [firebaseUser]);
}
