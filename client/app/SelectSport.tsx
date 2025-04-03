import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function SportSelectionScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Sport</Text>
      <Button title="Football" onPress={() => router.push({ pathname: "/calendar", params: { sport: "Football" } })} />
      <Button title="Basketball" onPress={() => router.push({ pathname: "/calendar", params: { sport: "Basketball" } })} />
      <Button title="Tennis" onPress={() => router.push({ pathname: "/calendar", params: { sport: "Tennis" } })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
});
