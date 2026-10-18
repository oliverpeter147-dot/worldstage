# WorldStage

A Windows music player with simulated venue acoustics and audience immersion.

**[Download WorldStage for Windows x64](https://github.com/oliverpeter147-dot/worldstage/releases/latest)**

The portable app needs no installation. Open the `.exe`, choose a venue, open a music file, and start the audience. This is an unsigned build; Windows may display a publisher warning.

![WorldStage preview](WorldStage-Preview.png)

## Features

- 230 searchable presets across football stadiums, festivals, theatres, opera houses, bars, cafés, nightclubs, churches, cathedrals, arenas and concert halls.
- Local music playback and explicitly selected live audio inputs.
- Room mix, reverb decay, listening distance and bass controls.
- Synthesized crowd ambience with adjustable level, energy, size and applause swells.
- Looping playback of your own crowd recordings.
- Custom venues and locally saved mix settings.
- Offline runtime with no account or audio upload required.

## Acoustic scope

Presets use category-based estimates and generated stereo impulse responses. They are not measured replicas of the named venues. The library is curated and not exhaustive, and includes historical settings. Venue names imply no affiliation or endorsement. The built-in crowd is noise-based synthesis rather than recorded people or intelligible chants. Load a real crowd recording for a more authentic audience.

WorldStage processes its own playback or a connected audio input. Audio from another application requires a separately installed virtual audio cable. It does not automatically apply effects to every Windows sound. Use headphones with microphone input to prevent acoustic feedback.

Read [the quick-start guide](WorldStage-Quick-Start.md) for playback and routing instructions.

## Build

Requires Node.js and npm. From this repository:

```sh
npm ci
npm start
npm run dist
```

The executable is built with Electron 44.9.0 and electron-builder 26.0.12. Builds require network access to download dependencies. For faster packaging with a larger output, use `npm run dist -- --config.compression=store`.

## Validation

The Windows portable executable passed startup, decoded WAV playback, generated crowd output, effects bypass, master mute, venue search and category filtering checks. See [the validation results](WorldStage-Validation.json). Physical live audio inputs and virtual-cable routing require checking on your own hardware. Acoustic authenticity has not been validated against measurements.

Release downloads include the executable, editable source archive, guide and SHA-256 checksum. Electron and its dependencies retain their own third-party notices.
