import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoSpotify.web.ts
// and on native platforms to ExpoSpotify.ts
import ExpoSpotifyModule from './ExpoSpotifyModule';
import ExpoSpotifyView from './ExpoSpotifyView';
import { ChangeEventPayload, ExpoSpotifyViewProps } from './ExpoSpotify.types';

// Get the native constant value.
export const PI = ExpoSpotifyModule.PI;

export function hello(): string {
  return ExpoSpotifyModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoSpotifyModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoSpotifyModule ?? NativeModulesProxy.ExpoSpotify);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoSpotifyView, ExpoSpotifyViewProps, ChangeEventPayload };
