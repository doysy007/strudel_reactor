import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
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

    const hasRun = useRef(false);
    const [bpm, setBpm] = useState(140);
    const [drum1IsMuted, setDrum1IsMuted] = useState(false);
    const [drum2IsMuted, setDrum2IsMuted] = useState(false);
    const [basslineIsMuted, setBasslineIsMuted] = useState(false);
    const [mainArpIsMuted, setMainArpIsMuted] = useState(false);

    const [songText, setSongText] = useState(stranger_tune({ bpm: 140 }));

    const handlePlay = () => {
            globalEditor.evaluate();
        };

    const handleStop = () => {
            globalEditor.stop();
        };

    useEffect(() => {
        const muteDrums1 = (drum1IsMuted) ? "_" : "";
        const muteDrums2 = (drum2IsMuted) ? "_" : "";
        const muteBassline = (basslineIsMuted) ? "_" : "";
        const muteMainArp = (mainArpIsMuted) ? "_" : "";
        setSongText(stranger_tune({ 
            bpm, 
            muteDrums1, 
            muteDrums2, 
            muteBassline, 
            muteMainArp 
        }));
    }, [bpm, drum1IsMuted, drum2IsMuted, basslineIsMuted, mainArpIsMuted]);

    function handleBpm(newBpm) {
        setBpm(newBpm);
    }

    function handleMute(instrument, isMuted) {
        console.log('handleMute called:', { instrument, isMuted });
        switch (instrument) {
            case 'drums1':
                setDrum1IsMuted(isMuted);
                console.log('Set drum1 mute to:', isMuted);
                break;
            case 'drums2':
                setDrum2IsMuted(isMuted);
                console.log('Set drum2 mute to:', isMuted);
                break;
            case 'bassline':
                setBasslineIsMuted(isMuted);
                break;
            case 'mainArp':
                setMainArpIsMuted(isMuted);
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
                
            document.getElementById('proc').value = songText;
            // SetupButtons()
            // Proc()
        }
        if (globalEditor != null) {
            globalEditor.setCode(songText);
        }
    }, [songText]);

    return (
        <div>
            <h2>Strudel Demo</h2>
            <main>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <PreProcessText defaultValue={songText} onChange={(e) => setSongText(e.target.value)}/>
                        </div>
                        <div className="col-md-4">

                            <nav>
                                <ProcButtons />
                                <br />
                                <PlayButton onPlay={handlePlay} onStop={handleStop}/>
                            </nav>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <div id="editor" />
                            <div id="output" />
                        </div>
                        <div className="col-md-4">
                            <DJControls bpm={bpm} onBpmChange={handleBpm} onMuteChange={handleMute} />
                        </div>
                    </div>
                </div>
                <canvas id="roll"></canvas>
            </main >
        </div >
    );

}