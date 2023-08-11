import { ConfigPlugin } from "@expo/config-plugins";

import { withSpotifyConfig } from "./ios/withSpotifyConfig";
import { withSpotifyQueryScheme } from "./ios/withSpotifyQueryScheme";
import { withSpotifyURLScheme } from "./ios/withSpotifyURLScheme";
import { ISpotifyConfig } from "./types";

const withSpotifyRemote: ConfigPlugin<ISpotifyConfig> = (config, props) => {
  config = withSpotifyConfig(config, props);
  config = withSpotifyQueryScheme(config, props);
  config = withSpotifyURLScheme(config, props);

  return config;
};

export default withSpotifyRemote;
