import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Platform} from "react-native";

<<<<<<< HEAD
const API_URL = "http://localhost:8000/api";
=======
// Define the API base URL - adjust for your development environment
const API_URL = Platform.OS === 'web' 
  ? "http://localhost:8000/api"  // For web browser
  : "http://192.168.1.166:8000/api";  // For mobile devices
>>>>>>> 8d8e5c73de5b43aa3920fb0a71463f8365c0b6fb

type AuthContextType = {
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNumber?: string
  ) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("auth_token");
        if (storedToken) {
          setToken(storedToken);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error loading token:", error);
      } finally {
        setLoading(false);
      }
    };
    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
<<<<<<< HEAD
    // try {
    //   const response = await fetch(`${API_URL}/auth/login`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email, password }),
    //   });

    //   if (!response.ok) {
    //     console.error("Login failed:", await response.text());
    //     return false;
    //   }

    //   const data = await response.json();
    //   setToken(data.access_token);
    //   setIsAuthenticated(true);
    //   await AsyncStorage.setItem("auth_token", data.access_token);
    //   return true;
    // } catch (error) {
    //   console.error("Login error:", error);
    //   return false;
    // }
    setIsAuthenticated(true);
=======
    try {
      console.log(`Attempting to login at ${API_URL}/auth/login`);
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      // Log full response for debugging
      console.log("Response status:", response.status);
      const responseText = await response.text();
      console.log("Response body:", responseText);
      
      if (!response.ok) {
        console.error("Login failed:", responseText);
        return false;
      }
  
      // Parse the response text as JSON
      const data = JSON.parse(responseText);
      setToken(data.access_token);
      setIsAuthenticated(true);
      await AsyncStorage.setItem("auth_token", data.access_token);
      return true;
    } catch (error) {
      console.error("Login error details:", error);
      return false;
    }
>>>>>>> 8d8e5c73de5b43aa3920fb0a71463f8365c0b6fb
  };

  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNumber?: string
  ) => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          phone_number: phoneNumber || null,
        }),
      });

      if (!response.ok) {
        console.error("Signup failed:", await response.text());
        return false;
      }

      return await login(email, password);
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const logout = async () => {
    setToken(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem("auth_token");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, loading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
