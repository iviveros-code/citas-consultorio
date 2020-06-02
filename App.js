import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Citas from "./src/components/Citas";

export default function App() {
  return (
    <View style={styles.container}>
      <Citas />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0e9aa7",
    flex: 1,
  },
});
