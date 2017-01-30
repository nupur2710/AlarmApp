 define([
     'js/models/alarm-model'
], function(AlarmModel) {
    'use strict';
    var AlarmCollection = Backbone.Collection.extend({
        "model":AlarmModel
    });
    return AlarmCollection;
});