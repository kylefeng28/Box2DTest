/*
 * KeyboardState.keys is an array of boolean values
 * true indicates that the key is down or pressed
 * false indicates that the key is up or not pressed
 *
 * Uses KeyboardEvent.key instead of KeyboardEvent.charCode
 * Case insensitive
 */
var KeyboardState = function() {
	this.keys = {};
	this.suppress = [];
	this.lastEvent = null;
	this.lastKey = null;
	this.isDebug = false;
};

// TODO: rename to Keyboard

KeyboardState.prototype.handleKeyDown = function(/*KeyboardEvent*/ e) {
	this.lastEvent = e;
	var key = this.lookup(e);
	if (key in this.suppress) {
		e.preventDefault();
	}
	this.keys[key] = true;
	this.lastKey = key;
	this.debug();
}

KeyboardState.prototype.handleKeyUp = function(/*KeyboardEvent*/ e) {
	this.lastEvent = e;
	var key = this.lookup(e);
	this.keys[key] = false;
	this.lastKey = key;
	this.debug();
}

KeyboardState.prototype.isKeyDown = function(key) {
	return this.keys[key];
}

KeyboardState.prototype.isKeyUp = function(key) {
	return !this.keys[key];
}

KeyboardState.lookup = KeyboardState.prototype.lookup = function(e) {
	var ekey = e.key || String.fromKeyCode(e.keyCode); // keyIdentifier?
	var key = ekey.toLowerCase();
	key = Keys[key] || key;
	return key;
}

KeyboardState.prototype.debug = function() {
	if (this.isDebug) {
		console.log({ekey: this.lastEvent.key, key: this.lastKey});
	}
}

Keys = {
	" ": "Space"
};
