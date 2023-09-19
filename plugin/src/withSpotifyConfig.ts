import {
  AndroidConfig,
  ConfigPlugin,
  withInfoPlist,
  withAndroidManifest,
} from '@expo/config-plugins'
import { ExpoConfig } from '@expo/config-types'

import { ISpotifyConfig } from './types'

const formatAndroidKeys = (string: string) => {
  return 'Spotify' + string.charAt(0).toUpperCase() + string.slice(1)
}

const withSpotifyConfigAndroid = (
  config: any,
  spotifyConfig: { [s: string]: unknown } | ArrayLike<unknown>,
) => {
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

// @ts-ignore
const withSpotifyConfigIOS: ConfigPlugin<ISpotifyConfig> = (
  config: any,
  spotifyConfig: { [s: string]: unknown } | ArrayLike<unknown>,
) => {
  return withInfoPlist(config, (config) => {
    Object.entries(spotifyConfig).forEach(([key, value]) => {
      // @ts-ignore
      config.modResults[key] = value
    })

    return config
  })
}

export const withSpotifyConfig: ConfigPlugin<ISpotifyConfig> = (
  config: ExpoConfig,
  spotifyConfig: ISpotifyConfig,
) => {
  // @ts-ignore
  config = withSpotifyConfigAndroid(config, spotifyConfig)
  config = withSpotifyConfigIOS(config, spotifyConfig)

  return config
}
