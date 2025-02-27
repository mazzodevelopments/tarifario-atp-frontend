import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

// Define the user type based on your backend response
type User = {
  id: number;
  username: string;
  role: string;
};

// Define the context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    username: string,
    password: string
  ) => Promise<{ success: boolean; error?: string; firstLogin?: boolean }>;
  logout: () => void;
  getToken: () => string | null;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => ({ success: false }),
  logout: () => {},
  getToken: () => null,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Function to parse JWT token
  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  // Check if the token is expired
  const isTokenExpired = (token: string) => {
    const decodedToken = parseJwt(token);
    if (!decodedToken) return true;

    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  };

  // Get token from localStorage
  const getToken = (): string | null => {
    if (typeof window === "undefined") return null;

    const token = localStorage.getItem("token");
    if (!token) return null;

    // Check if token is expired
    if (isTokenExpired(token)) {
      localStorage.removeItem("token");
      return null;
    }

    return token;
  };

  // Login function
  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(
        "https://apitarifario.mazzodevelopments.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.access_token);

        // Parse the token to get user information
        const decodedToken = parseJwt(data.access_token);

        if (decodedToken) {
          setUser({
            id: decodedToken.id,
            username: decodedToken.username,
            role: decodedToken.role,
          });
        }

        return {
          success: true,
          firstLogin: data.firstLogin,
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.message || "Login failed. Please try again.",
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: "An error occurred. Please try again.",
      };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  // Check authentication status on initial load
  useEffect(() => {
    const checkAuth = () => {
      const token = getToken();

      if (token) {
        const decodedToken = parseJwt(token);

        if (decodedToken) {
          setUser({
            id: decodedToken.id,
            username: decodedToken.username,
            role: decodedToken.role,
          });
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Provide the auth context to children components
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
