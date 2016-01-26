// Adapted from http://www.iforce2d.net/embox2d/embox2d-helpers.js

// Having to type 'Box2D.' in front of everything makes porting
// existing C++ code a pain in the butt. This function can be used
// to make everything in the Box2D namespace available without
// needing to do that.
function using(ns, pattern, to) {
	if (to == undefined) {
		to = this;
	}
    if (pattern == undefined) {
        // import all
        for (var name in ns) {
            to[name] = ns[name];
        }
    } else {
        if (typeof (pattern) == "string") {
            pattern = new RegExp(pattern);
        }
        // import only stuff matching given pattern
        for (var name in ns) {
            if (name.match(pattern)) {
                to[name] = ns[name];
            }
        }       
    }
}

function isEqualVV(vec1, vec2) {
	return vec1.x == vec2.x && vec1.y == vec2.y;
}

function randomVec2() {
	return new b2Vec2(Math.random(), Math.random());
}

// http://stackoverflow.com/questions/12792486/emscripten-bindings-how-to-create-an-accessible-c-c-array-from-javascript
function createChainShape(vertices, closedLoop) {
    var shape = new b2ChainShape();            
    var buffer = Box2D.allocate(vertices.length * 8, 'float', Box2D.ALLOC_STACK);
    var offset = 0;
    for (var i=0;i<vertices.length;i++) {
        Box2D.setValue(buffer+(offset), vertices[i].get_x(), 'float'); // x
        Box2D.setValue(buffer+(offset+4), vertices[i].get_y(), 'float'); // y
        offset += 8;
    }            
    var ptr_wrapped = Box2D.wrapPointer(buffer, Box2D.b2Vec2);
    if ( closedLoop )
        shape.CreateLoop(ptr_wrapped, vertices.length);
    else
        shape.CreateChain(ptr_wrapped, vertices.length);
    return shape;
}

function createPolygonShape(vertices) {
    var shape = new b2PolygonShape();            
    var buffer = Box2D.allocate(vertices.length * 8, 'float', Box2D.ALLOC_STACK);
    var offset = 0;
    for (var i=0;i<vertices.length;i++) {
        Box2D.setValue(buffer+(offset), vertices[i].get_x(), 'float'); // x
        Box2D.setValue(buffer+(offset+4), vertices[i].get_y(), 'float'); // y
        offset += 8;
    }            
    var ptr_wrapped = Box2D.wrapPointer(buffer, Box2D.b2Vec2);
    shape.Set(ptr_wrapped, vertices.length);
    return shape;
}

function createRandomPolygonShape(radius) {
    var numVerts = 3.5 + Math.random() * 5;
    numVerts = numVerts | 0;
    var verts = [];
    for (var i = 0; i < numVerts; i++) {
        var angle = i / numVerts * 360.0 * 0.0174532925199432957;
        verts.push( new b2Vec2( radius * Math.sin(angle), radius * -Math.cos(angle) ) );
    }            
    return createPolygonShape(verts);
}

function calculateGravity(body1, body2) {
	// Gravitional fields?
	// F_g = G * m1*m2 / r^2
	
	var G = 0.667; // Gravitational constant * 10^10

	var m1 = body1.GetMass();
	var m2 = body2.GetMass();

	var diff = b2Math.SubtractVV(body2.GetPosition(), body1.GetPosition());
	var n_hat = diff.Copy(); n_hat.Normalize();

	var r_2 = diff.LengthSquared();

	var F_g = b2Math.MulFV(G * m1 * m2 / r_2, n_hat);
	return F_g;
}

function nBody(bodies, player) {
	for (var i in bodies) {
		var b1 = bodies[i];
		for (var j in bodies) {
			var b2 = bodies[j];

			if (b1 != b2) {
				var F_g = calculateGravity(b1, b2);
				b1.ApplyForce(F_g, b1.GetWorldCenter())
			}
		}

		if (player) {
			// Avoid calculating twice in 2 loops
			var F_g = calculateGravity(b1, player);
			b1.ApplyForce(F_g, b1.GetWorldCenter());
			player.ApplyForce(F_g.GetNegative(), player.GetWorldCenter())
		}
	}
}

