var removeColors = function() {
	var counter = document.querySelector('#counter_control');
	counter.classList.remove('paused');
	counter.classList.remove('timeup');
	counter.classList.remove('twoMins');
};

window.addEventListener('rmColors', function(){
	removeColors();
});

window.addEventListener('pause', function(){
	var counter = document.querySelector('#counter_control');
	removeColors();
	counter.classList.add('paused');
});

window.addEventListener('start', function(){
	var counter = document.querySelector('#counter_control');
	removeColors();
});
window.addEventListener('stop', function(){
	var counter = document.querySelector('#counter_control');
	removeColors();
});

window.addEventListener('timeUp', function(){
	var counter = document.querySelector('#counter_control');
	removeColors();
	counter.classList.add('timeup');
});
window.addEventListener('twoMins', function(){
	var counter = document.querySelector('#counter_control');
	counter.classList.add('twoMins');
});