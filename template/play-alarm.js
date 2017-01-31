(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['play-alarm.template'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "            <a href=\"#\" data-panel=\"left\" class=\"button open-panel snooze-button\">Snooze</a> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"wrap alarm-playing\" id=\"AlarmPLaying\">\r\n    <div class=\"page alarm\">\r\n        <div class=\"clock\">\r\n            "
    + alias4(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data}) : helper)))
    + "\r\n            <small>"
    + alias4(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data}) : helper)))
    + "</small>\r\n            <p class=\"label\">\r\n                "
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "\r\n            </p>\r\n        </div>\r\n        <div class=\"action\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.snooze : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n            <a href=\"#\" data-panel=\"left\" class=\"button small stop-button\">Stop</a>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
},"useData":true});
})();