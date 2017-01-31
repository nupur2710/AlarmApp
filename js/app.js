define([
    'js/models/alarm-application-model',
    'js/views/alarm-application-view'
], function(AlarmAppManagerModel, AlarmAppManagerView) {
    'use strict';
    var appManagerView = new AlarmAppManagerView({
        model: new AlarmAppManagerModel(),
        el: $('.alarm-app-container')
    });
});
