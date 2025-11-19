# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Components

### PreProcessText
The preprocess text is used to update the strudel output text box so users can fine tune their music and are not limited to the audio controls.

### DJControls
The DJControls is the parent component which holds all the controls which edit and change the way the song can sound. Child components in it are the MuteControls, PatternControl, BPMControl and VolumeControl child components.

### MuteControls
The MuteControls can mute each instrument in the song using a switch input button.

### PatternControl
The PatternControl allows uers to change the tune of the bassline instrument and the drums by selecting the pattern listed from the select list under bassline and drums.

### BPMControl
The BPM control allows users to change the BPM of the song.

### Volume Control
The Volume control allow susers to adjust the volume using a slider for each instrument or all instruments if they would like. The user can select the instrument they desire to mute in a select list.

## App.js

The App.js holds most of the state and use effects. 

This file allows the user to: 
- Play and stop the song
- Expand either the strudel text or preprocess text for better visibility
- Navigate to the DJControls component section
- Load, Save or Add a preset
- See Ned Flanders dancing when while the song is playing
- Apply changes to the song in real time without stopping and playing the song again
- Apply just the preprocess text changes

### Video Demonstartion
Video goes over the functionality of the website.
Link: https://youtu.be/0VdjtvrpYYI