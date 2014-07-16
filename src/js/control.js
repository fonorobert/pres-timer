//The class managing the conrtol window
function Control() {
	that = this;

	this.build = function() {
		var start = document.querySelector('#start');
		var pause = document.querySelector('#pause');
		var stop = document.querySelector('#stop');
		var interval = document.querySelector('input[name="interval"]');
		var setTime = document.querySelector('#setTime');
		
		window.addEventListener('tick', function(e){
			var time = e.detail;
			that.writeTime(time);
		});

		interval.addEventListener('change', function(){
			var setInterval = new CustomEvent('setInterval', {'detail': that.readInterval()});
			window.dispatchEvent(setInterval);
		});

		setTime.addEventListener('click', function(){
			var setTime = new CustomEvent('setTime', {'detail': that.readTime()});
			window.dispatchEvent(setTime);
		});

		start.addEventListener('click', function(){
			var startTimer = new Event('start');
			window.dispatchEvent(startTimer);
		});

		pause.addEventListener('click', function(){
			var pauseTimer = new Event('pause');
			window.dispatchEvent(pauseTimer);
		});

		stop.addEventListener('click', function(){
			var stopTimer = new Event('stop');
			window.dispatchEvent(stopTimer);
		});



	};
	
	//Write the current remaining time to the #counter div
	this.writeTime = function(time) {
		var counter = document.querySelector('#counter');
		counter.innerHTML = time.hours + ':' + time.minutes + ':' + time.seconds;
	};

	//Read the set time from the inputs
	this.readTime = function() {
		var hours = document.querySelector('input[name="hours"]').value;
		var minutes = document.querySelector('input[name="minutes"]').value;
		var seconds = document.querySelector('input[name="seconds"]').value;
		var time = {'hours': hours, 'minutes': minutes, 'seconds': seconds};
		return time;
	};

	this.readInterval = function() {
		var interval = document.querySelector('input[name="interval"]').value;
		return interval;
	};

	
}