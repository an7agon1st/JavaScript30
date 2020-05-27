const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
// const snap = document.querySelector('.snap');

function getVideo() {

    // we need to launch a server to get the media from local source or use a trusted source i.e https or localhost
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((localMediaStream => {
            // console.log(localMediaStream);
            video.srcObject = (localMediaStream);
            video.play();
        }))
}

function takePhoto() {
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');

    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" alt="Handsome Man" />`
    strip.insertBefore(link, strip.firstChild)
}

function setToCanvas() {
    console.dir(video);
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.height = height;
    canvas.width = width;

    // console.log(width, height);

    setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);
        // pixels = tintRed(pixels);
        // pixels = rgbShift(pixels);
        pixels = greenScreen(pixels)
        ctx.globalAlpha=0.09;

        ctx.putImageData(pixels, 0, 0);
    }, 16);

}

function tintRed(pixels) {
    // pixel data is in the form
    // 0 -> red
    // 1 -> green
    // 2 -> blue
    // 3 -> alpha
    // console.log(pixels.data[0]);
    // debugger;
    for (let i = 0; i < pixels.data.length; i += 4) {
        // red
        pixels.data[i + 0] += 50
        // green
        pixels.data[i + 1] -= 20
        // blue
        pixels.data[i + 2] -= 20
    }
    return pixels;
}

function rgbShift(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        // red
        pixels.data[i - 150] = pixels.data[i + 0]
        // green
        pixels.data[i + 500] = pixels.data[i + 1]
        // blue
        pixels.data[i + 550] = pixels.data[i + 2]
    }
    return pixels;
}


function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
      levels[input.name] = input.value;
    });

    for (i = 0; i < pixels.data.length; i = i + 4) {
      red = pixels.data[i + 0];
      green = pixels.data[i + 1];
      blue = pixels.data[i + 2];
      alpha = pixels.data[i + 3];

      if (red >= levels.rmin
        && green >= levels.gmin
        && blue >= levels.bmin
        && red <= levels.rmax
        && green <= levels.gmax
        && blue <= levels.bmax) {
        // take it out!
        pixels.data[i + 3] = 0;
      }
    }

    return pixels;
  }


getVideo();

// draw the video to canvas as soon as the player is ready
video.addEventListener('canplay', setToCanvas)