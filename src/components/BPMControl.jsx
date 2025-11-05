import React from 'react';

function BPMControl({ bpm, onBpmChange }) {
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
                value={bpm} 
                onChange={setBpmInput}
            />
            <span className="input-group-text">BPM</span>
        </div>
    );
}

export default BPMControl;
