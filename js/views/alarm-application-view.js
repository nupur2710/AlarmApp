define([
    'js/models/alarm-application-model',
    "template/main-view",
    "template/update-clock",
    "js/views/add-edit-alarm",
    "template/alarm-list",
    "template/each-alarm",
    "js/views/alarm-view",
    "js/models/alarm-model",
    "template/play-alarm"
], function(AlarmApplicationModel, MainViewTemplate, UpdateClockTemplate, AddEditAlarmView, AlarmListTemplate, EachAlarmTemplate, AlarmView, AlarmModel, PlayAlarmTemplate) {
    'use strict';
    var AppManagerView = Backbone.View.extend({
        // "defaults":{
        //     "singleViewCollection":[]
        // },
        "events": {
            "click .alarm-link": "alarmLinkClicked",
            "click .clock-link": "clockLinkClicked",
            "click .add-alarm-link": "addAlarmClicked",
            "click .edit-alarm-link": "editAlarmsClicked",
            "click .done-link": "doneClicked",
            "click .stop-button": "stopAlarmClicked",
            "click .snooze-button": "snoozeButtonClicked"
        },
        "initialize": function() {
            this.render();
        },
        "render": function() {
            var mainViewtpl = Handlebars.templates['main-view.template'],
                refresh, playAlarm;
            this.$el.find(".alarm-list").remove();
            this.$el.append(mainViewtpl);
            this.startClock();
            refresh = window.setInterval(this.startClock.bind(this), 1000);
        },

        "startClock": function() {
            var currentTime = new Date();
            if (currentTime.getSeconds() === 0) {
                this.startAlarm();
            }
            this.currentTime = currentTime.toTimeString().split(' ')[0];
            this.currentDate = currentTime.toDateString();
            this.updateTimeDateInModel();
            this.updateClockView();
        },

        "startAlarm": function() {
            var alarmCollection = this.model.get("alarmCollection"),
                model, time, repeatingDays;

            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var today = days[new Date().getDay()];

            for (var index = 0; index < alarmCollection.length; index++) {
                model = alarmCollection.at(index);
                repeatingDays = model.get('repeatingDays').split(' ');
                time = model.get("militaryTime");

                // If the alarm is in active state
                // If today is one of the days the alarm is set to repeat then trigger it
                // If no repeating day is set, trigger it - works like once in alarms
                if (model.get("isActive") && (this.currentTime).substring(0, 5) === (time).substring(0, 5) && (repeatingDays.indexOf(today) !== -1 || repeatingDays.indexOf("") === 0)) {
                    this.showAlarmPopup(model);
                }
            }
        },

        "showAlarmPopup": function(model) {
            if (this.$(".alarm-playing").length) {
                return;
            }
            var templateOptions = {
                    "time": model.get("militaryTime"),
                    "label": model.get("label"),
                    "date": this.currentDate,
                    "snooze":model.get("snooze")
                },
                playAlarmTpl = Handlebars.templates['play-alarm.template'](templateOptions);
            this.ringingAlarmModel = model;
            this.hideAlarmList();
            this.$(".main-class").hide();
            this.$el.append(playAlarmTpl);
            window.setTimeout(function() {
                this.stopAlarmClicked();
            }.bind(this), 60000);
        },

        "stopAlarmClicked": function() {
            this.ringingAlarmModel.set("isActive", false);
            this.$(".alarm-playing").remove();
            this.$(".main-class").show();
            this.showAlarmList();
        },

        "snoozeButtonClicked": function() {
            this.stopAlarmClicked();
        },


        "updateTimeDateInModel": function() {
            this.model.set({ "currentTime": this.currentTime, "currentDate": this.currentDate });
        },

        "updateClockView": function() {
            var templateOptions = {
                    "time": this.currentTime,
                    "date": this.currentDate
                },
                digitalClockTpl = Handlebars.templates['update-clock.template'](templateOptions);
            this.$el.find(".digital-clock").remove();
            this.$el.find(".digital-clock-container").append(digitalClockTpl);
        },

        "appendZeroPrefix": function(value) {
            if (value < 10) {
                value = "0" + value;
            }
            return value;
        },
        "alarmLinkClicked": function(event) {
            var alarms = [],
                hasAlarms = false,
                templateOptions, alarmListTpl, eachAlarmTpl, $listItem;
            this.$(".main-class").remove();
            if (this.$(".alarm-list").length) {
                this.$(".alarm-list").remove();
            }
            if (this.model.get("alarmCollection").length) {
                var alarmCollection = this.model.get("alarmCollection"),
                    hasAlarms = true,
                    currentAlarmModel,
                    index;
            }
            templateOptions = {
                "hasAlarms": hasAlarms
            };
            alarmListTpl = Handlebars.templates['alarm-list.template'](templateOptions);
            this.$el.append(alarmListTpl);
            if (hasAlarms) {
                alarmCollection.models.sort(function(a, b) {
                    return a.get("timeStamp") - b.get("timeStamp");
                });
                for (index = 0; index < alarmCollection.length; index++) {
                    currentAlarmModel = alarmCollection.models[index];
                    $listItem = $('<li>').attr('data-guid', currentAlarmModel.get("guid")).addClass('item individual-alarm-container');
                    this.$el.find(".alarm-list-container").append($listItem);
                    var singleAlarmView = new AlarmView({
                        "model": currentAlarmModel,
                        "el": $listItem
                    });
                    this.listenTo(singleAlarmView, AlarmView.EVENTS.EDIT_INDIVIDUAL_VIEW, this.editIndividualView);
                    this.listenTo(singleAlarmView, AlarmView.EVENTS.REMOVE_SINGLE_ALARM, this.singleAlarmRemoved);
                }
            }
        },

        "singleAlarmRemoved": function() {
            if (!this.model.get("alarmCollection").length) {
                this.doneClicked();
            }
        },
        "clockLinkClicked": function() {
            if (this.$(".main-class").length) {
                return;
            }
            this.render();
        },

        "addAlarmClicked": function(event, model) {
            this.hideAlarmList();
            if (this.addEditAlarmView) {
                this.addEditAlarmView.remove();
            }
            var $div = $('<div>').addClass('add-edit-alarm-view'),
                model = model || new AlarmModel();
            this.$el.append($div);
            this.addEditAlarmView = new AddEditAlarmView({
                "model": model,
                "el": $div
            });
            this.listenTo(this.addEditAlarmView, AddEditAlarmView.EVENTS.SAVE_ALARM, this.saveCancelAlarmData);
            this.listenTo(this.addEditAlarmView, AddEditAlarmView.EVENTS.DELETE_ALARM, this.deleteAlarm);
            this.listenTo(this.addEditAlarmView, AddEditAlarmView.EVENTS.CANCEL_ALARM, this.saveCancelAlarmData);
        },

        "editAlarmsClicked": function() {
            this.$el.find(".alarm-list-container").find('li').addClass("edit");
            this.$(".enable-disable-alarm").prop("disabled", true);
            this.$el.find(".navbar-heading").text(" Edit Alarm");
            this.renderEditView();
        },

        "renderEditView": function() {
            this.$el.find(".done-link").removeClass("remove-class");
            this.$el.find(".edit-alarm-link").addClass("remove-class");
            this.$el.find(".add-alarm-link").addClass("remove-class");
        },

        "renderAddView": function() {
            this.$el.find(".done-link").addClass("remove-class");
            this.$el.find(".edit-alarm-link").removeClass("remove-class");
            this.$el.find(".add-alarm-link").removeClass("remove-class");
        },

        "doneClicked": function() {
            this.$el.find(".alarm-list-container").find('li').removeClass("edit");
            this.$(".enable-disable-alarm").prop("disabled", false);
            this.$el.find(".navbar-heading").text("Alarm");
            this.renderAddView();
            this.alarmLinkClicked();
        },

        "hideAlarmList": function() {
            this.$(".alarm-list").hide();
        },
        "showAlarmList": function() {
            this.$(".alarm-list").show();
        },

        "saveCancelAlarmData": function(model) {
            if (model) {
                this.model.get('alarmCollection').add(model);
            }
            this.$(".add-edit-alarm").remove();
            this.alarmLinkClicked();
        },

        "deleteAlarm": function() {
            this.$(".add-edit-alarm").remove();
            this.alarmLinkClicked();
        },

        "editIndividualView": function(model) {
            var event = {};
            this.addAlarmClicked(event, model);
        }
    });
    return AppManagerView;
});
