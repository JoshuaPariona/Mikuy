import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppBar from "./src/components/AppBar";

export default function App() {
  return (
    <View style={styles.container}>
      <AppBar/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
