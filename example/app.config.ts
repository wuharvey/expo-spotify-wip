import { ConfigContext, ExpoConfig } from '@expo/config'

import { ISpotifyConfig } from '../plugin/src/types'

/**
 * Replace the values below with your own Spotify app credentials.
 */
export const spotifyConfig: ISpotifyConfig = {
  clientID: '870b96bece98412e9b98a653bff52516',
  tokenRefreshURL:
    'https://user-resources-main.develop.goingapp.eu/api/v1/user/connect/spotify/refresh',
  tokenSwapURL: 'https://user-resources-main.develop.goingapp.eu/api/v1/user/connect/spotify/swap',
  scheme: 'goingapp-spotify',
  callback: 'moje-konto',
  scopes: [
    'user-read-email',
    'user-read-private',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-top-read',
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-modify-private',
    'user-library-read',
    'user-library-modify',
    'user-follow-read',
    'user-follow-modify',
  ],
}

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'expo-spotify-example',
  slug: 'expo-spotify-example',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'expo.modules.spotify.example',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'expo.modules.spotify.example',
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: [['../app.plugin.js', spotifyConfig]],
})
