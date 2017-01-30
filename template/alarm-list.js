(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['alarm-list.template'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "    <ul class=\"list alarm-list-container\">\r\n    </ul>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"clock\">\r\n      <p>No Alarms set</p>\r\n    </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"wrap alarm-list\" id=\"clock\">\r\n  <div class=\"navbar\">\r\n    <a class=\"pills left editAlarms edit-alarm-link\">Edit</a>\r\n    <a class=\"pills left editAlarms done-link remove-class\">Done</a>\r\n      <h1>Alarm</h1>\r\n    <a class=\"pills right addAlarm add-alarm-link\">Add</a>\r\n  </div>\r\n  <div class=\"page\">\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.hasAlarms : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "  </div>      \r\n  <div class=\"toolbar\">\r\n    <div class=\"toolbar-inner\">\r\n      <a href=\"#\" class=\"link clock-link\">Clock</a>            \r\n    </div>\r\n  </div>\r\n</div>";
},"useData":true});
})();