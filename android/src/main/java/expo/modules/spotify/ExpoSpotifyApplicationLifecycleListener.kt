package expo.modules.spotify

import android.app.Application
import expo.modules.core.interfaces.ApplicationLifecycleListener

class ExpoSpotifyApplicationLifecycleListener : ApplicationLifecycleListener {
    override fun onCreate(application: Application) {
        print(application)
        application.onCreate()
    }
}