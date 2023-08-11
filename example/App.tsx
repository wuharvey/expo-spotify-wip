import { SpotifyProvider, useSpotify, useSpotifyLogger } from "expo-spotify";
import { Button, StyleSheet, Text, View } from "react-native";

const SpotifyLoginButton = () => {
  const { authorize, accessToken } = useSpotify();

  const handleAuthorize = async () => {
    await authorize("spotify:playlist:17fmq6aWvSgseCXFWtpFF5");
  };

  return (
    <View style={styles.container}>
      <Text children={String(accessToken)} />
      <Button title={"Login"} onPress={handleAuthorize} />
    </View>
  );
};

const App = () => {
  useSpotifyLogger();

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