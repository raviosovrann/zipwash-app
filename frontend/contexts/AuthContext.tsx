import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const API_URL =
  Platform.OS === "web"
    ? "http://localhost:8000"
    : "http://192.168.1.166:8000";

type AuthContextType = {
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string, accountType?: string) => Promise<boolean>;
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNumber?: string
  ) => Promise<boolean>;
  vendorSignup: (
    companyName: string,
    companyEmail: string,
    password: string,
    website?: string,
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

  const login = async (email: string, password: string, accountType: string = "user") => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          password,
          account_type: accountType
        }),
      });

      if (!response.ok) {
        console.error("Login failed:", await response.text());
        return false;
      }

      const data = await response.json();
      setToken(data.access_token);
      setIsAuthenticated(true);
      await AsyncStorage.setItem("auth_token", data.access_token);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
    setIsAuthenticated(true);
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
          account_type: "user",
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

      return await login(email, password, "user");
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const vendorSignup = async (
    companyName: string,
    companyEmail: string,
    password: string,
    website?: string,
    phoneNumber?: string
  ) => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          account_type: "vendor",
          company_name: companyName,
          company_email: companyEmail,
          password,
          website: website || null,
          phone_number: phoneNumber || null,
        }),
      });

      if (!response.ok) {
        console.error("Vendor signup failed:", await response.text());
        return false;
      }

      // Log in as vendor after signup
      return await login(companyEmail, password, "vendor");
    } catch (error) {
      console.error("Vendor signup error:", error);
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
      value={{ isAuthenticated, token, loading, login, signup, vendorSignup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
