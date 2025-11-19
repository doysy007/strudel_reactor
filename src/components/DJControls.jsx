import React from 'react';
import BPMControl from './BPMControl';
import MuteControls from './MuteControls';
import VolumeControl from './VolumeControl';
import PatternControl from './PatternControl';

// Parent component for BPMControl, MuteControls and VolumeControl.
// Displays the control components in a boostrap card layout.
function DJControls({ bpm, onBpmChange, onMuteChange, onVolumeChange, onDrumPatternChange, onBassPatternChange, drumPattern, bassPattern }) {
    return (
        <div className="container-fluid">
            <div className="row g-3 align-items-stretch">
                <div className="col-12 col-md-4 d-flex">
                    <div className="card control-card flex-fill">
                        <div className="card-header">BPM</div>
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
                <div className="col-12 col-md-4 d-flex">
                    <div className="card control-card flex-fill">
                        <div className="card-header">Drum & Bass Pattern</div>
                        <div className="card-body">
                            <PatternControl 
                                onDrumPatternChange={onDrumPatternChange} 
                                onBassPatternChange={onBassPatternChange}
                                drumPattern={drumPattern}
                                bassPattern={bassPattern}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DJControls;
