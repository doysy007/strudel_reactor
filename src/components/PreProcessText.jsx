// Sets the text area to the current song text.
// Whenever the text area is changed it calls onChange to update the song text in App.js.

function PreProcessText({value, onChange}) {
    return (
        <>
            <textarea 
                className="form-control" 
                rows="20" 
                value={value} 
                onChange={onChange} 
                id="proc"
            >
            </textarea>
        </>
    );
}

export default PreProcessText;
