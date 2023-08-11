import { ConfigPlugin, withInfoPlist } from "expo/config-plugins";

import { ISpotifyConfig } from "../types";

export const withSpotifyConfig: ConfigPlugin<ISpotifyConfig> = (
  config,
  spotifyConfig
) => {
  return withInfoPlist(config, (config) => {
    config.modResults["SpotifyClientID"] = spotifyConfig.clientID;
    config.modResults["SpotifyTokenRefreshURL"] = spotifyConfig.tokenRefreshURL;
    config.modResults["SpotifyTokenSwapURL"] = spotifyConfig.tokenSwapURL;
    config.modResults["SpotifyScheme"] = spotifyConfig.scheme;
    config.modResults["SpotifyCallback"] = spotifyConfig.callback;
    config.modResults["SpotifyScopes"] = spotifyConfig.scopes;

    return config;
  });
};
