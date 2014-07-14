//The Timer class

function Timer()
{
	self = this;
	//Object properties

	this.interval = 1000;
	this.paused = false;
	this.remainingTime = 0;
	this.timerWindow = window;

	//The main method the performs the countdown
	//It's recursive! Don't be stupidwith it!

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

	this.setInterval = function(interval) {
		if(interval)
		{
			this.interval = interval;
			return true;
		} else {
			return false;
		}
	}

	this.start = function() {
		this.tick();
		return true;
	}

	this.pause = function() {
		this.paused = true;
		return true;
	}

	this.setTime = function(time) {
		if(time)
		{
			this.remainingTime = time;
			return true;
		} else {
			return false;
		}
	}

};

var timer = new Timer();

timer.setTime(60);
timer.start();
