define([
], function() {
    'use strict';
    var AlarmModel = Backbone.Model.extend({
        defaults:{
            "amPmTime":null,
            "militaryTime":null,
            "label":null,
            "snooze":true,
            "isActive":true,
            "guid":null
        }
    });
    return AlarmModel;
});