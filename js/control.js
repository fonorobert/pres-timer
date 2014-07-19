/*! pres-timer - v0.0.1 Build date: 2014-07-19 *///The Timer class

function Timer()
{
	self = this;

	//Object properties

	this.interval = 1000;
	this.paused = false;
	this.defaultTime = 60; //Default time, this is where the this.stop() resets the timer after stopping
	this.remainingTime = this.defaultTime; //Sets timer to defaultTime on instantiation (first run)
	this.timeArray = {};
	this.timerWindow = window;
	this.controlWindow = window;

	this.build = function(windowPath, windowName) {
		
		//Prepare and open the countdown display window
		if(!windowName)
		{
			windowName = '';
		}
		if(!windowPath)
		{
			windowPath = 'display.html';
		}
		var theWindow = window.open(windowPath, windowName, '_blank', 'menubar=no, location=no, status=no, titlebar=no, toolbar=no' );
		this.timerWindow = theWindow;

		this.controlWindow.addEventListener('start', function(){
			self.start();
		});
		this.controlWindow.addEventListener('pause', function(){
			self.pause();
		});
		this.controlWindow.addEventListener('stop', function(){
			self.stop();
		});
		this.controlWindow.addEventListener('setTime', function(e){
			var time = parseInt(e.detail.hours) * 3600 + parseInt(e.detail.minutes) * 60 + parseInt(e.detail.seconds);
			self.setTime(time);
			self.timeArray = self.convertTime(self.remainingTime);
			self.tickEvent();
		});
		this.controlWindow.addEventListener('setInterval', function(e){
			var interval = e.detail;
			self.setInterval(interval);
		});
		this.timerWindow.addEventListener('getTime', function(){
			self.tickEvent();
		});
		this.controlWindow.addEventListener('sendMessage', function(e){
			self.writeMessage(e.detail);
		});

	};

	this.tickEvent = function() {
		var tick = new CustomEvent('tick', {'detail': this.timeArray});
		this.controlWindow.dispatchEvent(tick);
		this.timerWindow.dispatchEvent(tick);
	};

	//The main method that performs the countdown
	//It's recursive! Don't be stupid with it!
	this.tick = function() {
		if (this.remainingTime === 120)
		{
			this.twoMins();
		}
		if(this.paused !== true && this.remainingTime > 0)
		{
			this.remainingTime -= 1;
			//console.log(this.remainingTime);
			this.timeArray = this.convertTime(this.remainingTime);
			this.tickEvent();
			this.controlWindow.setTimeout('self.tick()', this.interval);
			if (this.remainingTime <= 0)
			{
				this.timeUp();
			}
		} else {
			return false;
		}
	};

	//Set the speed of the countdown
	//Default is 1000ms = 1s
	//This means a tick will happen every second
	this.setInterval = function(interval) {
		if(interval)
		{
			this.interval = interval;
			return true;
		} else {
			return false;
		}
	};

	//Set the countdown period.

	this.setTime = function(time) {
		if(time)
		{
			this.remainingTime = time;
			return true;
		} else {
			return false;
		}
	};

	//Converts any time given to it in seconds to h-m-s in an array
	this.convertTime = function(sec) {
		var seconds = sec % 60;
		var minutes = Math.floor(sec % 3600 / 60);
		var hours = Math.floor(sec / 3600);		
		var result = {'hours': hours, 'minutes': minutes, 'seconds': seconds};
		return result;
	};

	//Converts any array that has time under 'seconds', 'minutes' and 'hours' keys to seconds
	this.decodeTime = function(time){
		var sec = time.hours *3600 + time.minutes * 60 + time.seconds;
		return sec;
	};

	//Start the countdown
	//This doesn't reset the timer, just starts whit whatever remainingTime is currently set 
	this.start = function() {
		this.paused = false;
		var start = new Event('start');
		self.timerWindow.dispatchEvent(start);
		this.tick();
		return true;
	};

	this.pause = function() {
		this.paused = true;
		var pause = new Event('pause');
		self.timerWindow.dispatchEvent(pause);
		return true;
	};

	this.stop = function() {
		this.pause();
		this.setInterval(1000);
		this.setTime(this.defaultTime); //Reset the timer
		var stop = new Event('stop');
		self.timerWindow.dispatchEvent(stop);
	};

	this.timeUp = function() {
		var timeUp = new Event('timeUp');
		self.timerWindow.dispatchEvent(timeUp);
	};
	this.twoMins = function() {
		var twoMins = new Event('twoMins');
		self.timerWindow.dispatchEvent(twoMins);
	};

	this.writeMessage = function(message) {
		var displayMessage = new CustomEvent('displayMessage', {'detail': message});
		this.timerWindow.dispatchEvent(displayMessage);
	};

}
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