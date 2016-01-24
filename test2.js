// Adapted from http://blog.sethladd.com/2011/09/box2d-javascript-example-walkthrough.html

var Test2 = {};

(function() {
Test2.setup = function () {
	// World
	world = new b2World(new b2Vec2(0, 50), true); // gravity, sleep
	
	// Ground {{{
	// Fixture definition and shape
	var fixDef = new b2FixtureDef();
	fixDef.density = 1.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.2;
	fixDef.shape = new b2PolygonShape();
	fixDef.shape.SetAsBox(CANVAS_WIDTH / SCALE / 2, 10 / SCALE / 2);
	
	var bodyDef = new b2BodyDef();
	bodyDef.type = b2Body.b2_staticBody;
	
	bodyDef.position.x = CANVAS_WIDTH / 2 / SCALE;
	bodyDef.position.y = CANVAS_HEIGHT / SCALE;
	var ground1 = world.CreateBody(bodyDef).CreateFixture(fixDef);
	bodyDef.position.y = 0;
	var ground2 = world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(10 / SCALE / 2, CANVAS_WIDTH / SCALE / 2);
	bodyDef.position.x = 0;
	bodyDef.position.y = CANVAS_HEIGHT / 2 / SCALE;
	var ground3 = world.CreateBody(bodyDef).CreateFixture(fixDef);
	bodyDef.position.x = CANVAS_WIDTH / SCALE;
	var ground4 = world.CreateBody(bodyDef).CreateFixture(fixDef);
	// }}}
	
	// Bodies {{{
	var bodies = [];
	bodyDef.type = b2Body.b2_dynamicBody;
	for (var i = 0; i < 10; ++i) {
	    if (Math.random() > 0.5) {
	        fixDef.shape = new b2PolygonShape;
	        fixDef.shape.SetAsBox(
	              Math.random() + 0.1 // half width
	           ,  Math.random() + 0.1 // half height
	        );
	    } else {
	        fixDef.shape = new b2CircleShape(Math.random() + 0.1); // radius
	    }
	    bodyDef.position.x = Math.random() * 25;
	    bodyDef.position.y = Math.random() * 10;
	    bodies.push(world.CreateBody(bodyDef).CreateFixture(fixDef));
	}
	// }}}
	
	// Player {{{
	// bodyDef.type = b2Body.b2_kinematicBody;
	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2PolygonShape();
	fixDef.shape.SetAsBox(10 / SCALE / 2, 10 / SCALE / 2);
	bodyDef.position.x = CANVAS_WIDTH / 2 / SCALE;
	bodyDef.position.y = CANVAS_HEIGHT / 2 / SCALE;
	this.player = world.CreateBody(bodyDef).CreateFixture(fixDef);
	// }}}

	// Events
	document.body.addEventListener("keydown", this.handleKeyDown.bind(this));
	document.body.addEventListener("keyup", this.handleKeyUp.bind(this));
}

Test2.update = function() {
	// TODO: make function move(vec)
	var playerBody = this.player.GetBody();
	var worldCenter = playerBody.GetWorldCenter();

	var right = new b2Vec2(0.1, 0);
	var left = new b2Vec2(-0.1, 0);
	var jump = new b2Vec2(0, -1);
	var stomp = new b2Vec2(0, 1);

	if (kb.isKeyDown("d")) {
		playerBody.ApplyImpulse(right, worldCenter);
	}
	if (kb.isKeyDown("a")) {
		playerBody.ApplyImpulse(left, worldCenter);
	}
	if (kb.isKeyDown("Space")) {
		playerBody.ApplyImpulse(jump, worldCenter);
	}
}

Test2.handleKeyDown = function(e) {
	kb.handleKeyDown(e);
}

Test2.handleKeyUp = function(e) {
	kb.handleKeyUp(e);
}
})();
