// getting the elements
const player = document.querySelector('.player');
const viewer = player.querySelector('.viewer');
const toggleButton = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const sliders = player.querySelectorAll('.player__slider');
const progressBar = player.querySelector('.progress');
const currentProgress = player.querySelector('.progress__filled');


// methods
function toggle() {
    const method = viewer.paused ? 'play' : 'pause';
    viewer[method]();
}

function buttonIconUpdate() {
    const icon = !viewer.paused ? '▌▌' : '►';
    toggleButton.innerText = icon;
}

function skipSeconds() {
    viewer.currentTime += parseFloat(this.dataset.skip);
}

function playBackVolume() {
    viewer[this.name] = this.value;
}

function updateProgressFilled() {
    const percent = (viewer.currentTime / viewer.duration) * 100;
    currentProgress.style.flexBasis = `${percent}%`;
}

function scrub(event) {
    const time = (event.offsetX / progressBar.offsetWidth) * viewer.duration;
    viewer.currentTime = time;

}


// listeners
viewer.addEventListener('click', toggle);
viewer.addEventListener('play', buttonIconUpdate);
viewer.addEventListener('pause', buttonIconUpdate);
viewer.addEventListener('timeupdate', updateProgressFilled);

toggleButton.addEventListener('click', toggle);

skipButtons.forEach(btn => btn.addEventListener('click', skipSeconds));

sliders.forEach(slider => slider.addEventListener('mouseup', playBackVolume));

let isClicked = false;
progressBar.addEventListener('mousedown', () => isClicked = true);
progressBar.addEventListener('mouseup', () => isClicked = false)
progressBar.addEventListener('mousemove',(e) => isClicked && scrub(e));
progressBar.addEventListener('click',scrub);
