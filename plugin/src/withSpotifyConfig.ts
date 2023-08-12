import {
  AndroidConfig,
  ConfigPlugin,
  withInfoPlist,
  withAndroidManifest,
} from 'expo/config-plugins'

import { ISpotifyConfig } from './types'

const formatAndroidKeys = (string: string) => {
  return 'Spotify' + string.charAt(0).toUpperCase() + string.slice(1)
}

const withSpotifyConfigAndroid: ConfigPlugin<ISpotifyConfig> = (config, spotifyConfig) => {
  return withAndroidManifest(config, (config) => {
    Object.entries(spotifyConfig).forEach(([key, value]) => {
      AndroidConfig.Manifest.addMetaDataItemToMainApplication(
        AndroidConfig.Manifest.getMainApplicationOrThrow(config.modResults),
        formatAndroidKeys(key),
        String(Array.isArray(value) ? value.join(' ') : value),
      )
    })

    return config
  })
}

const withSpotifyConfigIOS: ConfigPlugin<ISpotifyConfig> = (config, spotifyConfig) => {
  return withInfoPlist(config, (config) => {
    Object.entries(spotifyConfig).forEach(([key, value]) => {
      config.modResults[key] = value
    })

    return config
  })
}

export const withSpotifyConfig: ConfigPlugin<ISpotifyConfig> = (config, spotifyConfig) => {
  config = withSpotifyConfigAndroid(config, spotifyConfig)
  config = withSpotifyConfigIOS(config, spotifyConfig)

  return config
}
