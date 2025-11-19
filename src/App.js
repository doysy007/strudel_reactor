import './css/App.css';
import nedDancingImg from './nedDancing.gif';
import nedNotDancingImg from './nedNotDancing.png';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope, patt, set } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import DJControls from './components/DJControls';
import PlayButton from './components/PlayButton';
import PreProcessText from './components/PreProcessText';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

export default function StrudelDemo() {

    // State variables
    const hasRun = useRef(false);

    const [expandedPane, setExpandedPane] = useState(null);

    const [nedDancing, setNedDancing] = useState(false);

    // Bpm State variable
    const [bpm, setBpm] = useState(140);

    // Mute State variables
    const [drum1IsMuted, setDrum1IsMuted] = useState(false);
    const [drum2IsMuted, setDrum2IsMuted] = useState(false);
    const [basslineIsMuted, setBasslineIsMuted] = useState(false);
    const [mainArpIsMuted, setMainArpIsMuted] = useState(false);

    // Volume State variables
    const [basslineGain, setBasslineGain] = useState(1.0);
    const [mainArpGain, setMainArpGain] = useState(1.0);
    const [drums1Gain, setDrums1Gain] = useState(1.0);
    const [drums2Gain, setDrums2Gain] = useState(1.0);

    // Pattern State variables
    const [bassPattern, setBassPattern] = useState(0);
    const [drumPattern, setDrumPattern] = useState(0);

    // Playing State variable
    const [isPlaying, setIsPlaying] = useState(false);

    // Song Text State variable
    const [songText, setSongText] = useState(stranger_tune({ bpm }));

    // Play button handler
    const handlePlay = () => {
        if (globalEditor != null) {
            globalEditor.evaluate(); // Starts playing the song
            setIsPlaying(true); // Sets isPlaying state to true
            setNedDancing(true); // Show dancing gif while playing
        }
    };

    // Stop button handler
    const handleStop = () => {
        if (globalEditor != null) {
            globalEditor.stop(); // Stops playing the song
            setIsPlaying(false); // Sets isPlaying state to false
            setNedDancing(false); // Show idle image when stopped
        }
    };

    // Scroll to controls section
    const handleScrollToControls = () => {
        const controls = document.getElementById('controls');
        controls.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Use effect updates the strudel code whenever any of the dependencies change.
    useEffect(() => {

        // Sets the silence strings if instrument muted is true or false.
        const muteDrums1 = (drum1IsMuted) ? "_" : "";
        const muteDrums2 = (drum2IsMuted) ? "_" : "";
        const muteBassline = (basslineIsMuted) ? "_" : "";
        const muteMainArp = (mainArpIsMuted) ? "_" : "";
        
        // Updates the song text based on current dj control settings.
        const updatedSongText = stranger_tune({ 
            bpm, 
            muteDrums1, 
            muteDrums2, 
            muteBassline, 
            muteMainArp,
            basslineGain,
            mainArpGain,
            drums1Gain,
            drums2Gain,
            drumPattern,
            bassPattern
        });

        setSongText(updatedSongText); // Sets the current song text to the updated song text.

        // Allows the changes to take effect immediately upon change.
        if (globalEditor != null && isPlaying) {
            globalEditor.setCode(updatedSongText);
            globalEditor.evaluate();
        }
    }, [bpm, drum1IsMuted, drum2IsMuted, basslineIsMuted, mainArpIsMuted, basslineGain, mainArpGain, drums1Gain, drums2Gain, drumPattern, bassPattern, isPlaying]); // Dependencies list

    // Mute handler
    // Sets instrument mute states to true or false based 
    // on form switch input from Mute Controls component.
    function handleMute(instrument, isMuted) {
        switch (instrument) {
            case 'drums1':
                setDrum1IsMuted(isMuted);
                break;
            case 'drums2':
                setDrum2IsMuted(isMuted);
                break;
            case 'bassline':
                setBasslineIsMuted(isMuted);
                break;
            case 'mainArp':
                setMainArpIsMuted(isMuted);
                break;
        }
    }

    // Volume handler
    // Sets the volume for the selected instrument 
    // in the select list from Volume Control component.
    function handleVolume(instrument, volume) {
        switch (instrument) {
            case 'all':
                setBasslineGain(volume);
                setMainArpGain(volume);
                setDrums1Gain(volume);
                setDrums2Gain(volume);
                break;
            case 'bassline':
                setBasslineGain(volume);
                break;
            case 'mainArp':
                setMainArpGain(volume);
                break;
            case 'drums1':
                setDrums1Gain(volume);
                break;
            case 'drums2':
                setDrums2Gain(volume);
                break;
        }
    }


    useEffect(() => {

        if (!hasRun.current) {
            document.addEventListener("d3Data", handleD3Data);
            console_monkey_patch();
            hasRun.current = true;
            //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
                //init canvas
                const canvas = document.getElementById('roll');
                canvas.width = canvas.width * 2;
                canvas.height = canvas.height * 2;
                const drawContext = canvas.getContext('2d');
                const drawTime = [-2, 2]; // time window of drawn haps
                globalEditor = new StrudelMirror({
                    defaultOutput: webaudioOutput,
                    getTime: () => getAudioContext().currentTime,
                    transpiler,
                    root: document.getElementById('editor'),
                    drawTime,
                    onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                    prebake: async () => {
                        initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                        const loadModules = evalScope(
                            import('@strudel/core'),
                            import('@strudel/draw'),
                            import('@strudel/mini'),
                            import('@strudel/tonal'),
                            import('@strudel/webaudio'),
                        );
                        await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                    },
                });
        }
        // Keeps strudel output up to date with the songText.
        if (globalEditor != null) {
            globalEditor.setCode(songText);
        }
    }, [songText]); // Effect runs everytime songText changes.

     return (
        <div>
            <div className="title-card">
                <h2>Strudel Demo &#127925;</h2>
            </div>
            <main>
                <div className="container-fluid">
                    <div className="row" >
                        {/* If expandedPane is true and doesn't equal strudel then expands preprocess text column to take up entire row.
                        Otherwise if expandedPane equals strudel then hides this column.  */}
                        <div className={`${expandedPane ? 'col-12' : 'col-4'} ${expandedPane && expandedPane === 'strudel' ? 'd-none' : ''}`}>
                            <h2 className="form-label preprocess-label title">Text to preprocess:</h2>
                            <div style={{ maxHeight: '80vh', overflowY:'auto'}}>
                                <PreProcessText defaultValue={songText} onChange={(e) => setSongText(e.target.value)} />
                            </div>
                            <div className="d-flex justify-content-center mt-3">
                                {/* Shows button for expanding pane or exiting pane view. */}
                                {expandedPane === 'preprocess' ? (
                                    <button className="btn btn-secondary" onClick={() => setExpandedPane(null)}>Exit Fullscreen</button>
                                ) : (
                                    <button className="btn btn-secondary" onClick={() => setExpandedPane('preprocess')}>Expand Pre-Process Text</button>
                                )}
                            </div>
                        </div>
                        {/* This is the middle pane so if expandedPane is true then hides this pane. */}
                        <div className={`col-4 d-flex flex-column align-items-center ${expandedPane ? 'd-none' : ''}`}>
                            {/* If song is playing (nedDancing is true) then shows gif of Ned dancing.
                            Otherwise, shows png (still picture) of Ned dancing.*/}
                            {nedDancing ? (
                                <img className="nedImage" src={nedDancingImg} alt="Ned dancing" />
                            ) : (
                                <img className="nedImage" src={nedNotDancingImg} alt="Ned not dancing" />
                            )}
                            <div className="d-flex justify-content-center flex-column" id="playControls">
                                <div className="btn-group">
                                    <PlayButton onPlay={handlePlay} onStop={handleStop} />
                                </div>
                            </div>
                            <div className="d-flex justify-content-center flex-column" id="controlsButton">
                                <button className="btn btn-secondary mb-3" onClick={handleScrollToControls}>
                                    Click Here to View DJControls
                                </button>
                            </div>
                        </div>
                        {/* If expandedPane is true and doesn't equal preprocess then expands strudel output column to take up entire row.
                        Otherwise if expandedPane equals preprocess then hides this column.  */}
                        <div className={`${expandedPane ? 'col-12' : 'col-4'} ${expandedPane && expandedPane === 'preprocess' ? 'd-none' : ''}`}>
                            <h2 className="title">Strudel Output:</h2>
                            <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                                <div id="editor" />
                                <div id="output" />
                            </div>
                            <div className="d-flex justify-content-center">
                                {/* Shows button for expanding pane or exiting pane view. */}
                                {expandedPane === 'strudel' ? (
                                    <button className="btn btn-secondary mt-2" onClick={() => setExpandedPane(null)}>Exit Fullscreen</button>
                                ) : (
                                    <button className="btn btn-secondary mt-2" onClick={() => setExpandedPane('strudel')}>Expand Strudel Output</button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row" id="controls">
                        <br />
                        <br />
                        <DJControls 
                            bpm={bpm} 
                            onBpmChange={(newBpm) => setBpm(newBpm)} 
                            onMuteChange={handleMute} 
                            onVolumeChange={handleVolume}
                            onBassPatternChange={(patternNumber) => setBassPattern(patternNumber)}
                            onDrumPatternChange={(patternNumber) => setDrumPattern(patternNumber)}
                            bassPattern={bassPattern}
                            drumPattern={drumPattern}
                        />
                        <br />
                    </div>    
                </div>
                <canvas id="roll"></canvas>
            </main >
        </div >
    );

}
