import { ConfigContext, ExpoConfig } from "@expo/config";

import { ISpotifyConfig } from "../plugin/src/types";

/**
 * Replace the values below with your own Spotify app credentials.
 */
const spotifyConfig: ISpotifyConfig = {
  clientID: '<spotify-client-id>',
  tokenRefreshURL: '<token-refresh-url>',
  tokenSwapURL: '<token-swap-url>',
  scheme: '<spotify-url-scheme>',
  callback: '<spotify-return-route>',
  scopes: [],
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "expo-spotify-example",
  slug: "expo-spotify-example",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "expo.modules.spotify.example",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "expo.modules.spotify.example",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: [["../app.plugin.js", spotifyConfig]],
});
