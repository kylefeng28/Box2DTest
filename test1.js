// Adapted from http://blog.sethladd.com/2011/09/box2d-javascript-example-walkthrough.html

var Test1 = {};

(function() {
Test1.setup = function () {
	// World
	world = new b2World(new b2Vec2(0, 50), true); // gravity, sleep
	
	// Ground {{{
	// Fixture definition and shape
	_fixDef.density = 1.0;
	_fixDef.friction = 0.5;
	_fixDef.restitution = 0.2;
	_fixDef.shape = new b2PolygonShape();
	_fixDef.shape.SetAsBox(CANVAS_WIDTH / SCALE / 2, 10 / SCALE / 2);
	
	_bodyDef.type = b2Body.b2_staticBody;
	
	_bodyDef.position.x = CANVAS_WIDTH / 2 / SCALE;
	_bodyDef.position.y = CANVAS_HEIGHT / SCALE;
	this.ground1 = world.CreateBody(_bodyDef).CreateFixture(_fixDef);
	_bodyDef.position.y = 0;
	this.ground2 = world.CreateBody(_bodyDef).CreateFixture(_fixDef);
	
	_fixDef.shape.SetAsBox(10 / SCALE / 2, CANVAS_WIDTH / SCALE / 2);
	_bodyDef.position.x = 0;
	_bodyDef.position.y = CANVAS_HEIGHT / 2 / SCALE;
	this.ground3 = world.CreateBody(_bodyDef).CreateFixture(_fixDef);
	_bodyDef.position.x = CANVAS_WIDTH / SCALE;
	this.ground4 = world.CreateBody(_bodyDef).CreateFixture(_fixDef);
	// }}}
	
	// Bodies {{{
	this.bodies = [];
	_bodyDef.type = b2Body.b2_dynamicBody;
	for (var i = 0; i < 10; ++i) {
	    if (Math.random() > 0.5) {
	        _fixDef.shape = new b2PolygonShape;
	        _fixDef.shape.SetAsBox(
	              Math.random() + 0.1 // half width
	           ,  Math.random() + 0.1 // half height
	        );
	    } else {
	        _fixDef.shape = new b2CircleShape(Math.random() + 0.1); // radius
	    }
	    _bodyDef.position.x = Math.random() * 25;
	    _bodyDef.position.y = Math.random() * 10;
	    bodies.push(world.CreateBody(_bodyDef).CreateFixture(_fixDef));
	}
	// }}}
	
}

Test1.update = function() {
}
})();
