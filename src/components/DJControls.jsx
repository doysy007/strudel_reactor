import React from 'react';
import BPMControl from './BPMControl';
import MuteControls from './MuteControls';
import VolumeControl from './VolumeControl';

function DJControls({ bpm, onBpmChange, onMuteChange, onVolumeChange }) {
    return (
        <>
        <div className="container-fluid">
            <div className="row">
                <BPMControl bpm={bpm} onBpmChange={onBpmChange} />
                <VolumeControl onVolumeChange={onVolumeChange} />
                <MuteControls onMuteChange={onMuteChange} />
            </div>
        </div>
        </>
    );
}

export default DJControls;