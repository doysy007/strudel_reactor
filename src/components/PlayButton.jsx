// Play and Stop buttons for controlling playback.
// When either button is clicked it calls the onPlay and onStop handlers from App.js.

function PlayButton( { onPlay, onStop } ) {
    return (
        <>
        <div className="btn-group" role="group" aria-label="Play Controls">
            <button id="play" className="btn btn-outline-success" onClick={onPlay}>&#x25B6;</button>
            <button id="stop" className="btn btn-outline-danger" onClick={onStop}>&#x25A0;</button>
        </div>
        </>
    );
}

export default PlayButton;