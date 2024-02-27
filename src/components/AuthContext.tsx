// AuthContext.tsx
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { auth } from "@/lib/firebase";
import { User } from "firebase/auth"; // Import the User type from the firebase/auth module

// Define the shape of the context
export type AuthContextType = {
  currentUser: User | null; // Fix the type declaration for currentUser,
};

// Create AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Define the props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// Create AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
