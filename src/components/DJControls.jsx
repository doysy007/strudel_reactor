import React from 'react';
import BPMControl from './BPMControl';
import MuteControls from './MuteControls';
import VolumeControl from './VolumeControl';

// Parent component for BPMControl, MuteControls and VolumeControl.
function DJControls({ bpm, onBpmChange, onMuteChange, onVolumeChange }) {
    return (
        <div className="container-fluid">
            <div className="row g-3 align-items-stretch">
                <div className="col-12 col-md-4 d-flex">
                    <div className="card control-card flex-fill">
                        <div className="card-header">CPM</div>
                        <div className="card-body">
                            <BPMControl bpm={bpm} onBpmChange={onBpmChange} />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4 d-flex">
                    <div className="card control-card flex-fill">
                        <div className="card-header">Volume</div>
                        <div className="card-body">
                            <VolumeControl onVolumeChange={onVolumeChange} />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4 d-flex">
                    <div className="card control-card flex-fill">
                        <div className="card-header">Mute</div>
                        <div className="card-body">
                            <MuteControls onMuteChange={onMuteChange} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DJControls;
