import { useState } from "react";

// Counter for preset number.
let presetCounter = 1;

// Takes in preProcessText and onApplyPreset passed from App.js.
export default function Presets({ preProcessText, onApplyPreset }) {
    const defaultPreset = { name: "default", text: preProcessText };
    const [presetList, setPresetList] = useState([defaultPreset]);
    const [presetName, setPresetName] = useState("default");

    /**
     * Loads the preset selected.
     * Loops through all saved presets and looks for the preset with the matching name to the parameter name.
     * Returns the pre process text that matches.
     */
    const loadPreset = (name) => {
        let text = "";
        presetList.forEach((preset) => {
            if (preset.name === name) {
                text = preset.text;
            }
        });
        return text;
    };
 
    /**
     * Saves/Overwrites the preset selected.
     * Loops through all the saved presets.
     * If the current preset.name matches the selected presetName then 
     */
    const savePreset = () => {
        setPresetList((presetList) =>
            presetList.map((preset) =>
                {if (preset.name === presetName) {
                    return { ...preset, text: preProcessText }
                } else {
                    return preset;
                }
                }
            ) 
        );
    };

    /** 
     * Adds a preset to the presetList and sets new preset name.
    */
    const addPreset = () => {
        const name = `Preset ${presetCounter++}`;
        setPresetList((presetList) => [...presetList, { name, text: preProcessText }]);
        setPresetName(name);
    };

    return (
        <div>
        <select className="form-select m-1" value={presetName} onChange={(e) => setPresetName(e.target.value)}>
            {presetList.map((preset) => (
                <option key={preset.name} value={preset.name}>
                    {preset.name}
                </option>
            ))}
        </select>
        <button className="btn btn-success m-1" onClick={() => onApplyPreset(loadPreset(presetName))}>Load</button>
        <button className="btn btn-warning m-1" onClick={savePreset}>Save</button>
        <button className="btn btn-primary m-1" onClick={addPreset}>Add</button>
        </div>
    );
}