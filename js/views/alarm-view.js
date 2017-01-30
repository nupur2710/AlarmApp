define([
    "js/models/alarm-model",
    "template/each-alarm"
], function(AlarmModel, EachAlarmTemplate) {
    'use strict';
    var AlarmView = Backbone.View.extend({
        "events":{
            "click .edit-icon":"editIndividualAlarm",
            "click .delete-alarm":"deleteAlarm",
            "change .enable-disable-alarm":"enableDisableAlarm"
        },
        "initialize":function(){
            this.render();  
            this.bindEventListeners();
        },

        "bindEventListeners":function(){
            this.listenTo(this.model, "destroy", this.removeView);
        },
        "render":function(){
            var model = this.model,
            templateOptions = {
                    "label":model.get("label"),
                    "repeatingDays":model.get("repeatingDays"),
                    "time":model.get("amPmTime"),
                    "amPm":model.get("amPm"),
                    "guid":model.get("guid")
            },
            eachAlarmTpl = Handlebars.templates['each-alarm.template'](templateOptions),
            isActive = model.get("isActive");
            this.$el.append(eachAlarmTpl);
            if(!isActive){
                this.$el.toggleClass("off");
            }
            this.$el.find(".enable-disable-alarm").prop("checked", isActive);
        },
        "enableDisableAlarm":function(){
            var isActive = this.model.get("isActive");
            this.model.set("isActive", !isActive);
            this.$el.toggleClass("off");
        },

        "deleteAlarm":function(){
            this.model.destroy();
        },

        "removeView":function(){
            this.remove();
        },
        "editIndividualAlarm":function(event){
            this.trigger(this.constructor.EVENTS.EDIT_INDIVIDUAL_VIEW, this.model);
        }
    },{
        EVENTS:{
            "EDIT_INDIVIDUAL_VIEW":"edit-individual-view"
        }
    });
    return AlarmView;
});