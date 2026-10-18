# WorldStage 1.4 — feedback-noise fix

## Use with a music file

1. Close the older app and open WorldStage-1.4.0-Windows.exe.
2. Open your WAV or MP3 file.
3. Click **Clean music reverb**. It turns the separate audience off, sets music reverb to 35% mix with no boost, enables the fixed compatibility engine and clears mute/bypass.
4. Press Play and use **A/B: reverb / dry** to compare the same music with the effect enabled and bypassed.
5. Sound check pauses music and plays a short pitched chord. Press Play to resume your file afterward.

## Confirmed defect and fix

The previous compatibility engine used low-pass filters with Q=1 inside feedback loops. Those filters can have gain above unity at some frequencies, so a loop could grow rather than fade at long decay settings. The old engine reproduced runaway feedback during a 20-second offline regression test with a 9-second requested decay. That is a genuine source of ringing/noise; the test does not establish which settings were used on any particular customer device.

The revised engine uses non-resonant damping filters with Q=0.5, initializes feedback at zero, limits feedback gain to 0.82, and adds four stable all-pass diffusion stages. Wet gain and default mix are lower. The compatibility tail is bounded for stability, so long requested decay values are approximate. Convolution remains available for venue responses and imported measured WAV files.

The audience is independent of music reverb. Its built-in synthetic ambience is noise-based. Leave it off when judging reverb; use your own crowd recording if you want actual people rather than synthesized ambience. Spotify remains removed.

## Verification

The final app is tested with no dry signal, decoded music playback, tail output, bypass, mute, response import and audience controls. A separate 20-second stability test uses a short two-frequency musical excitation, then silence. The corrected engine remains finite and decays to near silence; a no-input render produces zero output. The legacy engine is retained only inside the diagnostic regression test to demonstrate the old instability. It is never selected as a playback engine.

The release includes two short WAV demonstrations of the same synthesized musical phrase: Dry Demo and Reverb Demo. They let you compare the revised engine without relying on the app or a crowd sound. These examples are not measured venue recordings.

Four unit/regression tests pass in addition to the packaged audio checks. They verify code behavior, not subjective listening quality on every speaker or real-world acoustic authenticity. Bundled presets are still estimates. No feedback-noise fix can repair clipping or distortion already present in an input file or device.
