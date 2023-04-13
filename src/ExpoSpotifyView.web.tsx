import * as React from 'react';

import { ExpoSpotifyViewProps } from './ExpoSpotify.types';

export default function ExpoSpotifyView(props: ExpoSpotifyViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
