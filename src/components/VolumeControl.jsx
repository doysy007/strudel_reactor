import React from 'react';

function VolumeControl({ onVolumeChange }) {

    const [volume, setVolume] = React.useState(1.0);
    const [selectedInstrument, setSelectedInstrument] = React.useState('all');

    // Handler to update volume and pass selected instrument and updated volume to App.js.
    function handleVolume(event) {    
        const newVolume = parseFloat(event.target.value); // Converts string to float  
        setVolume(newVolume);
        onVolumeChange(selectedInstrument, newVolume);
    }

    // Handler to update state of selected instrument.
    function handleSelectedInstrument(event) { 
        setSelectedInstrument(event.target.value);
    }

    return (
        <>
            <select className="form-select" value={selectedInstrument} onChange={handleSelectedInstrument}>
                <option value="all">All Instruments Volume</option>
                <option value="bassline">Bassline Volume</option>
                <option value="mainArp">Main Arpeggiator Volume</option>
                <option value="drums1">Drums 1 Volume</option>
                <option value="drums2">Drums 2 Volume</option>
            </select>
            <label htmlFor="volume_range" className="form-label">Volume: {volume}x</label>
            <input 
                type="range" 
                className="form-range" 
                min="0" 
                max="2" 
                step="0.1" 
                id="volume_range"
                value={volume}
                onChange={handleVolume}
            />
        </>
    );
}

export default VolumeControl;
