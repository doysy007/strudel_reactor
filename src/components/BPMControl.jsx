import React from 'react';

// BPMControl component allows the user to set the bpm of the music.
function BPMControl({ bpm, onBpmChange }) {

    // When input is changed it calls this function and passes the new bpm to App.js.
    function setBpmInput(event) {
        onBpmChange(event.target.value);
    }

    return (
        <div className="input-group mb-3">
            <span className="input-group-text" id="set_cpm">Set</span>
            <input 
                type="number" 
                className="form-control" 
                aria-label="Set CPM Here" 
                id="cpm_text_input" 
                value={bpm} // Current bpm passed from App.js.
                onChange={setBpmInput}
            />
            <span className="input-group-text">BPM</span>
        </div>
    );
}

export default BPMControl;
