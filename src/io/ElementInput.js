goog.provide('pb.io.ElementInput');
goog.require('pb.io.Input');

/**
 * Reads a file at a given URL, converts it to an HTML5 <audio> element, and makes it available for the context.
 *
 * @constructor
 * @extends {pb.io.Input}
 * @param {AudioContext} context Context for this input.
 * @param {string} url URL for the input file.
 */
pb.io.ElementInput = function(context, element) {
  goog.base(this, context);
  var that = this;
  this.element = element;
  this.source = context.createMediaElementSource(element);

  element.oncanplay = function() {
    that.dispatchEvent("loaded");
  };

  // var that = this;
  // var element = /** @type {HTMLMediaElement} */(goog.dom.createDom("audio", {
  //   "crossOrigin": "anonymous",
  //   "loop": true
  // }));
  // goog.dom.appendChild(goog.dom.getDocument().body, element);

  // element.oncanplay = function() {
  //   that.dispatchEvent("loaded");
  // };

  // this.element = element;
  // this.source = context.createMediaElementSource(element);
  // this.source.addEventListener('ended', this.onEnded.bind(this));

  // this.element.src = url;
};
goog.inherits(pb.io.ElementInput, pb.io.Input);

pb.io.ElementInput.prototype.setUrl = function(url) {
  this.element.src = url;
};

pb.io.ElementInput.prototype.play = function(opt_time) {
  if (this.state == pb.io.Input.State.NOT_STARTED) {
    this.element.play();
    this.state = pb.io.Input.State.PLAYING;
  }
};

pb.io.Input.prototype.stop = function(opt_time) {
  if (this.state == pb.io.Input.State.PLAYING) {
    this.element.pause();
    this.state = pb.io.Input.State.FINISHED;
  }
};
