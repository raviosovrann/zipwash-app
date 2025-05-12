import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function IntroScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Decorative elements */}
        <View style={[styles.decorCircle, styles.topLeftCircle]}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/6873076/pexels-photo-6873076.jpeg?auto=compress&cs=tinysrgb&w=800",
            }}
            style={styles.smallImage}
          />
        </View>
        <View style={[styles.decorCircle, styles.topRightCircle]}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/5765283/pexels-photo-5765283.jpeg?auto=compress&cs=tinysrgb&w=800",
            }}
            style={styles.smallImage}
          />
        </View>

        {/* Main image */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/6870313/pexels-photo-6870313.jpeg?auto=compress&cs=tinysrgb&w=800",
            }}
            style={styles.mainImage}
            resizeMode="cover"
          />
        </View>

        {/* Text content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Your Journey to a{" "}
            <Text style={styles.highlightedText}>Gleaming Car</Text> Begins
            Here!
          </Text>

          <Text style={styles.subtitle}>
            Professional car washing services at your fingertips. Book,
            schedule, and enjoy spotless results.
          </Text>
        </View>

        {/* CTA Button */}
        <Pressable
          onPress={() => router.push("/signup")}
          style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
        >
          <LinearGradient colors={["#7C4DFF", "#6E3FFF"]} style={styles.button}>
            <Text style={styles.buttonText}>Let's Get Started</Text>
          </LinearGradient>
        </Pressable>

        {/* Sign In Link */}
        <View style={styles.signInContainer}>
          <Text style={styles.accountText}>Already have an account? </Text>
          <Link href="/login" style={styles.signInLink}>
            Sign In
          </Link>
        </View>
      </View>

      {/* Bottom indicator */}
      <View style={styles.indicatorContainer}>
        <View style={styles.indicator} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  authLinksContainer: {
    alignItems: "center",
    marginTop: 8,
  },
  signInContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  content: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  decorCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: "hidden",
    position: "absolute",
  },
  topLeftCircle: {
    top: 40,
    left: 20,
  },
  topRightCircle: {
    top: 80,
    right: 20,
  },
  smallImage: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 1.5,
    borderColor: "#7C4DFF20",
    overflow: "hidden",
    marginBottom: 32,
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 34,
  },
  highlightedText: {
    color: "#7C4DFF",
    fontFamily: "Poppins-Bold",
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    textAlign: "center",
    color: "#666666",
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  button: {
    width: 280,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  buttonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "white",
  },
  accountText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#333",
  },
  signInLink: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#7C4DFF",
  },
  indicatorContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  indicator: {
    width: 40,
    height: 5,
    backgroundColor: "#DDDDDD",
    borderRadius: 2.5,
  },
});
