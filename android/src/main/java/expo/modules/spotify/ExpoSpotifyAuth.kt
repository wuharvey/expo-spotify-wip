package expo.modules.spotify

import android.content.pm.PackageManager
import com.spotify.sdk.android.auth.AuthorizationRequest
import com.spotify.sdk.android.auth.AuthorizationResponse
import expo.modules.kotlin.AppContext
import com.spotify.sdk.android.auth.AuthorizationClient

class ExpoSpotifyAuth(private val appContext: AppContext) {
    val clientID: String?
    val tokenRefreshURL: String?
    val tokenSwapURL: String?
    val scheme: String?
    val callback: String?
    val scopes: String?

    private val REDIRECT_URI: String
        get() = "$scheme://$callback"

    private companion object {
        const val REQUEST_CODE = 2137
    }

    init {
        val applicationInfo = appContext.reactContext?.packageManager?.getApplicationInfo(
            appContext.reactContext?.packageName.toString(),
            PackageManager.GET_META_DATA
        )

        clientID = applicationInfo?.metaData?.getString("SpotifyClientID")
        tokenRefreshURL = applicationInfo?.metaData?.getString("SpotifyTokenRefreshURL")
        tokenSwapURL = applicationInfo?.metaData?.getString("SpotifyTokenSwapURL")
        scheme = applicationInfo?.metaData?.getString("SpotifyScheme")
        callback = applicationInfo?.metaData?.getString("SpotifyCallback")
        scopes = applicationInfo?.metaData?.getString("SpotifyScopes")
    }

    public fun initAuth(playURI: String?) {
        val builder =
            AuthorizationRequest.Builder(clientID, AuthorizationResponse.Type.TOKEN, REDIRECT_URI)
        builder.setScopes(scopes?.split(" ")?.toTypedArray())
        val request = builder.build()

        AuthorizationClient.openLoginActivity(
            appContext.currentActivity,
            REQUEST_CODE,
            request
        )
    }
}
