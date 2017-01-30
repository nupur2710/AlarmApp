define([
    "template/add-edit-alarm"
], function(AddEditAlarmTemplate) {
    'use strict';
    var AddEditAlarmListView = Backbone.View.extend({
        "events":{
            "click .save":"saveAlarmClicked",
            "click .cancel":"cancelAlarmClicked",
            "click .delete":"deleteAlarmClicked"
        },
        "initialize":function(){
            this.render();  
        },
        "render":function(){
            var hours=[], minutes=[],
                templateOptions;
                this.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
            for(var i=1;i<=12;i++){
                if(i<10){
                    i="0"+i;
                }
                hours.push(i);
            }
            for(var i=1;i<=60;i++){
                if(i<10){
                    i="0"+i;
                }
                minutes.push(i);
            }
            templateOptions={
                "hours":hours,
                "minutes":minutes,
                "days":this.days
            }
            var alarmListTpl = Handlebars.templates['add-edit-alarm.template'](templateOptions);
            this.$el.append(alarmListTpl);
            if(this.model.get("guid")){
                this.showAlarmDetails();
            }
        },

        "showAlarmDetails":function(){
            var model = this.model,
            time = model.get("amPmTime"),
            hours = time.substring(0,2),
            minutes = time.substring(3,5);
            this.$(".hours").val(hours);
            this.$(".minutes").val(minutes);
            this.$(".amPm").val(model.get("amPm"));
            this.$(".alarm-label").val(model.get("label"));
        },

        "saveAlarmClicked":function(){
            var amPmHours = this.$(".hours").val(),
                minutes = this.$(".minutes").val(),amPm = this.$(".amPm").val(), militaryTime, amPmTime, militaryHours,
                days = this.$('input:checked.days').map(function() {
                            return this.id;
                        }).get(),
                remainingDays,
                repeatingDays, timeStamp,
                date= new Date();
                amPmTime = amPmHours+":"+minutes+":00";

                if(amPmHours==="HH" || minutes ==="MM"){
                    window.alert("Please update the alarm timings");
                    return;
                }
                if(amPm === "PM"){
                    militaryHours = Number(amPmHours)+12;
                    militaryTime = militaryHours+":"+minutes+":00";
                }
                else{
                    militaryHours = amPmHours;
                    militaryTime = amPmTime
                }

                timeStamp = date.setHours(militaryHours, minutes, 0, 0);

                remainingDays = _.difference(this.days, days);

                if(remainingDays.length===0){
                    repeatingDays="Everyday";
                }
                else if(remainingDays.length===2 && remainingDays[0]==="Saturday" && remainingDays[1]==="Sunday"){                   
                    repeatingDays = "Weekdays";                    
                }
                else if(days.length===2 && days[0]==="Saturday" && days[1]==="Sunday"){                   
                    repeatingDays= "Weekends"
                }else{
                    repeatingDays = days.join(" ");
                }
                
                this.model.set({
                "militaryTime":militaryTime,
                "amPmTime":amPmTime,
                "guid":this.generateGuid(),
                "label":this.$(".alarm-label").val(),
                "amPm":amPm,
                "repeatingDays":repeatingDays,
                "timeStamp":timeStamp
           });
            this.trigger(this.constructor.EVENTS.SAVE_ALARM, this.model); 
        },

        "cancelAlarmClicked":function(){
            this.trigger(this.constructor.EVENTS.CANCEL_ALARM);
        },

        "deleteAlarmClicked":function(event){
            this.model.destroy();
            this.trigger(this.constructor.EVENTS.DELETE_ALARM); 
        },

        "generateGuid":function(){     
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
    },{
        EVENTS:{
            "SAVE_ALARM":"save-alarm-data",
            "DELETE_ALARM":"delete-alarm",
            "CANCEL_ALARM":"cancel-alarm"
        }
    });
    return AddEditAlarmListView;
});