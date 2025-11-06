// Sets the text area to the current song text.
// Whenever the text area is changed it calls onChange to update the song text in App.js.

function PreProcessText({defaultValue, onChange}) {
    return (
        <>
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>
            <textarea 
                className="form-control" 
                rows="15" 
                defaultValue={defaultValue} 
                onChange={onChange} 
                id="proc" >
            </textarea>
        </>
    );
}

export default PreProcessText;