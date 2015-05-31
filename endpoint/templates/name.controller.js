'use strict';

var _ = require('lodash');<% if (filters.mongoose) { %>
var <%= classedName %> = require('./<%= name %>.model');<% } %>

// Get list of <%= name %>s
exports.index = function(req, res) {<% if (!filters.mongoose && !filters.sequelize) { %>
  res.json([]);<% } %><% if (filters.mongoose) { %>
  <%= classedName %>.find(function (err, <%= name %>s) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(<%= name %>s);
  });<% } %><% if(filters.sequelize){ %> 
    var page_size = 100
    var page_offset = (req.params.page || 0) * page_size;
    var language = req.query.lang;
    var query = {
      offset: page_offset,
      limit: page_size
    };

    if(req.query.filter){
      query.where = {key: new RegExp("^.*" + req.query.filter + ".*$", "i")};
    }

    <%= classedName %>.findAll(query).then(function(<%= name %>s){
      return res.status(200).json(<%= name %>s);
    }).catch(function(err){
      return handleError(res, err);
    });
  <% } %>
};<% if (filters.mongoose) { %>

// Get a single <%= name %>
exports.show = function(req, res) {
  <%= classedName %>.findById(req.params.id, function (err, <%= name %>) {
    if(err) { return handleError(res, err); }
    if(!<%= name %>) { return res.status(404).send('Not Found'); }
    return res.json(<%= name %>);
  });
};

// Creates a new <%= name %> in the DB.
exports.create = function(req, res) {
  var new_ = new <%= classedName %>(req.body);
  new_.save(function(err, <%= name %>) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(<%= name %>);
  });
};

// Updates an existing <%= name %> in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  <%= classedName %>.findById(req.params.id, function (err, <%= name %>) {
    if (err) { return handleError(res, err); }
    if(!<%= name %>) { return res.status(404).send('Not Found'); }
    var updated = _.merge(<%= name %>, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(<%= name %>);
    });
  });
};

// Deletes a <%= name %> from the DB.
exports.destroy = function(req, res) {
  <%= classedName %>.findById(req.params.id, function (err, <%= name %>) {
    if(err) { return handleError(res, err); }
    if(!<%= name %>) { return res.status(404).send('Not Found'); }
    <%= name %>.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}<% } %>
<% if(filters.sequelize){ %> 
// Get a single <%= name %>
exports.show = function(req, res) {
  <%= classedName %>.findById(req.params.id)
    .then(function (<%= name %>) {
      if(!<%= name %>) { return res.status(404).send('Not Found'); }
      return res.json(<%= name %>);
    }).catch(function(error){
      return handleError(res, error); 
    });
};

// Creates a new <%= name %> in the DB.
exports.create = function(req, res) {
  var new_ = <%= classedName %>.build(req.body);
  new_.save()
    .then(function(err, <%= name %>) {
      return res.status(201).json(<%= name %>);
    }).catch(function(error){
      return handleError(res, error);
    });
};

// Updates an existing <%= name %> in the DB.
exports.update = function(req, res) {
  <%= classedName %>.findById(req.params.id)
    .then(function (<%= name %>) {

      if(!<%= name %>) { 
        return res.status(404).send('Not Found'); 
      }

      var updated = _.merge(<%= name %>, req.body);
      updated.save()
        .then(function (err) {
          return res.status(200).json(<%= name %>);
        })
        .catch(function(err){
          return handleError(res, err);
        });

    }).catch(function(err){
      return handleError(res, err);
    });
};

// Deletes a <%= name %> from the DB.
exports.destroy = function(req, res) {
  <%= classedName %>.findById(req.params.id)
    .then(function (<%= name %>) {

      if(!<%= name %>) { 
        return res.status(404).send('Not Found'); 
      }

      <%= name %>.destroy()
        .then(function(err) {
          return res.status(204).send('No Content');
        })
        .catch(function(err){
          return handleError(res, err);
        });

    })
    .catch(function(err){
      return handleError(res, err);
    });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
<% } %>