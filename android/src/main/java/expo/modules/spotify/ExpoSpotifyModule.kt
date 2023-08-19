package expo.modules.spotify

import android.content.IntentFilter
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

const val SPOTIFY_AUTHORIZATION_EVENT_NAME = "onSpotifyAuthorization"

class ExpoSpotifyModule : Module() {
    // Each module class must implement the definition function. The definition consists of components
    // that describes the module's functionality and behavior.
    // See https://docs.expo.dev/modules/module-api for more details about available components.
    override fun definition() = ModuleDefinition {
        Name("ExpoSpotify")

        OnCreate {}

        Constants("AuthEventName" to SPOTIFY_AUTHORIZATION_EVENT_NAME)

        Events(SPOTIFY_AUTHORIZATION_EVENT_NAME)

        OnStartObserving {}

        OnStopObserving {}

        Function("authorize") { playURI: String? ->
            ExpoSpotifyAuth(appContext).initAuth(playURI)
        }

        // Enables the module to be used as a native view. Definition components that are accepted as part of
        // the view definition: Prop, Events.
        View(ExpoSpotifyView::class) {
            // Defines a setter for the `name` prop.
            Prop("name") { view: ExpoSpotifyView, prop: String ->
                println(prop)
            }
        }
    }

    public fun onAccessTokenObtained(token: String) {
        this@ExpoSpotifyModule.sendEvent(
            SPOTIFY_AUTHORIZATION_EVENT_NAME,
            mapOf("success" to true, "token" to token)
        )
    }

    public fun onSignOut() {
        this@ExpoSpotifyModule.sendEvent(
            SPOTIFY_AUTHORIZATION_EVENT_NAME,
            mapOf("success" to true, "token" to null)
        )
    }

    public fun onAuthorizationError(errorDescription: String) {
        this@ExpoSpotifyModule.sendEvent(
            SPOTIFY_AUTHORIZATION_EVENT_NAME,
            mapOf("success" to false, "error" to errorDescription, "token" to null)
        )
    }
}
