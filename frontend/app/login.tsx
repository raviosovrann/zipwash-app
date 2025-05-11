import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [accountType, setAccountType] = useState("user"); // "user" or "vendor"
  const [email, setEmail] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [vendorPassword, setVendorPassword] = useState("");
  
  const handleAccountTypeChange = (type: "user" | "vendor") => {
    setAccountType(type);
  };

  const handleLogin = async () => {
    let success;
    
    if (accountType === "vendor") {
      if (!companyEmail || !vendorPassword) {
        alert("Please enter your company email and password.");
        return;
      }
      success = await login(companyEmail, vendorPassword, "vendor");
      if (success) {
        await AsyncStorage.setItem("account_type", "vendor");
      }
    } else {
      if (!email || !userPassword) {
        alert("Please enter your email and password.");
        return;
      }
      success = await login(email, userPassword, "user");
      if (success) {
        await AsyncStorage.setItem("account_type", "user");
      }
    }
    
    if (success) {
      if (accountType === 'vendor') {
        router.replace("/vendor_tabs/vendor-home");
      } else {
        router.replace("/user_tabs");
      }
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sign In</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Please sign in to continue</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Account Type</Text>
            <View style={styles.segmentedControl}>
              <TouchableOpacity
                style={[styles.segmentedControlItem, accountType === 'user' && styles.activeSegment]}
                onPress={() => handleAccountTypeChange('user')}
              >
                <Text style={[styles.segmentedControlText, accountType === 'user' && styles.activeSegmentText]}>User</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.segmentedControlItem, accountType === 'vendor' && styles.activeSegment]}
                onPress={() => handleAccountTypeChange('vendor')}
              >
                <Text style={[styles.segmentedControlText, accountType === 'vendor' && styles.activeSegmentText]}>Vendor</Text>
              </TouchableOpacity>
            </View>
          </View>

          {accountType === 'user' && (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="example@email.com"
                  placeholderTextColor="#AAAAAA"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#AAAAAA"
                  secureTextEntry
                  value={userPassword}
                  onChangeText={setUserPassword}
                />
              </View>
            </>
          )}

          {accountType === 'vendor' && (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Company Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="contact@yourbusiness.com"
                  placeholderTextColor="#AAAAAA"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={companyEmail}
                  onChangeText={setCompanyEmail}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#AAAAAA"
                  secureTextEntry
                  value={vendorPassword}
                  onChangeText={setVendorPassword}
                />
              </View>
            </>
          )}

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Pressable
            onPress={handleLogin}
            style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
          >
            <LinearGradient
              colors={["#7C4DFF", "#6E3FFF"]}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </LinearGradient>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Link href="/signup" style={styles.footerLink}>
            Create Account
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#333",
  },
  placeholder: {
    width: 40,
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  welcomeText: {
    fontFamily: "Poppins-Bold",
    fontSize: 26,
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#666",
    marginBottom: 36,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 12,
    padding: 16,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#333",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 32,
  },
  forgotPasswordText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#7C4DFF",
  },
  button: {
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "white",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  footerText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#666",
  },
  footerLink: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#7C4DFF",
    marginLeft: 4,
  },
  segmentedControl: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 12,
    overflow: "hidden",
  },
  segmentedControlItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  segmentedControlText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#333",
  },
  activeSegment: {
    backgroundColor: "#7C4DFF",
  },
  activeSegmentText: {
    color: "white",
  },
});
