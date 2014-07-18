/*! pres-timer - v0.0.1 Build date: 2014-07-18 */var disp_formatTime = function(timeObject) {
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
	counter.innerHTML = time.hours + ':' + time.minutes + ':' + time.seconds;
};

window.addEventListener('tick', function(e){
			var time = e.detail;
			disp_writeTime(time);
});

var getTime = new Event('getTime');
window.dispatchEvent(getTime);