(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['main-view.template'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"wrap main-class\" id=\"clock\">\r\n  <div class=\"navbar\">\r\n    <h1>Clock</h1>\r\n  </div>\r\n  <div class=\"digital-clock-container\"></div>\r\n  <div class=\"toolbar\">\r\n    <div class=\"toolbar-inner\">\r\n      <a href=\"#\" class=\"link clock-link\">Clock</a>\r\n      <a href=\"#\" class=\"link alarm-link\">Alarm</a>\r\n    </div>\r\n  </div>\r\n</div>";
},"useData":true});
})();