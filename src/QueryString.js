
goog.provide('pb.QueryString');
goog.require('goog.Uri');
goog.require('goog.Uri.QueryData');


pb.QueryString = function() {
  goog.base(this);
};
goog.inherits(pb.QueryString, pb.ui.Component);


pb.QueryString.prototype.params = function(uri) {
  var current_uri = goog.Uri.parse(uri).queryData_;
  return current_uri;
};