function DJControls() {
    return (
        <>
        <div className="container-fluid">
            <div className="row">
                <div className="input-group mb-3">
                <span className="input-group-text" id="set_cpm">Set</span>
                <input type="text" class="form-control" aria-label="Set CPM Here" id="cpm_text_input"/>
                <span className="input-group-text">CPM</span>
                </div>
                <label for="volume_range" className="form-label">Volume</label>
                <input type="range" className="form-range" min="0" max="10" step="0.1" id="volume_range"/>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexRadioDefault2"/>
                    <label class="form-check-label" for="flexRadioDefault2">Mute</label>
                </div>
            </div>
        </div>
        </>
    );
}

export default DJControls;