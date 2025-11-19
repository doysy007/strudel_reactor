import React from 'react';

function PatternControl({ onDrumPatternChange, onBassPatternChange, drumPattern, bassPattern }) {
    return (
        <>
            <label className="form-label">Drums</label>
            <select className="form-select mb-3" value={drumPattern} onChange={(e) => onDrumPatternChange((e.target.value))}>
                <option value="0">Pattern 0</option>
                <option value="1">Pattern 1</option>
                <option value="2">Pattern 2</option>
            </select>
            <label className="form-label">Bassline</label>
            <select className="form-select" value={bassPattern} onChange={(e) => onBassPatternChange((e.target.value))}>
                <option value="0">Pattern 0</option>
                <option value="1">Pattern 1</option>
            </select>
        </>
    );
}

export default PatternControl;