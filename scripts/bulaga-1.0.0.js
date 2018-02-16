/* BulagaJS - v1.0.0 - 2017-02-23
 * https://github.com/juvarabrera/bulagajs
 *
 * Copyright (c) 2017 Juvar Abrera;
 * Licensed under the MIT license 
*/
 
"use strict";

$.fn.bulaga = function(options) {

	function Bulaga(el, options) {
		var obj = this;
		this.el = el;
		if(options == undefined)
			options = {};
		this.options = options;

		var done = false;

		var DEFAULT_OPTIONS = {
			"animation": "SLIDE_UP",
			"duration": 500,
			"position": .25,
			"callback": false,
			"bounce": false,
			"distance": 100,
			"base": false,
			"repeat": false
		};

		this.ready = function() {
			this.el.css("opacity", "0");
			for(var i in DEFAULT_OPTIONS) {
				if(!this.options.hasOwnProperty(i))
					this.options[i] = DEFAULT_OPTIONS[i];
			}

			if(!this.animate.hasOwnProperty(this.options.animation))
				this.options.animation = DEFAULT_OPTIONS.animation;

			$(window).scroll(function() {
				obj.checkScroll();
			}).scroll();
		};

		this.checkScroll = function() {
			var oP = this.el.offset().top,
				sH = $(window).outerHeight(),
				pos = $(window).scrollTop();
			if(pos >= oP - sH + parseInt(sH * parseFloat(this.options.position)) && !done) {
				done = true;
				this.animate[this.options.animation]();
			}
			if(pos + sH < oP && this.options.repeat) {
				done = false;
				this.el.css("opacity", "0");
			}
		};

		this.callback = function() { 
			if(this.options.callback)
				this.options.callback(); 
		};

		this.animate = {
			"FADE_IN": function() {
				obj.el.animate({"opacity": "1"}, parseInt(obj.options.duration), obj.callback());
			},
			"SLIDE_RIGHT": function() {
				obj.slide("right");
			},
			"SLIDE_LEFT": function() {
				obj.slide("left");
			},
			"SLIDE_UP": function() {
				obj.slide("top");
			},
			"SLIDE_DOWN": function() {
				obj.slide("bottom");
			}
		};

		this.slide = function(direction) {
			var css = {};
			if(obj.el.css("position") == "relative" || obj.el.css("position") == "static") 
				css["position"] = "relative";
			else if(obj.options.base)
				direction = obj.options.base;

			var original = (obj.el.css(direction) == "auto") ? 0 : parseFloat(obj.el.css(direction).slice(0, -2));
			css[direction] = (obj.options.distance+parseFloat(original))+"px";
			obj.el.css(css);
			css = {"opacity": "1"};
			css[direction] = original-((obj.options.bounce) ? 20 : 0)+"px";
			obj.el.animate(css, obj.options.duration, function() {
				if(obj.options.bounce) {
					css = {};
					css[direction] = original+"px";
					obj.el.animate(css, obj.options.duration);
				}
			});
		};

		this.ready();
	}

	var b = new Bulaga($(this), options);

	return this;
};
