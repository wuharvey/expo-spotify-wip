import {
  EventEmitter,
  NativeModulesProxy,
  Subscription,
} from "expo-modules-core";
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";

import { SpotifyAuthorizationData } from "./ExpoSpotify.types";
import ExpoSpotifyModule from "./ExpoSpotifyModule";

const emitter = new EventEmitter(
  ExpoSpotifyModule ?? NativeModulesProxy.ExpoSpotify
);

/** Helper hook to log native messages to the console. Remove this in production. */
function addNativeLogger(listener: (message: string) => void): Subscription {
  return emitter.addListener<string>(
    ExpoSpotifyModule.LoggerEventName,
    listener
  );
}
function useSpotifyLogger() {
  useEffect(() => {
    const subscription = addNativeLogger((message) => {
      console.log(message);
    });
    return () => subscription.remove();
  }, []);
}
/** remove end */

function addAuthListener(
  listener: (data: SpotifyAuthorizationData) => void
): Subscription {
  return emitter.addListener<SpotifyAuthorizationData>(
    ExpoSpotifyModule.AuthEventName,
    listener
  );
}

const SpotifyAuthContext = createContext({
  accessToken: null,
  authorize: (playURI?: string) => Promise<void>,
});

const SpotifyProvider: FC<PropsWithChildren<object>> = () => {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const subscription = addAuthListener((data) => {
      setToken(data.token);
      if (data.error) console.error(`Spotify auth error: ${data.error}`);
    });
    return () => subscription.remove();
  }, []);

  async function authorize(playURI?: string): Promise<void> {
    try {
      await ExpoSpotifyModule.authorize(playURI);
    } catch (error) {
      console.error(`Spotify auth error: ${error}`);
    }
  }
  
  return (
    <SpotifyAuthContext.Provider value={{ accessToken: token, authorize }} c />
  )
}

export { useSpotifyAuth, useSpotifyLogger };
