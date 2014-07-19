/*! pres-timer - v0.0.1 Build date: 2014-07-19 */var disp_formatTime = function(timeObject) {
		for(var k in timeObject)
		{
			timeObject[k] = parseInt(timeObject[k]);
		}
		for(var key in timeObject)
		{
			if(timeObject[key] < 10 || timeObject[key].length < 2)
			{
				timeObject[key] = '0' + timeObject[key];
			}
		}
		return timeObject;
	};
	

var disp_writeTime = function(time) {
	var counter = document.querySelector('#counter_display');
	time = disp_formatTime(time);
	if (time.hours !== '00')
	{
		counter.innerHTML = time.hours + ':' + time.minutes + ':' + time.seconds;
	} else {
		counter.innerHTML = time.minutes + ':' + time.seconds;
	}
};

window.addEventListener('tick', function(e){
			var time = e.detail;
			disp_writeTime(time);
});

window.addEventListener('displayMessage', function(e){
	var message = e.detail;
	document.querySelector('#helpMessage').innerHTML=message;
});

window.addEventListener('pause', function(){
	var counter = document.querySelector('#counter_display');
	counter.classList.add('paused');
});

window.addEventListener('start', function(){
	var counter = document.querySelector('#counter_display');
	counter.classList.remove('paused');
	counter.classList.remove('timeup');
});
window.addEventListener('stop', function(){
	var counter = document.querySelector('#counter_display');
	counter.classList.remove('paused');
	counter.classList.remove('timeup');
	counter.classList.remove('twoMins');
});

window.addEventListener('timeUp', function(){
	var counter = document.querySelector('#counter_display');
	counter.classList.remove('twoMins');
	counter.classList.add('timeup');
});
window.addEventListener('twoMins', function(){
	var counter = document.querySelector('#counter_display');
	counter.classList.add('twoMins');
});


var getTime = new Event('getTime');
window.dispatchEvent(getTime);