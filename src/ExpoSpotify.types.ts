export interface SpotifyAuthorizationData {
  success: boolean;
  token: string | null;
  error?: string;
}

export type ExpoSpotifyViewProps = {
  name: string;
};

export interface SpotifyContext {
  accessToken: string | null;
  authorize: (playURI?: string) => void;
}
