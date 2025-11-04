import React from 'react';

function DJControls({ bpm, onBpmChange, onMuteChange }) {

    function setBpmInput(event) {
        onBpmChange(event.target.value);
    }

    function switchDrum1Mute(event) {
        onMuteChange('drums1', event.target.checked);
    }

    function switchDrum2Mute(event) {
        onMuteChange('drums2', event.target.checked);
    }

    function switchBaseLineMute(event) {
        onMuteChange('bassline', event.target.checked);
    }

    function switchMainArpMute(event) {
        onMuteChange('mainArp', event.target.checked);
    }

    return (
        <>
        <div className="container-fluid">
            <div className="row">
                <div className="input-group mb-3">
                <span className="input-group-text" id="set_cpm">Set</span>
                <input type="number" class="form-control" aria-label="Set CPM Here" id="cpm_text_input" value={bpm} onChange={setBpmInput}/>
                <span className="input-group-text">BPM</span>
                </div>
                <label htmlFor="volume_range" className="form-label">Volume</label>
                <input type="range" className="form-range" min="0" max="10" step="0.1" id="volume_range"/>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" onChange={switchBaseLineMute}/>
                    <label className="form-check-label">Mute Bassline</label>
                </div>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" onChange={switchMainArpMute}/>
                    <label className="form-check-label">Mute Main Arpeggiator</label>
                </div>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" onChange={switchDrum1Mute}/>
                    <label className="form-check-label">Mute Drums 1</label>
                </div>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" onChange={switchDrum2Mute}/>
                    <label className="form-check-label">Mute Drums 2</label>
                </div>
            </div>
        </div>
        </>
    );
}

export default DJControls;