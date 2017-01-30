define([
    'js/models/alarm-application-model',
    "template/main-view",
    "template/update-clock",
    "js/views/add-edit-alarm",
    "template/alarm-list",
    "template/each-alarm",
    "js/views/alarm-view",
    "js/models/alarm-model",
], function(AlarmApplicationModel, MainViewTemplate, UpdateClockTemplate, AddEditAlarmView, AlarmListTemplate, EachAlarmTemplate, AlarmView, AlarmModel) {
    'use strict';
    var AppManagerView = Backbone.View.extend({
        // "defaults":{
        //     "singleViewCollection":[]
        // },
        "events":{
           "click .alarm-link":"alarmLinkClicked",
           "click .clock-link":"clockLinkClicked",
           "click .add-alarm-link":"addAlarmClicked",
           "click .edit-alarm-link": "editAlarmsClicked",
           "click .done-link":"doneClicked"
        },
        "initialize":function(){
            this.render();
            this.bindEventsListeners();
        },
        "render":function(){
           var refresh = window.setInterval(this.startClock.bind(this), 500), 
                mainViewtpl = Handlebars.templates['main-view.template'];
            this.$el.find(".alarm-list").remove();
            this.$el.append(mainViewtpl);  
        },

        "bindEventsListeners":function(){

        },

        "startClock": function () {
            var currentTime = new Date();
            this.currentTime = currentTime.toTimeString().split(' ')[0];
            this.currentDate = currentTime.toDateString();
            this.updateTimeDateInModel();
            this.updateClockView();
        },

        "updateTimeDateInModel":function(){
            this.model.set({"currentTime": this.currentTime,"currentDate": this.currentDate});
        },

        "updateClockView":function(){
            var templateOptions = {
                "time":this.currentTime,
                "date":this.currentDate
            },
            digitalClockTpl = Handlebars.templates['update-clock.template'](templateOptions);
            this.$el.find(".digital-clock").remove();
            this.$el.find(".digital-clock-container").append(digitalClockTpl);
        },

        "appendZeroPrefix":function(value){
            if(value<10){
                value = "0"+value;
            }
            return value;
        },
        "alarmLinkClicked":function(event){
            var alarms=[], hasAlarms = false, templateOptions, alarmListTpl, eachAlarmTpl, $listItem;
            this.$(".main-class").remove();
            if(this.$(".alarm-list").length){
                this.$(".alarm-list").remove();
            }
            if(this.model.get("alarmCollection").length){
                var alarmCollection = this.model.get("alarmCollection"),
                hasAlarms = true, currentAlarmModel,
                index;               
            }
            templateOptions={
                "hasAlarms": hasAlarms
            };
            alarmListTpl = Handlebars.templates['alarm-list.template'](templateOptions);
            this.$el.append(alarmListTpl);
            if(hasAlarms){
                 for(index=0;index<alarmCollection.length;index++){
                    currentAlarmModel = alarmCollection.models[index];
                    $listItem = $('<li>').attr('data-guid',currentAlarmModel.get("guid")).addClass('item individual-alarm-container');
                    this.$el.find(".alarm-list-container").append($listItem);
                    var singleAlarmView = new AlarmView({
                        "model":currentAlarmModel,
                        "el": $listItem
                    });
                    this.listenTo(singleAlarmView, AlarmView.EVENTS.EDIT_INDIVIDUAL_VIEW, this.editIndividualView);
                }
            }
        },
        "clockLinkClicked":function(){
            if(this.$(".main-class").length){
                return;
            }
            this.render();
        },

        "addAlarmClicked":function(event, model){
            this.hideAlarmList();
            if(this.addEditAlarmView){
                this.addEditAlarmView.remove();
            }
            var $div=$('<div>').addClass('add-edit-alarm-view'),
            model = model || new AlarmModel(); 
            this.$el.append($div);
            this.addEditAlarmView = new AddEditAlarmView({
                "model": model,
                "el":$div
            });
            this.listenTo(this.addEditAlarmView, AddEditAlarmView.EVENTS.SAVE_ALARM, this.saveCancelAlarmData);
            this.listenTo(this.addEditAlarmView, AddEditAlarmView.EVENTS.DELETE_ALARM, this.deleteAlarm);
            this.listenTo(this.addEditAlarmView, AddEditAlarmView.EVENTS.CANCEL_ALARM, this.saveCancelAlarmData);
        },

        "editAlarmsClicked":function(){
            this.$el.find(".alarm-list-container").find('li').addClass("edit");
            this.renderEditView();
        },

        "renderEditView":function(){
            this.$el.find(".done-link").removeClass("remove-class");
            this.$el.find(".edit-alarm-link").addClass("remove-class");
            this.$el.find(".add-alarm-link").addClass("remove-class");
        },

        "renderAddView":function(){
            this.$el.find(".done-link").addClass("remove-class");
            this.$el.find(".edit-alarm-link").removeClass("remove-class");
            this.$el.find(".add-alarm-link").removeClass("remove-class");
        },

        "doneClicked":function(){
            this.$el.find(".alarm-list-container").find('li').removeClass("edit");
            this.renderAddView();
        },

        "hideAlarmList":function(){
            this.$(".alarm-list").hide();     
        },
        "showAlarmList":function(){
            this.$(".alarm-list").show();
        },

        "saveCancelAlarmData":function(model){
            if(model){                
                this.model.get('alarmCollection').add(model);
            }
            this.$(".add-edit-alarm").remove();
            this.alarmLinkClicked();
        },

        "deleteAlarm":function(){
            this.$(".add-edit-alarm").remove();
            this.alarmLinkClicked();
        },

        "editIndividualView":function(model){
            var event = {};
            this.addAlarmClicked(event, model);
        }
    });
    return AppManagerView;
});