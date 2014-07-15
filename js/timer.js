/*! pres-timer - v0.0.1 Build date: 2014-07-15 *///The Timer class

function Timer()
{
	self = this;

	//Object properties

	this.interval = 1000;
	this.paused = false;
	this.defaultTime = 60; //Default time, this is where the this.stop() resetsthe timer after stopping
	this.remainingTime = this.defaultTime; //Sets timer to defaultTime on instantiation (first run)
	this.timeArray = {};
	this.timerWindow = window;


	this.build = function(windowPath, windowName) {
		var tick = new CustomEvent('tick', {'detail': {'name': 'tick'}});
		console.log(tick);
		if(!windowName)
		{
			windowName = '';
		}
		//var theWindow = window.open(windowPath, windowName, '_blank', 'menubar=no, location=no, status=no, titlebar=no, toolbar=no' );
		//this.timerWindow = theWindow;
		//console.log(this.timerWindow);
		this.timerWindow.addEventListener('tick', function(){
			console.log('tick');
		});
	};

	//The main method that performs the countdown
	//It's recursive! Don't be stupid with it!
	this.tick = function() {
		if(this.paused !== true && this.remainingTime > 0)
		{
			this.remainingTime -= 1;
			console.log(this.remainingTime);
			this.timeArray = this.convertTime(this.remainingTime);
			this.timerWindow.dispatchEvent(tick);
			this.timerWindow.setTimeout('self.tick()', this.interval);
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

	//Converts any time given to it in seconds to h-m-s in an object
	this.convertTime = function(sec) {
		var seconds = sec % 60;
		var minutes = Math.floor(sec/60);
		var hours = Math.floor(sec/3600);
		var result = {'hours': hours, 'minutes': minutes, 'seconds': seconds};
		return result;
	};

	//Start the countdown
	//This doesn't reset the timer, just starts whit whatever remainingTime is currently set 
	this.start = function() {
		this.paused = false;
		this.tick();
		return true;
	};

	this.pause = function() {
		this.paused = true;
		return true;
	};

	this.stop = function() {
		this.pause();
		this.setInterval(1000);
		this.setTime(this.defaultTime); //Reset the timer
	};

}

var timer = new Timer();