import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoSpotifyViewProps } from './ExpoSpotify.types';

const NativeView: React.ComponentType<ExpoSpotifyViewProps> =
  requireNativeViewManager('ExpoSpotify');

export default function ExpoSpotifyView(props: ExpoSpotifyViewProps) {
  return <NativeView {...props} />;
}
