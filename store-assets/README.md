# Invoingo brand and store assets

The first supplied logo is the approved website/mobile wordmark. The second supplied artwork supplies the sparkle identity and dark splash lockup. `brand/approved-original.png` and `approved-splash-original.png` preserve both originals. The full-bleed sparkle icon is an AI-assisted production adaptation; the web wordmark and dark splash lettering are cropped from the supplied artwork, not redrawn.

## Files

- `ios/AppIcon.appiconset/icon-1024.png`: opaque, square App Store icon. `Contents.json` selects the universal 1024 master; the other PNGs are optional compatibility exports.
- `android/play-store-icon-512.png`: Google Play listing icon, without baked platform corner masks.
- `android/feature-graphic-1024x500.png`: clean wordmark feature graphic.
- `android/adaptive-foreground-1024.png`, `adaptive-background-1024.png`, `adaptive-monochrome-1024.png`: native adaptive layers. The sparkle stays inside the central safe region.
- `android/mipmap-*`: five legacy launcher densities.
- `ios/splash-*.png`, `android/splash-*.png`: fourteen portrait reference PNGs, light and dark, across seven phone/tablet dimensions.
- `subscriptions/product-catalog.json`, `products.csv`: copyable store setup specifications. They are not store API import payloads.
- `MONETIZATION.md`: pricing research, store/RevenueCat mapping, and launch prerequisites.

Splash PNGs are visual references. Native iOS launch screens and Android system splash behavior are configured with `expo-splash-screen` in `expo-preview/app.json`. Android 12+ uses an icon/background; uploading a full-screen PNG to Play Console does not configure launch behavior. Dark is the default native splash treatment. Light files are alternatives, not an implemented runtime appearance switch. Expo Go does not reproduce the final release splash; test a signed release build.

The pack does not include screenshots of every app feature, a signed binary, or activated subscriptions. Do not submit the full-screen splash artwork as screenshots of app functionality.

## Production method

The built-in image generation tool was used to isolate the first design's arrow and adapt the second design's sparkle tile into a full-square icon. Prompt intent: preserve the supplied curved four-point dark sparkle and layered lime/emerald gradient; extend the background to square corners; omit text, external glow, borders and pre-rounded platform masks. The exact prompts are in `brand/GENERATION-PROMPTS.md`.

All platform resizing and packaging are deterministic exports in `tools/prepare-brand-assets.py`. Supplied lettering remains unchanged. Source masters are inside `brand/` so future exports do not depend on files outside the project.

Official references checked October 15, 2026:

- https://developer.apple.com/documentation/xcode/configuring-your-app-icon
- https://developer.android.com/distribute/google-play/resources/icon-design-specifications
- https://developer.android.com/develop/ui/views/launch/splash-screen
- https://docs.expo.dev/versions/v57.0.0/sdk/splash-screen/
