// Used to browserify all necessary AFRAME components
// into single javascript files to place within www directory

var AFRAME = require('aframe');

// Uncomment each module one at a time while browserifying

var AFRAME_ANIMATION_COMPONENT = require('aframe-animation-component');
var AFRAME_EVENT_SET_COMPONENT = require('aframe-event-set-component');
var AFRAME_LAYOUT_COMPONENT = require('aframe-layout-component');
var AFRAME_TEMPLATE_COMPONENT = require('aframe-template-component');