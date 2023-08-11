import { SpotifyProvider, useSpotify } from "expo-spotify";
import { Button, StyleSheet, Text, View } from "react-native";

const SpotifyLoginButton = () => {
  const { authorize, accessToken } = useSpotify();

  const handleAuthorize = () => authorize("spotify:track:0kAbddk6eKXc4NIpkoSW9J");

  return (
    <View style={styles.container}>
      <Text children={String(accessToken)} />
      <Button title={"Login"} onPress={handleAuthorize} />
    </View>
  );
};

const App = () => {

  return (
    <SpotifyProvider>
      <View style={styles.container}>
        <SpotifyLoginButton />
      </View>
    </SpotifyProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 16,
  },
});

export default App;