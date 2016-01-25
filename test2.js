// Adapted from http://blog.sethladd.com/2011/09/box2d-javascript-example-walkthrough.html

// TODO: move common code to somewhere else

var Test2 = {};

// This is a bit messy
var gravityMagnitude = 50;
var bodies = [];
var isNBody = false;

var bodyDef, fixDef;

(function() {
Test2.setup = function () {
	// World
	world = new b2World(new b2Vec2(0, gravityMagnitude), true); // gravity, sleep
	
	// Ground {{{
	// Fixture definition and shape
	fixDef = new b2FixtureDef();
	fixDef.density = 1.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.2;
	fixDef.shape = new b2PolygonShape();
	fixDef.shape.SetAsBox(CANVAS_WIDTH / SCALE / 2, 10 / SCALE / 2);
	
	bodyDef = new b2BodyDef();
	bodyDef.type = b2Body.b2_staticBody;
	
	bodyDef.position.x = CANVAS_WIDTH / 2 / SCALE;
	bodyDef.position.y = CANVAS_HEIGHT / SCALE;
	world.CreateBody(bodyDef).CreateFixture(fixDef); // Ground 1
	bodyDef.position.y = 0;
	world.CreateBody(bodyDef).CreateFixture(fixDef); // Ground 2
	
	fixDef.shape.SetAsBox(10 / SCALE / 2, CANVAS_WIDTH / SCALE / 2);
	bodyDef.position.x = 0;
	bodyDef.position.y = CANVAS_HEIGHT / 2 / SCALE;
	world.CreateBody(bodyDef).CreateFixture(fixDef); // Ground 3
	bodyDef.position.x = CANVAS_WIDTH / SCALE;
	world.CreateBody(bodyDef).CreateFixture(fixDef); // Ground 4
	// }}}
	
	// Bodies {{{
	this.addRandom(10);
	// }}}
	
	// Player {{{
	// bodyDef.type = b2Body.b2_kinematicBody;
	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2PolygonShape();
	fixDef.shape.SetAsBox(10 / SCALE / 2, 10 / SCALE / 2);
	bodyDef.position.x = CANVAS_WIDTH / 2 / SCALE;
	bodyDef.position.y = CANVAS_HEIGHT / 2 / SCALE;
	this.player = world.CreateBody(bodyDef).CreateFixture(fixDef).GetBody();
	// }}}

	// Events
	document.body.addEventListener("keydown", this.handleKeyDown.bind(this));
	document.body.addEventListener("keyup", this.handleKeyUp.bind(this));
};

Test2.update = function() {

	if (kb.isKeyDown("d")) {
		this.move(this.player, 1);
	}
	if (kb.isKeyDown("a")) {
		this.move(this.player, 2);
	}
	if (kb.isKeyDown("w")) {
		this.move(this.player, 3);
	}
	if (kb.isKeyDown("s")) {
		this.move(this.player, 4);
	}

	if (isNBody) {
		this.nBody();
	}
};

Test2.handleKeyDown = function(e) {
	kb.handleKeyDown(e);
	if (kb.isKeyDown("+") || kb.isKeyDown("=")) {
		this.setGravity(0, gravityMagnitude);
		console.log("Gravity up");
	}
	else if (kb.isKeyDown("-")) {
		this.setGravity(0, -gravityMagnitude);
		console.log("Gravity down");
	}
	else if (kb.isKeyDown("[")) {
		this.setGravity(-gravityMagnitude, 0);
		console.log("Gravity left");
	}
	else if (kb.isKeyDown("]")) {
		this.setGravity(gravityMagnitude, 0);
		console.log("Gravity right");
	}
	else if (kb.isKeyDown("0")) {
		this.setGravity(0, 0);
		console.log("Gravity falls");
	}
	else if (kb.isKeyDown("n")) {
		isNBody = !isNBody;
		console.log("n-Body simulation " + isNBody);
	}
};

Test2.handleKeyUp = function(e) {
	kb.handleKeyUp(e);
};

Test2.addRandom = function(n) {
	n = n || 1;

	bodyDef.type = b2Body.b2_dynamicBody;
	for (var i = 0; i < n; ++i) {
	    if (Math.random() > 0.5) {
	        fixDef.shape = new b2PolygonShape();
	        fixDef.shape.SetAsBox(
	              Math.random() + 0.1 // half width
	           ,  Math.random() + 0.1 // half height
	        );
	    } else {
	        fixDef.shape = new b2CircleShape(Math.random() + 0.1); // radius
	    }
	    bodyDef.position.x = Math.random() * 25;
	    bodyDef.position.y = Math.random() * 10;
	    bodies.push(world.CreateBody(bodyDef).CreateFixture(fixDef).GetBody());
	}
}

/*
 * dir:
 *   1: right
 *   2: left
 *   3: jump
 *   4: stomp
 */
Test2.move = function(body, dir) {
	var center = body.GetWorldCenter();

	var right = new b2Vec2(0.1, 0);
	var left = new b2Vec2(-0.1, 0);
	var jump = new b2Vec2(0, -0.5);
	var stomp = new b2Vec2(0, 0.5);

	var impulse = [right, left, jump, stomp][dir - 1];
	// TODO: jump and stomp check if player is on ground

	body.ApplyImpulse(impulse, center)
};

Test2.setGravity = function(x, y) {
	world.SetGravity(new b2Vec2(x, y));
	this.wakeAll();
};

Test2.wakeAll = function() {
	this.player.SetAwake(true);
	for (var i in bodies) {
		bodies[i].SetAwake(true);
	}
}

Test2.nBody = function() {
	for (var i in bodies) {
		for (var j in bodies) {
			var b1 = bodies[i];
			var b2 = bodies[j];

			if (b1 != b2) {
				var F_g = calculateGravity(b1, b2);
				b1.ApplyForce(F_g, b1.GetWorldCenter())
			}
		}
	}
}

})();
