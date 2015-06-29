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
 * @fileoverview Master pedal.
 */

goog.provide('pb.stomp.Master');
goog.require('pb.stomp.Box');
goog.require('pb.stomp.MasterModel');



/**
 * Master pedal.
 *
 * @constructor
 * @extends {pb.stomp.Box}
 * @param {AudioContext} context Audio context the pedal will work on.
 */
pb.stomp.Master = function(context) {
    goog.base(this, context);

    // this.masterPot.setValue(1);
};
goog.inherits(pb.stomp.Master, pb.stomp.Box);


/**
 * @override
 */
pb.stomp.Master.prototype.modelClass = pb.stomp.MasterModel;


/**
 * @override
 */
pb.stomp.Master.prototype.name = 'master';
