import {
  EventEmitter,
  NativeModulesProxy,
  Subscription,
} from "expo-modules-core";
import * as React from "react";

import { SpotifyAuthorizationData, SpotifyContext } from "./ExpoSpotify.types";
import ExpoSpotifyModule from "./ExpoSpotifyModule";

const emitter = new EventEmitter(
  ExpoSpotifyModule ?? NativeModulesProxy.ExpoSpotify
);

function addAuthListener(
  listener: (data: SpotifyAuthorizationData) => void
): Subscription {
  return emitter.addListener<SpotifyAuthorizationData>(
    ExpoSpotifyModule.AuthEventName,
    listener
  );
}

/**
 * Prompts the user to log in to Spotify and authorize your application.
 * @param playURI
 */
function authorize(playURI?: string) {
  ExpoSpotifyModule.authorize(playURI);
}

const SpotifyAuthContext = React.createContext<SpotifyContext>({
  accessToken: null,
  authorize,
});

const SpotifyProvider: React.FC<React.PropsWithChildren<object>> = ({
  children,
}) => {
  const [token, setToken] = React.useState<string | null>(null);
  React.useEffect(() => {
    const subscription = addAuthListener((data) => {
      setToken(data.token);
      if (data.error) console.error(`Spotify auth error: ${data.error}`);
    });
    return () => subscription.remove();
  }, []);

  return (
    <SpotifyAuthContext.Provider
      value={{ accessToken: token, authorize }}
      children={children}
    />
  );
};

const useSpotify = () => React.useContext(SpotifyAuthContext);

export { SpotifyProvider, useSpotify };
