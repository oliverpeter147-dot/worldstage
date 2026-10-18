# WorldStage for Windows

WorldStage is a standalone Windows desktop app for listening to music with simulated venue acoustics and an adjustable audience. This build targets Windows x64.

## Run

Double-click `WorldStage-1.0.0-Windows.exe`. It is a portable app: no installer is required. The first launch may take a little longer while its runtime extracts. This is an unsigned local build, so Windows may show a publisher or reputation prompt. No administrator access is needed for normal use.

## Play music in a venue

1. Search the venue library, or filter by venue type.
2. Choose a venue. Its estimated reverb decay and audience size will load.
3. Click **Open music** and choose a local audio file. WAV and MP3 are recommended; other formats depend on Chromium codec support.
4. Adjust **Room mix**, **Reverb decay**, **Distance from stage**, and **Low-end warmth**.
5. Click **Start audience**. Adjust audience level, energy and size. Use **Clap / cheer** to trigger a noise-based audience swell.
6. Adjust the master volume. **Mute** silences the entire app. **Stop** stops music, live input and audience. **Bypass venue effects** leaves the audience running while removing the music’s venue processing.

## Process live audio

Choose an audio input and click **Connect live input**. Microphones, audio interface line inputs, and installed virtual cable inputs can be used. Once access is granted, click the refresh button to see device names. Use headphones when using a microphone to avoid acoustic feedback. Connecting a live input pauses file playback; playing a file disconnects the live input.

To process audio from another app:

1. Install a suitable virtual audio cable separately if you do not already have one. It is not included in this package.
2. Set the other app’s audio output to the virtual cable’s playback endpoint using Windows sound settings or that app’s device settings.
3. Select the matching cable recording endpoint in WorldStage and connect the live input.
4. Keep WorldStage’s output on your headphones or speakers. Do not send its output back into the same cable.

WorldStage uses the Windows default output device. It does not install a system audio driver, silently capture other apps, or automatically apply effects to every Windows sound. Input/device buffering and the convolution engine introduce latency; this is primarily a listening app rather than a low-latency live performance monitor.

## Audience recordings

The built-in audience uses stereo filtered noise, fluctuations and noise-based applause/cheer swells. It is a synthetic approximation, not a recording of people, intelligible chanting, or realistic speech synthesis. For a more authentic crowd, choose your own audio under **Custom crowd recording** and start the audience. That recording loops. Use **Use synthesized crowd** to switch back. Use recordings you have permission to use.

## Venue library

230 curated presets cover 10 venue categories across the Americas, Europe, Africa, Asia, Oceania and the Middle East. All acoustics are estimated from venue type using generated stereo impulse responses. No named venue has been acoustically measured for this app, and no endorsement or affiliation is implied. Locations and names identify preset inspirations, including historical settings; they do not establish current operating status. Festivals describe event settings rather than fixed buildings.

This is not an exhaustive catalogue of every major venue. Click **Create custom venue** for a missing location, choose its type, then tune its controls. Custom venues, the last selected venue and common mix settings are saved locally. Audio file selections are not restored after restart. Custom venue controls load from the selected type; changes to decay and size apply to the current session.

## Privacy and dependencies

Runtime playback and the library work offline. There is no account, cloud audio upload, analytics service or automatic updater in this app. Audio stays on your computer. Live input is requested only when you click its connect button. Local preferences use Electron’s application data storage.

The bundled Electron runtime and its third-party notices are part of the executable payload. Source is supplied separately in `WorldStage-Source.zip`. The source uses Electron 44.9.0 and electron-builder 26.0.12. To rebuild with Node.js and npm installed, extract the source into a writable development folder, run `npm ci`, then `npm run dist`. The build needs network access to retrieve npm packages and the Electron runtime. `npm start` runs the development app.

## Validation scope

See `WorldStage-Validation.json` for the automated audio-engine smoke-test results. Checks cover startup, the venue library, all ten reverb types, generated music signal output, generated crowd signal output and search. They do not certify the accuracy of venue acoustics or replace listening tests. Physical microphone/audio-interface routing and a virtual cable require checking with your own hardware and device configuration.
