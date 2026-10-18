# WorldStage 1.1 — stadium acoustics and Spotify Connect

## Install / run

Download `WorldStage-1.1.0-Windows.exe` and run it on Windows x64. This portable build needs no administrator access or installer. It is unsigned, so Windows may show a publisher warning. Close the old WorldStage instance before using this version.

## Stadium audio changes

Version 1.0 gave every stadium the same dense reverb and short early reflection pattern. Version 1.1 replaces that with a separate stadium model:

- Reflection delays come from image-source paths in a virtual bowl, relative to direct arrival, at a nominal sound speed of 343 m/s.
- The two stereo channels receive different stand reflections.
- **Listening position** changes pitch, side-stand and upper/rear-stand paths. **Distance from stage** also changes the listener position.
- **Roof enclosure** adds a canopy reflection and increases diffuse tail energy.
- **Seat occupancy / absorption** reduces reflection strength and tail duration. This is independent of the noise-producing audience level and size controls.
- The diffuse tail is quieter than in version 1.0, with higher frequencies decaying faster. The direct music signal remains more prominent.
- Reverb changes crossfade over 150 ms and rapid slider changes are debounced, reducing abrupt discontinuities.

All 36 stadiums have distinct parameter sets. These are hand-authored virtual scenes, **not surveyed dimensions or measured responses of the named venues**. The preset names are inspirations, and no stadium authenticity has been established. Roof controls represent a listening-model enclosure setting, not a statement of the actual roof position or construction at a venue. Do not treat the displayed model-tail time as a measured venue RT60.

For an occupied open stadium, start with room mix around 20–35%, high seat occupancy, and low roof enclosure. Increase enclosure and change listening position to explore covered-stand character. These are listening suggestions, not calibrated measurements.

## Import a measured venue response

1. Select the venue.
2. Under **Shape the space**, choose **Import measured impulse response**.
3. Load a mono/stereo WAV response, between 1 ms and 15 seconds, under 64 MB. You must have permission to use the recording.
4. Set **Room mix** to 100% to hear the full imported response. Lower values blend the original signal with it. Responses are normalized by the audio engine to control gain.
5. Use **Use simulated acoustics** to return to the generated model.

An imported response may already contain its direct arrival. The app does not strip that arrival or claim the file is a valid measurement. Imported responses disable the model’s decay, position, roof and occupancy controls; distance still affects the output tone. Importing another response replaces the previous one. Changing venue clears the imported response. Imports last only the current session.

## Spotify integration

The app can authorize a Spotify account, display the current track, list available Spotify Connect devices, transfer playback, play/pause, skip tracks, and start a Spotify track, album or playlist link. Playback remains in your Spotify player/device. **Spotify audio does not enter WorldStage’s reverb engine through this integration.** WorldStage volume, mute and stop only affect WorldStage audio. Use the separate Spotify controls for Spotify playback.

Spotify’s official platform requires content to remain unmodified. The app therefore does not capture, decode, extract or apply venue effects to Spotify streams. This is a remote-control integration, not an embedded streaming or audio-processing SDK. General live-input support remains available for other audio sources you are entitled to process.

### Set up your own Spotify Client ID

1. Sign in to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and create a Web API app if your account is eligible. WorldStage does not create the developer app or accept its terms for you.
2. Register this exact redirect URI:

   `http://127.0.0.1:43821/spotify/callback`

3. In the developer app, add your Spotify account to the user allowlist if it is in development mode.
4. Copy the public **Client ID** into WorldStage’s Spotify section. **Do not enter a client secret.**
5. Click **Connect Spotify** and complete authorization in your normal browser.
6. Open the Spotify app or web player and start a track. Return to WorldStage and click **Refresh**.
7. Select a device, then use **Use device**, **Play**, **Pause**, **Previous**, **Next**, or paste a Spotify track/album/playlist link and choose **Play link**.

Playback-control endpoints require Spotify Premium. Development-mode apps require a Premium owner, are limited to five allowlisted authenticated users, and may face endpoint restrictions. Public distribution of WorldStage does not grant Spotify production approval. A shared integration available to everyone requires appropriate approval from Spotify. A personal Client ID works only within the access Spotify grants that app.

The app uses authorization code flow with PKCE and validates the callback state. It requests only `user-read-playback-state` and `user-modify-playback-state`. It opens a loopback callback listener on port 43821 only during sign-in, with a three-minute timeout. If another process uses that port, close it or the other WorldStage instance and retry.

Access and refresh tokens remain in the main process’s memory. They are not returned to the renderer or saved to disk. **Disconnect** or closing WorldStage clears the session. The public Client ID is saved locally for convenience. Reauthorize after restarting the app. Current track metadata and device information are queried while connected; hidden windows suspend scheduled polling. API errors are displayed rather than silently retried repeatedly. Account authorization and playback require network access. Local files and simulated acoustics still work offline.

### Troubleshooting Spotify

- **Invalid redirect:** match the registered URI exactly, including port and path. Use `127.0.0.1`, not `localhost`.
- **No active player:** start a track in Spotify itself, then refresh devices.
- **403 / denied:** check Premium, the developer-app user allowlist, and Spotify’s current access restrictions.
- **Rate limit:** wait for the interval shown before refreshing.
- **Spotify app does not open:** choose **Spotify web player**.
- **Authorization times out or is denied:** reconnect; the previous sign-in attempt cannot be reused.

## Validation and limits

The release includes an audio-engine smoke-test report and eight automated engine/service tests. Checks cover unique stadium responses, reflection onset, stereo differences, occupancy absorption, roof energy, seat-dependent timing, finite responses at control extremes, OAuth state validation, PKCE verification, cancellation, refresh, device commands, link parsing, rate limits and permission errors. The packaged-app checks additionally cover decoded WAV playback, bypass, mute, crowd output, search, imported response selection/restoration and Spotify IPC validation.

Spotify service tests use simulated responses and a real local callback listener. **A live Spotify account connection has not been verified**, because no developer Client ID was supplied. Physical microphones, audio interfaces, virtual-cable routing, perceptual quality and venue-specific measurement agreement have not been verified. Automated tests confirm implementation behavior; they do not certify acoustic realism.

## Technical references

- [Spotify PKCE authorization](https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow)
- [Spotify redirect URI rules](https://developer.spotify.com/documentation/web-api/concepts/redirect_uri)
- [Spotify playback requirements and content restrictions](https://developer.spotify.com/documentation/web-api/reference/start-a-users-playback)
- [Spotify quota and development-mode limits](https://developer.spotify.com/documentation/web-api/concepts/quota-modes)
- [ODEON: evaluating unroofed auditoriums](https://odeon.dk/publication/is-reverberation-time-adequate-for-testing-the-acoustical-quality-of-unroofed-auditoriums/)

The acoustic research informs the distinction between open performance spaces and enclosed halls. It is not a source of measured data for these bundled presets. WorldStage is not affiliated with Spotify or any named venue.
