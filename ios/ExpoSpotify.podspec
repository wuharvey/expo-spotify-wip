require 'json'

package = JSON.parse(File.read(File.join(__dir__, '..', 'package.json')))

Pod::Spec.new do |s|
  s.name           = 'ExpoSpotify'
  s.version        = package['version']
  s.summary        = package['description']
  s.description    = package['description']
  s.license        = package['license']
  s.author         = package['author']
  s.homepage       = package['homepage']
  s.platform       = :ios, '13.0'
  s.swift_version  = '5.4'
  s.source         = { git: 'https://github.com/kvbalib/expo-spotify' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'

  # Swift/Objective-C compatibility
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
    'SWIFT_COMPILATION_MODE' => 'wholemodule',
#     'HEADER_SEARCH_PATHS' => '$(SDKROOT)/ios/SpotifyiOS.xcframework/**/SpotifyiOS.framework/Headers',
#     'PUBLIC_HEADERS_FOLDER_PATH' => '$(SDKROOT)/SpotifyiOS.xcframework/**/Headers',
#     'OTHER_LDFLAGS' => '-framework SpotifyiOS',
#     'SWIFT_INCLUDE_PATHS' => '$(PODS_ROOT)/ExpoSpotify/**/SpotifyiOS.framework/Headers',
#     'SWIFT_INCLUDE_PATHS' => '$(SDKROOT)/SpotifyiOS.xcframework/**/*',
  }

  s.preserve_paths = "ios/SpotifyiOS.xcframework/**/*"
  s.vendored_frameworks = 'ios/SpotifyiOS.xcframework'
  s.source_files = "**/*.{h,m,swift}", 'ios/SpotifyiOS.xcframework/**/Headers/*.{h,m}'
  s.header_mappings_dir = '$(SDKROOT)/ios/SpotifyiOS.xcframework/**/Modules'
  s.public_header_files = 'ios/SpotifyiOS.xcframework/**/Headers/*.{h,m}'
  s.frameworks = 'UIKit'
end
