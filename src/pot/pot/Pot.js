// Copyright 2012 Armagan Amcalar. All Rights Reserved.
//
// This file is part of Pedalboard.js.
//
// Pedalboard.js is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Pedalboard.js is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Pedalboard.js.  If not, see <http://www.gnu.org/licenses/>.

/**
 * @fileoverview Base pot component.
 */


goog.provide('pb.pot.Pot');
goog.require('pb.pot.PotModel');
goog.require('pb.ui.Component');



/**
 * Pot component models a virtual potentiometer. This base class is used to adjust audio parameter values of pedals.
 *
 * @constructor
 * @extends {pb.ui.Component}
 *
 * @param {AudioParam|Function} param Audio parameter this pot will adjust. Can be gain, etc. If more complex
 *     calculation is desired, one can pass a callback function which will be triggered each time the value of this pot
 *     changes.
 * @param {string} name Name of the pot. Will be written under it.
 * @param {number} multiplier The multiplier of the effect. Some effects (such as gain) need this to be on the order of
 *                       thousands.
 * @param {string=} opt_size Size of the pot. Might be one of the values in pb.pot.Pot.Size enum. Default is REGULAR.
 *     This size is added to the pot's class names for easier styling.
 * @param {number=} opt_max Optional minimum value for the pot. Default value is 0.
 * @param {number=} opt_min Optional maximum value for the pot. Default value is 1.
 * @param {number=} opt_default Optional default value for the pot. Default value is 0.5.
 */
pb.pot.Pot = function(param, name, multiplier, opt_size, opt_min, opt_max, opt_default) {
    this.setModel(new this.modelClass(param, name, multiplier || 1, opt_min, opt_max, opt_default));
    this.size = opt_size || pb.pot.Pot.Size.REGULAR;
    this.bindModelEvents();
    goog.base(this);
};
goog.inherits(pb.pot.Pot, pb.ui.Component);


/**
 * @type {function(new: pb.pot.PotModel, (AudioParam|Function), string, number, number=, number=, number=)}
 *       The component model this pot component will work with.
 */
pb.pot.Pot.prototype.modelClass = pb.pot.PotModel;


/**
 * @protected
 * @type {number} Angle in degrees per one unit of rotation.
 */
pb.pot.Pot.prototype.angle = 260;


/**
 * Sets the new value for this pot's audio parameter.
 *
 * @param {number} newValue New value to be set.
 */
pb.pot.Pot.prototype.setValue = function(newValue) {
    this.model.setValue(newValue);
};


/**
 * Updates the user interface - rotation - accordingly.
 */
pb.pot.Pot.prototype.updateUi = function() {
    if (this.isInDocument()) {
        $(this.getElement()).find('.slider').slider("value", this.model.getNormalizedValue());
    }
};


/**
 * @override
 */
pb.pot.Pot.prototype.templates_base = function() {
    return '<div class="pot ' + this.size + '" id="' + this.getId() + '">' +
               '<div class="slider"></div>' +
               '<div class="nameHolder">' +
                   '<div class="name">' + this.model.name + '</div>' +
               '</div>' +
           '</div>';
};


/**
 * Render method updates its knob.
 */
pb.pot.Pot.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  var self = this;
  $(this.getElement()).find(".slider").slider({
    min: 0,
    max: 1,
    step: 0.05,
    value: 0.6,
    orientation: "vertical",
    range: "min",
    animate: true,
    slide: function( event, ui ) {
      self.setValue(ui.value);
    }
  });

  this.updateUi();

};


/**
 * @enum {string} DOM mappings.
 */
pb.pot.Pot.prototype.mappings = {
};


/**
 * @enum {string} Pot size.
 */
pb.pot.Pot.Size = {
    SMALL: 'small',
    REGULAR: 'regular'
};


/**
 * @override
 */
pb.pot.Pot.prototype.bindModelEvents = function() {
    goog.events.listen(this.model, pb.pot.PotModel.EventType.VALUE_CHANGED, this.updateUi, false, this);
};

