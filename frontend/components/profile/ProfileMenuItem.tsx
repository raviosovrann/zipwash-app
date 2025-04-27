import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "@/constants/Theme";
import { ChevronRight } from "lucide-react-native";
import { LucideIcon } from "lucide-react-native";

interface ProfileMenuItemProps {
  icon: LucideIcon;
  title: string;
  onPress: () => void;
  textColor?: string;
}

export default function ProfileMenuItem({
  icon: Icon,
  title,
  onPress,
  textColor,
}: ProfileMenuItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon size={20} color={textColor || theme.colors.gray[700]} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={[styles.title, textColor && { color: textColor }]}>
          {title}
        </Text>
        <ChevronRight size={20} color={theme.colors.gray[400]} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    marginBottom: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", // Updated shadow style
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.gray[100],
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: theme.colors.gray[800],
  },
});
