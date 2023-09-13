import { ExpoConfig } from '@expo/config-types';
import { ConfigPlugin, withMainActivity } from '@expo/config-plugins';

const spotifyAuthImports = [
  'import android.content.Intent;',
  'import expo.modules.spotify.ExpoSpotifyAuth;'
];

const withImportsAdded: ConfigPlugin = (config: any) => {
  return withMainActivity(config, (config) => {
    if (config.modResults.contents.includes(spotifyAuthImports[0]) || config.modResults.contents.includes(spotifyAuthImports[1])) {
      // Don't add the imports if they already exist
      return config;
    }

    const importRegex = /^(import .*)\n/m;
    const match = config.modResults.contents.match(importRegex);
    const packageDeclarationEnd = config.modResults.contents.indexOf(';') + 1;
    const insertionPoint = match && match.index !== undefined ? match.index : packageDeclarationEnd;

    config.modResults.contents = [
      config.modResults.contents.slice(0, insertionPoint),
      ...spotifyAuthImports,
      config.modResults.contents.slice(insertionPoint)
    ].join('\n');

    return config;
  });
};

const activityResultHandlerCode = `
  @Override
  public void onActivityResult(int requestCode, int resultCode, Intent intent) {
    super.onActivityResult(requestCode, resultCode, intent);
    ExpoSpotifyAuth.handleActivityResult(requestCode, resultCode, intent);
  }

  @Override`;

const withActivityResultHandler: ConfigPlugin = (config: any) => {
  return withMainActivity(config, (config) => {
    if (config.modResults.language === 'java') {
      const anchorPattern = /@Override/; // Find the first occurrence of "@Override"
      if (!config.modResults.contents.includes("expo.modules.spotify.TOKEN_RECEIVED")) {
        // Insert the Spotify auth code before the first occurrence of "@Override"
        config.modResults.contents = config.modResults.contents.replace(
          anchorPattern,
          activityResultHandlerCode
        );
      }
    }
    return config;
  });
};

export const withMainActivityMod: ConfigPlugin = (config: ExpoConfig) => {
  config = withImportsAdded(config);
  config = withActivityResultHandler(config);

  return config;
}
