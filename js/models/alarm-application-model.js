define([
    'js/collections/alarm-collection'
], function(alarmCollection) {
    'use strict';
    var AlarmAppManagerModel = Backbone.Model.extend({
        defaults: {
            "currentTime": null,
            "alarmCollection": null
        },
        "initialize": function() {
            this.set('alarmCollection', new alarmCollection());
            this.startClock();
        },
        "startClock": function() {
            var today = new Date();
            this.set("currentTime", today);
        },

    });
    return AlarmAppManagerModel;
});
