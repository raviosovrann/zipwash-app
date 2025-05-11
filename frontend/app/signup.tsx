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
  Alert,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signup() {
  const { login, signup, vendorSignup } = useAuth();
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [vendorPassword, setVendorPassword] = useState("");

  const [accountType, setAccountType] = useState("user"); // "user" or "vendor"
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Form validation states
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    companyName: '',
    companyEmail: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      fullName: '',
      email: '',
      password: '',
      companyName: '',
      companyEmail: '',
      vendorPassword: '',
    };

    if (accountType === 'user') {
      // User validation
      if (!fullName) {
        newErrors.fullName = 'Full name is required';
        isValid = false;
      }

      if (!email) {
        newErrors.email = 'Email is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Email is invalid';
        isValid = false;
      }
      
      if (!userPassword) {
        newErrors.password = 'Password is required';
        isValid = false;
      } else if (userPassword.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
        isValid = false;
      }
    } else {
      // Vendor validation - only validate vendor fields
      if (!companyName) {
        newErrors.companyName = 'Company name is required';
        isValid = false;
      }
      
      if (!companyEmail) {
        newErrors.companyEmail = 'Company email is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(companyEmail)) {
        newErrors.companyEmail = 'Company email is invalid';
        isValid = false;
      }
      
      if (!vendorPassword) {
        newErrors.vendorPassword = 'Password is required';
        isValid = false;
      } else if (vendorPassword.length < 6) {
        newErrors.vendorPassword = 'Password must be at least 6 characters';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Update the handleSignup function
  const handleSignup = async () => {
    if (!validateForm()) {
      // Form validation failed
      return;
    }

    try {
      let success = false;

      if (accountType === 'user') {
        // Handle user signup
        const names = fullName.split(' ');
        const firstName = names[0] || '';
        const lastName = names.slice(1).join(' ') || '';

        success = await signup(
          firstName,
          lastName,
          email,
          userPassword,
          phoneNumber
        );
      } else {
        // Handle vendor signup
        console.log("Attempting vendor signup with:", {
          companyName,
          companyEmail,
          vendorPassword,
          website,
          phoneNumber
        });
        
        success = await vendorSignup(
          companyName,
          companyEmail,
          vendorPassword,
          website,
          phoneNumber
        );
      }

      if (success) {
        // Navigate to the appropriate screen based on account type
        if (accountType === 'vendor') {
          await AsyncStorage.setItem("account_type", "vendor");
          router.replace("/vendor_tabs/vendor-home");
        } else {
          await AsyncStorage.setItem("account_type", "user");
          router.replace("/user_tabs");
        }
      } else {
        Alert.alert('Signup Failed', accountType === 'user' 
          ? 'Failed to create user account.' 
          : 'Failed to create vendor account.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
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
          <Text style={styles.headerTitle}>Create Account</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>Get Started!</Text>
          <Text style={styles.subtitle}>Create an account to continue</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Account Type</Text>
            <View style={styles.segmentedControl}>
              <TouchableOpacity
                style={[styles.segmentedControlItem, accountType === 'user' && styles.activeSegment]}
                onPress={() => setAccountType('user')}
              >
                <Text style={[styles.segmentedControlText, accountType === 'user' && styles.activeSegmentText]}>User</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.segmentedControlItem, accountType === 'vendor' && styles.activeSegment]}
                onPress={() => setAccountType('vendor')}
              >
                <Text style={[styles.segmentedControlText, accountType === 'vendor' && styles.activeSegmentText]}>Vendor</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* User signup form */}
          {accountType === 'user' && (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="John Doe"
                  placeholderTextColor="#AAAAAA"
                  value={fullName}
                  onChangeText={setFullName}
                />
                {errors.fullName ? <Text style={styles.errorText}>{errors.fullName}</Text> : null}
              </View>

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
                {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Create a password"
                  placeholderTextColor="#AAAAAA"
                  secureTextEntry
                  value={userPassword}
                  onChangeText={setUserPassword}
                />
                {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
              </View>
            </>
          )}

          {/* Vendor signup form */}
          {accountType === 'vendor' && (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Company Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Your Company Name"
                  placeholderTextColor="#AAAAAA"
                  value={companyName}
                  onChangeText={setCompanyName}
                />
                {errors.companyName ? <Text style={styles.errorText}>{errors.companyName}</Text> : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Website</Text>
                <TextInput
                  style={styles.input}
                  placeholder="https://yourbusiness.com"
                  placeholderTextColor="#AAAAAA"
                  value={website}
                  onChangeText={setWebsite}
                />
              </View>

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
                {errors.companyEmail ? <Text style={styles.errorText}>{errors.companyEmail}</Text> : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Create a password"
                  placeholderTextColor="#AAAAAA"
                  secureTextEntry
                  value={vendorPassword}
                  onChangeText={setVendorPassword}
                />
                {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
              </View>
            </>
          )}

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By signing up, you agree to our{" "}
              <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </View>

          <Pressable
            onPress={handleSignup}
            style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
          >
            <LinearGradient
              colors={["#7C4DFF", "#6E3FFF"]}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Create Account</Text>
            </LinearGradient>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Link href="/login" style={styles.footerLink}>
            Sign In
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
  termsContainer: {
    marginBottom: 30,
  },
  termsText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#666",
    lineHeight: 18,
  },
  termsLink: {
    fontFamily: "Poppins-Medium",
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    fontFamily: "Poppins-Regular",
  },
});
