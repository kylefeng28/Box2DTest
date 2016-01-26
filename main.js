// Imports
using (Box2D.Dynamics, "b2*");
using (Box2D.Common.Math, "b2*");
using (Box2D.Collision.Shapes, "b2*");

var CANVAS_WIDTH = 640;
var CANVAS_HEIGHT = 480;
var SCALE = 30;

var kb;
var canvas, context;
var world, debugDraw;
var _bodyDef, _fixDef;

// Initialization code
function init() {
	// Canvas
	canvas = document.querySelector("#canvas");
	canvas.width = CANVAS_WIDTH;
	canvas.height = CANVAS_HEIGHT;
	context = canvas.getContext("2d");

	// Keyboard
	kb = new KeyboardState();
	kb.suppress.push("Space");

	// _bodyDef and _fixDef
	_bodyDef = new b2BodyDef();
	_fixDef = new b2FixtureDef();
}

// Debug draw setup
function debugDrawSetup() {
	debugDraw = new b2DebugDraw();
	debugDraw.SetSprite(context);
	debugDraw.SetDrawScale(SCALE);
	debugDraw.SetFillAlpha(0.3);
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);
}

function update() {
	world.Step(1/60.0, // framerate
	           10,     // velocity iterations
	           10);    // position iterations
	world.DrawDebugData(); // debug
	world.ClearForces();
};
