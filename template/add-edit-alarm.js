(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['add-edit-alarm.template'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "            <option value="
    + alias2(alias1(depth0, depth0))
    + ">"
    + alias2(alias1(depth0, depth0))
    + "</option>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "          <li class=\"item select selected\">\r\n            <label href=\"#\" for="
    + alias2(alias1(depth0, depth0))
    + ">\r\n              <input type=\"checkbox\" class=\"days "
    + alias2(alias1(depth0, depth0))
    + "\" id="
    + alias2(alias1(depth0, depth0))
    + ">\r\n              <span>"
    + alias2(alias1(depth0, depth0))
    + "</span>\r\n            </label>\r\n          </li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"wrap add-edit-alarm\" id=\"AddEdit\">\r\n  <div class=\"navbar\">\r\n    <a class=\"pills left cancel\">Cancel</a>\r\n    <h1>Alarm/Edit</h1>\r\n    <a class=\"pills right save\">Save</a>\r\n  </div>\r\n  <div class=\"page\">\r\n    <div class=\"content-block-title\">Select Time</div>\r\n      <div class=\"content-block-inner\">\r\n        <p>\r\n          <select class=\"hours\">\r\n            <option>HH</option>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.hours : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "          </select>\r\n          <select class=\"minutes\">\r\n            <option>MM</option>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.minutes : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "          </select>\r\n          <select class=\"amPm\">\r\n            <option value=\"AM\">AM</option>\r\n            <option value=\"PM\">PM</option>\r\n          </select>\r\n        </p>\r\n        <p class=\"item select selected\">\r\n          <label href=\"#\" for=\"Snooze\">\r\n            <input type=\"checkbox\" class=\"snooze-alarm\">\r\n            <span>Snooze</span>\r\n          </label>\r\n        </p>\r\n        <p class=\"item select selected\">\r\n          <label href=\"#\" for=\"Label\">\r\n            <input type=\"text\" value=\"\" class=\"alarm-label\">\r\n            <span>Label</span>\r\n          </label>\r\n        </p>      \r\n      </div> \r\n      <div class=\"content-block-title\">Repeat</div>\r\n        <ul class=\"list\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.days : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\r\n  </div>\r\n  <div class=\"action\">\r\n        <!-- show this if you are adding alarm -->\r\n        <a href=\"#\" data-panel=\"left\" class=\"button open-panel save\">Save Alarm</a>\r\n        <!-- show this if you are editing alarm -->\r\n        <a href=\"#\" data-panel=\"left\" class=\"button open-panel danger delete\">Delete Alarm</a>\r\n  </div>\r\n</div>";
},"useData":true});
})();