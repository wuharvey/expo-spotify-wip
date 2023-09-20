export interface SpotifyAuthorizationData {
  success: boolean
  token: string | null
  refreshToken?: string | null
  error?: string
}

export type ExpoSpotifyViewProps = {
  name: string
}

export interface SpotifyContext {
  accessToken: string | null
  refreshToken: string | null
  authorize: (playURI?: string) => void
}
