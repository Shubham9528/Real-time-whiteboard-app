import { create } from 'zustand';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  type User,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '../config/firebase';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,

  login: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      set({ user: userCredential.user, loading: false });
    } catch (error: any) {
      set({ 
        error: error.message || 'Login failed', 
        loading: false 
      });
      throw error;
    }
  },

  signup: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      set({ user: userCredential.user, loading: false });
    } catch (error: any) {
      set({ 
        error: error.message || 'Signup failed', 
        loading: false 
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ loading: true });
      await signOut(auth);
      set({ user: null, loading: false });
    } catch (error: any) {
      set({ 
        error: error.message || 'Logout failed', 
        loading: false 
      });
    }
  },

  signInWithGoogle: async () => {
    try {
      set({ loading: true, error: null });
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      set({ user: result.user, loading: false });
    } catch (error: any) {
      set({ 
        error: error.message || 'Google sign-in failed', 
        loading: false 
      });
      throw error;
    }
  },

  resetPassword: async (email: string) => {
    try {
      set({ loading: true, error: null });
      await sendPasswordResetEmail(auth, email);
      set({ loading: false });
    } catch (error: any) {
      set({ 
        error: error.message || 'Password reset failed', 
        loading: false 
      });
      throw error;
    }
  },

  initializeAuth: () => {
    set({ loading: true });
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      set({ user, loading: false });
    });
    
    // Return unsubscribe function for cleanup
    return unsubscribe;
  }
}));
