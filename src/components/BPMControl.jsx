import React from 'react';

// BPMControl component allows the user to set the bpm of the music.
function BPMControl({ bpm, onBpmChange }) {

    /** 
     * When input is changed it calls this function and passes the new bpm to App.js.
     * Does check for if bpm input value is empty then returns empty string.
     * If bpm is greater than 250 sets bpm to 250, if bpm is less than 0 sets bpm to 0, otherwise if bpm is between 0-250 sets bpm to the value.
    */
    function setBpmInput(event) {
        const bpm = event.target.value;
        if (bpm === '') {
            return onBpmChange(bpm)
        }
        if (bpm < 0 ) {
            return onBpmChange(0)
        }
        if (bpm > 250) {
             return onBpmChange(250)
        }
        onBpmChange(bpm);
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
                min="0"
                max="250"
                onChange={setBpmInput}
            />
            <span className="input-group-text">BPM</span>
        </div>
    );
}

export default BPMControl;
