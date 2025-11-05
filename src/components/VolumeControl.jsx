import React from 'react';

function VolumeControl({ onVolumeChange }) {
    return (
        <>
            <select>
                <option value="bassline">Bassline</option>
                {/* <option value="main_arp">Main Arpeggiator</option>
                <option value="drums1">Drums 1</option> */}
                <option value="drums2">Drums 2</option>
            </select>
            <label htmlFor="volume_range" className="form-label">Volume</label>
            <input 
                type="range" 
                className="form-range" 
                min="0" 
                max="3" 
                step="0.1" 
                id="volume_range"
            />
        </>
    );
}

export default VolumeControl;
