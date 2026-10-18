# WorldStage 1.4

Windows music playback with venue acoustics and audience immersion.

**[Download the latest Windows app](https://github.com/oliverpeter147-dot/worldstage/releases/latest)**

## Feedback-noise fix

Version 1.4 fixes reproduced feedback instability in the compatibility reverb. It adds non-resonant damping, bounded feedback and all-pass diffusion, lowers wet gain, and provides **Clean music reverb** plus a direct dry/reverb A/B control.

Open your file, click Clean music reverb, then Play. Leave the separate synthesized audience off while judging the music effect. Musical dry/reverb WAV examples are attached to the release.

## Features

230 venue presets, estimated stadium scenes, measured impulse-response import, music playback, live inputs, audience recordings and custom venues. No streaming-service integration. Preset acoustics are estimates, not verified replicas.

## Build and checks

```sh
npm ci
npm test
npm start
npm run dist
```

Four unit/regression tests and packaged audio tests pass. New checks verify feedback decays to silence and that no input produces no output. Read [the guide](WorldStage-1.4-Guide.md) and [validation report](WorldStage-1.4-Validation.json). Unsigned Windows x64 build.
