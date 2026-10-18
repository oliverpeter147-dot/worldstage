# WorldStage 1.2

Windows music playback with simulated venue acoustics and audience immersion.

**[Download the latest Windows x64 app](https://github.com/oliverpeter147-dot/worldstage/releases/latest)**

## Features

- 230 worldwide venue presets and locally saved custom venues.
- 36 distinct virtual stadium scenes with delayed stand reflections, roof enclosure, listening position and audience absorption.
- Measured mono/stereo WAV impulse-response import.
- Local music playback and explicitly selected live audio inputs.
- Adjustable crowd ambience, applause and your own crowd recordings.
- Offline operation without an account.

Version 1.2 removes the streaming-service integration introduced in 1.1.

## Acoustic scope

Bundled presets are estimated virtual scenes, not acoustically verified reconstructions of the named venues. Import a measured response for a specific venue. Venue names imply no affiliation.

## Build and tests

```sh
npm ci
npm test
npm start
npm run dist
```

Requires Node.js and npm. Uses Electron 44.9.0 and electron-builder 26.0.12. Three acoustic regression tests are included. The Windows portable build also passes audio and interface checks; see [validation](WorldStage-1.2-Validation.json). Physical audio input devices and acoustic accuracy against venue measurements remain unverified.

Read [the guide](WorldStage-1.2-Guide.md) for setup and measured-response import. The app is an unsigned portable Windows x64 build.
