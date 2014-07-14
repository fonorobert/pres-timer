//The Timer class

function Timer()
{
	self = this;

	//Object properties

	this.interval = 1000;
	this.paused = false;
	this.defaultTime = 60; //Default time, this is where the this.stop() resetsthe timer after stopping
	this.remainingTime = this.defaultTime; //Sets timer to defaultTime on instantiation (first run)
	this.timerWindow = window;

	//The main method that performs the countdown
	//It's recursive! Don't be stupid with it!

	this.tick = function() {
		if(this.paused !== true && this.remainingTime > 0)
		{
			this.remainingTime -= 1;
			console.log(this.remainingTime);
			this.timerWindow.setTimeout('self.tick()', this.interval);
		} else {
			return false;
		}
	}

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
	}

	//Set the countdown period.

	this.setTime = function(time) {
		if(time)
		{
			this.remainingTime = time;
			return true;
		} else {
			return false;
		}
	}

	//Start the countdown
	//This doesn't reset the timer, just starts whit whatever remainingTime is currently set 
	this.start = function() {
		this.paused = false;
		this.tick();
		return true;
	}

	this.pause = function() {
		this.paused = true;
		return true;
	}

	this.stop = function() {
		this.pause();
		this.setInterval(1000);
		this.setTime(this.defaultTime); //Reset the timer
	}

};

var timer = new Timer();