# WorldStage 1.2 — venue acoustics and audience immersion

## Install / run

Download `WorldStage-1.2.0-Windows.exe` and run it on Windows x64. This portable build needs no administrator access or installer. It is unsigned, so Windows may show a publisher warning. Close the old WorldStage instance before using this version.

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

## Version 1.2 changes

The streaming-service connection, account login, playback controls, developer settings, network service, callback listener and preload bridge have been removed. Version 1.2 keeps the revised stadium acoustics, measured impulse-response import, 230 venue presets, local music playback, live audio inputs, crowd recordings and custom venues. No account is required.

## Validation

Three acoustic tests cover unique stadium responses, stereo variation, reflection onset, occupancy absorption, roof energy, seating position and finite values at control extremes. The packaged app is also checked for WAV playback, bypass, mute, crowd output, search, response import/restoration and absence of the removed controls and bridge. These checks do not establish agreement with measured real-world venues or verify physical input devices.
