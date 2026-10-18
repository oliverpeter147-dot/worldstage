# WorldStage 1.3

Windows music playback with venue acoustics and audience immersion.

**[Download the latest Windows x64 app](https://github.com/oliverpeter147-dot/worldstage/releases/latest)**

## Reverb workaround

Open a music file, click **Make reverb audible**, then Play. The independent Compatibility reverb engine is selected by default. Sound check plays a short chord so you can hear the tail. Input and wet-output meters help diagnose routing.

Version 1.3 fixes the wet/dry blend, calibrates generated responses, adds wet boost, and verifies wet-only music output and reverb tails. Choose Convolution for the geometry-based venue response; imported WAV responses use it automatically.

## Features

230 venue presets, estimated stadium scenes, measured impulse-response import, local file playback, live inputs, crowd ambience and custom venues. No account required. Venue acoustics are approximate; the Compatibility engine uses modeled decay rather than individual stadium reflection paths.

## Build and tests

```sh
npm ci
npm test
npm start
npm run dist
```

Uses Electron 44.9.0 and electron-builder 26.0.12. Four regression tests and wet-only/tail playback checks pass. Read [the guide](WorldStage-1.3-Guide.md) and [validation report](WorldStage-1.3-Validation.json). Unsigned portable Windows x64 build.
