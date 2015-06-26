goog.provide('pb.io.ElementInput');
goog.require('pb.io.Input');

/**
 * Reads a file at a given URL, converts it to a source buffer and makes it available for the context.
 *
 * @constructor
 * @extends {pb.io.Input}
 * @param {AudioContext} context Context for this input.
 * @param {string} url URL for the input file.
 */
pb.io.ElementInput = function(context, url) {
  goog.base(this, context);

  var that = this;
  var element = goog.dom.createDom("audio", {
    "crossOrigin": "anonymous",
    "src": url,
    "loop": true
  });
  goog.dom.appendChild(goog.dom.getDocument().body, element);
  // var element = new Audio();
  // element.crossOrigin = "anonymous";
  // $("body").append($(element));

  element.oncanplay = function() {
    that.dispatchEvent("loaded");
  };

  this.element = element;
  this.source = context.createMediaElementSource(element);
  // this.source.loop = true;
  this.source.addEventListener('ended', this.onEnded.bind(this));

    // var that = this,
    //     request = new XMLHttpRequest();

    // request.open('GET', url, true);
    // request.responseType = 'arraybuffer';


    // request.onload = function() {
    //     context.decodeAudioData(/** @type {ArrayBuffer} */(request.response), function(buffer) {
    //         that.setSourceBuffer(buffer);
    //         that.dispatchEvent('loaded');
    //     });
    // };
    // request.send();
};
goog.inherits(pb.io.ElementInput, pb.io.Input);
