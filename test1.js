var Test1 = {};

(function() {
Test1.setup = function () {
	// World
	world = new b2World(new b2Vec2(0, 10), true); // gravity, sleep
	
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
	this.ground1 = world.CreateBody(bodyDef).CreateFixture(fixDef);
	bodyDef.position.y = 0;
	this.ground2 = world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(10 / SCALE / 2, CANVAS_WIDTH / SCALE / 2);
	bodyDef.position.x = 0;
	bodyDef.position.y = CANVAS_HEIGHT / 2 / SCALE;
	this.ground3 = world.CreateBody(bodyDef).CreateFixture(fixDef);
	bodyDef.position.x = CANVAS_WIDTH / SCALE;
	this.ground4 = world.CreateBody(bodyDef).CreateFixture(fixDef);
	// }}}
	
	// Bodies {{{
	this.bodies = [];
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
	
}
})();
