// Get elements
const player = document.querySelector('.player'),
	video = player.querySelector('.viewer'),
	progress = player.querySelector('.progress'),
	progressBar = player.querySelector('.progress__filled'),
	toggle = player.querySelector('.toggle'),
	skipButtons = player.querySelectorAll('[data-skip]'),
	ranges = player.querySelectorAll('.player__slider');

// Build functions
function togglePlay() {
	if (video.paused) {
		video.play();
	}
	else {
		video.pause();
	}
}

function updateButton() {
	toggle.textContent = (this.paused ? '►' : '❚ ❚');
}

function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
	video[this.name] = this.value;
}

function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

// Hook up the event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(function(skipButton) {
	skipButton.addEventListener('click', skip);
});

ranges.forEach(function(range) {
	range.addEventListener('change', handleRangeUpdate);
});

let mousedown = false;
progress.addEventListener('mousedown', function() {mousedown = true;});
progress.addEventListener('mouseup', function() {mousedown = false;});
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', function(e) {
	return mousedown && scrub(e);
});