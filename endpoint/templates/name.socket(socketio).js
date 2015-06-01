/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var <%= classedName %> = require('./<%= name %>.model');

exports.register = function(socket) {
<% if (filters.sequelize) { %>
  <%= classedName %>.afterCreate(function(obj, options, fn){
    onSave(socket, obj);
    fn(null, obj);
  });

  <%= classedName %>.afterUpdate(function(obj, options, fn){
    onSave(socket, obj);
    fn(null, obj);
  });

  <%= classedName %>.afterDestroy(function(obj, options, fn){
    onRemove(socket, obj);
    fn(null, obj);
  });
<% } else if (filters.mongoose) { %>
  <%= classedName %>.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  <%= classedName %>.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
<% } %>
}

function onSave(socket, doc, cb) {
  socket.emit('<%= name %>:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('<%= name %>:remove', doc);
}