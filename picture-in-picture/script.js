const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Prompt to select media stream, pass video element, then play
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }
    } catch (error) {
        // Catch Error Handler
        console.log('ERRROR!!!!!', error)
    }
}

button.addEventListener('click', async () => {
    // Disable button
    button.disabled = true;
    // Start pip
    await videoElement.requestPictureInPicture();
    // Reset button
    button.disabled = false;
})

//On load
selectMediaStream()