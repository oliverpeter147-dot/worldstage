# WorldStage 1.3 — reverb workaround

## Get audible reverb on a music file

1. Close older WorldStage instances and open WorldStage-1.3.0-Windows.exe.
2. Click Open music and select your WAV or MP3 file.
3. Scroll to Shape the space and click **Make reverb audible**. This enables the compatibility engine, sets mix to 65%, boost to +6 dB and master to 65%, and clears bypass/mute. The mix and master settings are saved locally.
4. Press Play if music is paused. Adjust Room mix and Reverb boost to taste.
5. Click Sound check to pause music and hear a short chord followed by the reverb tail. Press Play afterward to resume your file. The sound check also disconnects live input and stops the audience to isolate the test sound.

## What was fixed

The previous stadium mix retained 80% dry signal even at 100% room mix, and its unnormalized response could be very quiet. Version 1.3 uses an equal-power wet/dry blend: 0% is dry and 100% removes the dry path. Generated impulse responses are calibrated for usable output energy. Reverb boost offers 0 to +12 dB of additional wet gain. A master dynamics compressor limits peaks.

The **Compatibility** engine uses an independent filtered feedback-delay network. It does not rely on convolution processing. It is the default workaround and uses the selected decay and occupancy settings, but does not reproduce the stadium model’s individual geometric reflection paths.

Choose **Convolution** for the generated venue response and geometry-based stadium reflections. Imported WAV responses automatically use convolution. Return to simulated acoustics or click Make reverb audible to clear an import and use the compatibility engine again.

## Diagnose with meters

- Music input moves, Reverb output moves: music is passing through the wet path. Raise Room mix, or try 100% briefly to isolate it.
- Music input moves, Reverb output stays at zero: clear bypass, raise mix, and select Compatibility. Use Make reverb audible to apply those settings together.
- Neither meter moves: press Play on a loaded file, or run Sound check. Check the audio engine status and Windows output device.
- Reverb output moves but no sound is heard: clear master mute, raise master volume, and check Windows volume/device routing.

Meters show the music input and wet output before the master. The crowd has a separate path; these meters are intended to diagnose the music reverb. The app still processes only its own file playback or a connected live input.

## Preserved features

230 venue presets, 36 estimated stadium scenes, listening positions, roof and occupancy controls in the convolution model, local music playback, live audio inputs, audience ambience, custom crowd recordings, custom venues, and measured mono/stereo WAV response import remain available. Imported responses may be up to 15 seconds and under 64 MB, and last only the current session. No streaming-service integration or account is required.

Bundled venue acoustics are estimates, not verified measurements of named venues. Compatibility is a listening workaround, not a measured stadium replica.

## Verification

Four unit/regression tests cover response calibration and stadium behavior. Audio checks render wet-only output for both engines, measure tails after the source ends, and test the actual decoded music playback graph with dry gain at zero. They also check 100% mix removes dry, bypass, mute, crowd output, search and response import/restoration. They do not verify a particular user’s speakers, Windows routing or subjective listening experience. See the release validation report.
