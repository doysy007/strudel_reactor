import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope, set } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import DJControls from './components/DJControls';
import PlayButton from './components/PlayButton';
import ProcButtons from './components/ProcButtons';
import PreProcessText from './components/PreProcessText';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

// export function SetupButtons() {

//     document.getElementById('play').addEventListener('click', () => globalEditor.evaluate());
//     document.getElementById('stop').addEventListener('click', () => globalEditor.stop());
//     document.getElementById('process').addEventListener('click', () => {
//         Proc()
//     }
//     )
//     document.getElementById('process_play').addEventListener('click', () => {
//         if (globalEditor != null) {
//             Proc()
//             globalEditor.evaluate()
//         }
//     }
//     )
// }


// export function ProcAndPlay() {
//     if (globalEditor != null && globalEditor.repl.state.started == true) {
//         console.log(globalEditor)
//         Proc()
//         globalEditor.evaluate();
//     }
// }

// export function Proc() {

//     let proc_text = document.getElementById('proc').value
//     let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
//     ProcessText(proc_text);
//     globalEditor.setCode(proc_text_replaced)
// }

// export function ProcessText(match, ...args) {

//     let replace = ""
//     if (document.getElementById('flexRadioDefault2').checked) {
//         replace = "_"
//     }

//     return replace
// }

export default function StrudelDemo() {

    // State variables
    const hasRun = useRef(false);

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

    // Playing State variable
    const [isPlaying, setIsPlaying] = useState(false);

    // Song Text State variable
    const [songText, setSongText] = useState(stranger_tune({ bpm }));

    // Play button handler
    const handlePlay = () => {
        if (globalEditor != null) {
            globalEditor.evaluate(); // Starts playing the song
            setIsPlaying(true); // Sets isPlaying state to true
        }
    };

    // Stop button handler
    const handleStop = () => {
        if (globalEditor != null) {
            globalEditor.stop(); // Stops playing the song
            setIsPlaying(false); // Sets isPlaying state to false
        }
    };

    // Use effect updates the strudel code whenever any of the dependencies change.
    useEffect(() => {

        // Sets the silence strings if instrument muted is true or false.
        const muteDrums1 = (drum1IsMuted) ? "_" : "";
        const muteDrums2 = (drum2IsMuted) ? "_" : "";
        const muteBassline = (basslineIsMuted) ? "_" : "";
        const muteMainArp = (mainArpIsMuted) ? "_" : "";
        
        // Updates the song text based on current mute settings.
        const updatedSongText = stranger_tune({ 
            bpm, 
            muteDrums1, 
            muteDrums2, 
            muteBassline, 
            muteMainArp,
            basslineGain,
            mainArpGain,
            drums1Gain,
            drums2Gain
        });

        setSongText(updatedSongText); // Sets the current song text to the updated song text.

        // Allows the changes to take effect immediately upon change.
        if (globalEditor != null && isPlaying) {
            globalEditor.setCode(updatedSongText);
            globalEditor.evaluate();
        }
    }, [bpm, drum1IsMuted, drum2IsMuted, basslineIsMuted, mainArpIsMuted, basslineGain, mainArpGain, drums1Gain, drums2Gain, isPlaying]);


    // Bpm handler
    function handleBpm(newBpm) {
        setBpm(newBpm);
    }

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
                
            // document.getElementById('proc').value = songText;
            // SetupButtons()
            // Proc()
        }
        if (globalEditor != null) {
            globalEditor.setCode(songText);
        }
    }, [songText]);

    return (
        <div>
            <h2 className="title">Strudel Demo &#127925;</h2>
            <main>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8">
                            <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                                <PreProcessText defaultValue={songText} onChange={(e) => setSongText(e.target.value)}/>
                            </div>
                            <br />
                            <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                                <div id="editor" />
                                <div id="output" />
                            </div>
                        </div>
                        <div className="col-md-4" id="controls">
                        <br />
                        <br />
                        <DJControls 
                            bpm={bpm} 
                            onBpmChange={handleBpm} 
                            onMuteChange={handleMute} 
                            onVolumeChange={handleVolume}
                        />
                        <br />
                        <div className="d-flex justify-content-center flex-column">
                            <PlayButton onPlay={handlePlay} onStop={handleStop} />
                        </div>
                        </div>
                    </div>
                </div>
                <canvas id="roll"></canvas>
            </main >
        </div >
    );

}