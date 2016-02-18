/*
 * Keyboard.keys is an array of boolean values
 * true indicates that the key is down or pressed
 * false indicates that the key is up or not pressed
 *
 * Uses KeyboardEvent.key instead of KeyboardEvent.charCode
 * Case insensitive
 */
var Keyboard = function() {
	this.keys = {};
	this.suppress = [];
	this.lastEvent = null;
	this.lastKey = null;
	this.isDebug = false;
};

Keyboard.prototype.handleKeyDown = function(/*KeyboardEvent*/ e) {
	this.lastEvent = e;
	var key = this.lookup(e);
	if (key in this.suppress) {
		e.preventDefault();
	}
	this.keys[key] = true;
	this.lastKey = key;
	this.debug();
}

Keyboard.prototype.handleKeyUp = function(/*KeyboardEvent*/ e) {
	this.lastEvent = e;
	var key = this.lookup(e);
	this.keys[key] = false;
	this.lastKey = key;
	this.debug();
}

Keyboard.prototype.isKeyDown = function(key) {
	return this.keys[key];
}

Keyboard.prototype.isKeyUp = function(key) {
	return !this.keys[key];
}

Keyboard.lookup = Keyboard.prototype.lookup = function(e) {
	var ekey = e.key || String.fromKeyCode(e.keyCode); // keyIdentifier?
	var key = ekey.toLowerCase();
	key = Keys[key] || key;
	return key;
}

Keyboard.prototype.debug = function() {
	if (this.isDebug) {
		console.log({ekey: this.lastEvent.key, key: this.lastKey});
	}
}

Keys = {
	" ": "Space"
};
