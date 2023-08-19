package expo.modules.spotify

import android.content.Intent
import expo.modules.kotlin.AppContext
import android.content.pm.PackageManager

import com.spotify.sdk.android.auth.AuthorizationRequest
import com.spotify.sdk.android.auth.AuthorizationResponse
import com.spotify.sdk.android.auth.AuthorizationClient

class ExpoSpotifyAuth(private val appContext: AppContext) {
    private val clientID: String?
    private val tokenRefreshURL: String?
    private val tokenSwapURL: String?
    private val scheme: String?
    private val callback: String?
    private val scopes: String?

    private val redirectURI: String
        get() = "$scheme://$callback"

    companion object {
        const val REQUEST_CODE = 2137

        @JvmStatic
        fun handleActivityResult(requestCode: Int, resultCode: Int, intent: Intent?): Boolean {
            if (requestCode == REQUEST_CODE) {
                val response = AuthorizationClient.getResponse(resultCode, intent)
                return when (response.type) {
                    AuthorizationResponse.Type.TOKEN -> {
                        // ExpoSpotifyModule.onAccessTokenObtained(response.accessToken)

                        true
                    }

                    AuthorizationResponse.Type.ERROR -> {
                        // ExpoSpotifyModule.onAuthorizationError(response.error)

                        false
                    }

                    else -> {
                        // Handle other cases
                        false
                    }
                }
            }
            return false
        }
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
            AuthorizationRequest.Builder(clientID, AuthorizationResponse.Type.TOKEN, redirectURI)
        builder.setScopes(scopes?.split(" ")?.toTypedArray())
        val request = builder.build()

        AuthorizationClient.openLoginActivity(
            appContext.currentActivity,
            REQUEST_CODE,
            request
        )
    }

}
