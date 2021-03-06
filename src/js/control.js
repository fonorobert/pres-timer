//The class managing the conrtol window
function Control() {
	that = this;
	this.timerWindow = window;

	this.build = function() {
		var start = document.querySelector('#start');
		var pause = document.querySelector('#pause');
		var stop = document.querySelector('#stop');
		var interval = document.querySelector('input[name="interval"]');
		var setTime = document.querySelector('#setTime');
		var sendMessage = document.querySelector('button#sendMessage');
		var clearMessage = document.querySelector('button#clearMessage');

		window.addEventListener('tick', function(e){
			var time = e.detail;
			that.writeTime(time);
		});

		interval.addEventListener('change', function(){
			var setInterval = new CustomEvent('setInterval', {'detail': that.readInterval()});
			window.dispatchEvent(setInterval);
		});

		setTime.addEventListener('click', function(){
			var setTimeEvent = new CustomEvent('setTime', {'detail': that.readTime()});
			window.dispatchEvent(setTimeEvent);
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

			var setTime = new CustomEvent('setTime', {'detail': that.readTime()});
			window.dispatchEvent(setTime);
		});

		sendMessage.addEventListener('click', function(){
			that.sendMessage();
		});

		clearMessage.addEventListener('click', function(){
			that.clearMessage();
		});


		//Initial setTime - tick event pair to show time on launch
		var setTimeEvent = new CustomEvent('setTime', {'detail': this.readTime()});
		window.dispatchEvent(setTimeEvent);


	};

	//Format time given to it in an array to have '0' ahead of one character numbers
	this.formatTime = function(timeObject) {
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
	
	//Write the current remaining time to the .counter div
	this.writeTime = function(time) {
		var counter = document.querySelector('#counter_control');
		time = this.formatTime(time);
		counter.innerHTML = time.hours + ':' + time.minutes + ':' + time.seconds;
	};

	//Read the set time from the inputs
	this.readTime = function() {
		var hours = document.querySelector('input[name="hours"]').value;
		var minutes = document.querySelector('input[name="minutes"]').value;
		var seconds = document.querySelector('input[name="seconds"]').value;
		if (hours === ''|| hours === null || hours === undefined)
		{
			hours = 0;
		}
		if (minutes === ''|| minutes === null || minutes === undefined)
		{
			minutes = 0;
		}
		if (seconds === ''|| seconds === null || seconds === undefined)
		{
			seconds = 0;
		}

		var time = {'hours': hours, 'minutes': minutes, 'seconds': seconds};
		return time;
	};

	this.readInterval = function() {
		var interval = document.querySelector('input[name="interval"]').value;
		return interval;
	};

	this.sendMessage = function() {
		var message = document.querySelector('input[name="message"]');
		message.disabled = true;
		var msgEvent = new CustomEvent('sendMessage', {'detail': message.value});
		that.timerWindow.dispatchEvent(msgEvent);
	};

	this.clearMessage = function() {
		var message = document.querySelector('input[name="message"]');
		message.value = "";
		message.disabled = false;
		var msgEvent = new CustomEvent('sendMessage', {'detail': ""});
		that.timerWindow.dispatchEvent(msgEvent);
	};
	
}