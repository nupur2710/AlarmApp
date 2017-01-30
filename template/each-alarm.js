(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['each-alarm.template'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\r\n    <label href=\"#\" data-template=\"about\" data-context-name=\"about\" class=\"item-link item-content\">\r\n     <div class=\"remove delete-alarm\">X</div>\r\n          <input type=\"checkbox\" class=\"enable-disable-alarm\">\r\n          <strong>"
    + alias4(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data}) : helper)))
    + "<sub>"
    + alias4(((helper = (helper = helpers.amPm || (depth0 != null ? depth0.amPm : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"amPm","hash":{},"data":data}) : helper)))
    + "</sub></strong>\r\n          <small>"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + ", "
    + alias4(((helper = (helper = helpers.repeatingDays || (depth0 != null ? depth0.repeatingDays : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"repeatingDays","hash":{},"data":data}) : helper)))
    + "</small>\r\n          <span class=\"edit-icon\"></span>\r\n   </label>";
},"useData":true});
})();