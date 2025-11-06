import React from 'react';

function MuteControls({ onMuteChange }) {
    
    // Handlers to pass instrument and mute state to App.js.
    function handleDrum1Mute(event) {
        onMuteChange('drums1', event.target.checked);
    }

    function handleDrum2Mute(event) {
        onMuteChange('drums2', event.target.checked);
    }

    function handleBassLineMute(event) {
        onMuteChange('bassline', event.target.checked);
    }

    function handleMainArpMute(event) {
        onMuteChange('mainArp', event.target.checked);
    }

    return (
        <>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" onChange={handleBassLineMute}/>
                <label className="form-check-label">Mute Bassline</label>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" onChange={handleMainArpMute}/>
                <label className="form-check-label">Mute Main Arpeggiator</label>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" onChange={handleDrum1Mute}/>
                <label className="form-check-label">Mute Drums 1</label>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" onChange={handleDrum2Mute}/>
                <label className="form-check-label">Mute Drums 2</label>
            </div>
        </>
    );
}

export default MuteControls;
