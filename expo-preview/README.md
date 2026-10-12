# Invoingo Expo Go preview

This Expo SDK 57 shell opens Invoingo's working mobile web experience in a native WebView. It is a device preview, not a full native rewrite or store release. React Native WebView is included in Expo Go: https://docs.expo.dev/versions/v57.0.0/sdk/webview/.

From the project root, keep one app server running with `npm run preview:phone`. That command serves port 4185 on the local network and writes the public computer address to this directory's ignored `.env`. Stop an existing localhost server on 4185 first. In another terminal, run `node start-expo.cjs`.

Open http://127.0.0.1:4185/expo.html and scan the QR with Expo Go. Both devices must share a Wi-Fi network. The app starts in demo mode and stores changes separately inside its WebView. It never bundles Stripe or Resend keys; provider keys belong only in the root server `.env`.

If the computer's address changes, restart `preview:phone`, then restart Metro. The shell also lets you enter the current computer address manually. Public HTTPS deployments can be entered there too.

Validation commands: `npm run lint`, `npm run typecheck`. Android/iOS JavaScript bundles can be checked with `npx expo export --platform ios` and `npx expo export --platform android`. A physical device run is still needed for camera, file upload, printing and external sharing behavior.
