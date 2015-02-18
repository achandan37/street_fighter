function PlayGround(selector_ch1)
{
	// plays audio
	var audio = new Audio('audio/streetfighter.mp3');
	audio.play();

	//create the first character
	var ch1 = new Character(selector_ch1);
	
	//attaches event listener to the document listening for key strokes
	this.initialize = function()
	{
		$(document).keydown(function(e) {
			var arrayofkeys={39: "WALK_RIGHT", 37: "WALK_LEFT", 40:"KNEEL", 65: "PUNCH", 83: "KICK", 68:"BEAM", 70:"ROUND_HOUSE", 87:"JUMP"};
			for (keys in arrayofkeys)
				{if(e.keyCode==keys){ch1.updateAction(arrayofkeys[keys])}};
		});
	}

	this.mainLoop = function()
	{
		ch1.drawCharacter();
	}


}	//end of PlayGround class

function Character(selector)
{
	var selector = selector; //store the html id of the character

	var constants = {
		'STANDING': 	{ 'y': 1, 'x': [0, 1, 2, 3] },
		'PUNCH':  		{ 'y': 2, 'x': [0, 1, 2, 3] },
		'WALK_RIGHT': 	{ 'y': 3, 'x': [0, 1, 2] },
		'WALK_LEFT': 	{ 'y': 3, 'x': [2, 3, 4] },
		'KNEEL': 		{ 'y': 9, 'x': [0] },
		'KICK': 		{ 'y': 6, 'x': [0, 1, 2, 3, 4] },
		'PUNCH': 		{ 'y': 2, 'x': [0, 1, 2] },
		'BEAM': 		{ 'y': 0, 'x': [0, 1, 2, 3] },
		'ROUND_HOUSE': 	{ 'y': 7, 'x': [0, 1, 2, 3, 4]},
		'JUMP': 		{ 'y': 8, 'x': [0, 1, 2, 3, 4, 5, 6]}
	}
	var counter = 0;			//stores which sprite (in the x-direction) it should display 
	this.action = "STANDING";	//default action is for the character to stand
	this.ch_x=0;					//x_coordinate of the character
	this.ch_y=0;					//y_coordinate of the character
	//ch_x, ch_y and action could really all be private variables and I could have just done var instead of this. but to make debuggin easier, I am making them an instance variable so that it would display when you log the chracter object

	this.drawSprite = function(y, x)
	{
		$('#'+selector).css('background', "url('images/ken.png') "+x*(-70)+"px "+(-80*y)+"px").css('left', this.ch_x+"px");
	}

	//updates the action
	this.updateAction = function(action)
	{
		counter=0;
		this.action = action;
	}
	//updates the character's coordinates and changes the sprite's counter to simulate the character moving
	this.updateCoordinate = function()
	{
		if(counter>=constants[this.action].x.length)
		{
			counter=0;
			//if action is anything other than 'STANDING' change the action back to 'STANDING'
			this.action = 'STANDING';
		}

		if(this.action == 'WALK_LEFT')
			this.ch_x = this.ch_x-10;
		else if(this.action == 'WALK_RIGHT')
			this.ch_x = this.ch_x+10;
	}

	//draws the character on the screen
	this.drawCharacter = function()
	{
		// console.log("drawing character");
		this.updateCoordinate();
		this.drawSprite(constants[this.action].y, constants[this.action].x[counter++]);
	}
}