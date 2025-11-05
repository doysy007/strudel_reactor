import React from 'react';

function MuteControls({ onMuteChange }) {
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
        </>
    );
}

export default MuteControls;
