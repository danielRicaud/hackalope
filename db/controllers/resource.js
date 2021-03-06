const ResourceModel = require('../models/resource.js');

// adds a resource to the database
exports.insertResource = function (resource) {
  return ResourceModel.create(resource);
};

// finds all resources for a specified language

exports.findResourcesByLanguage = function (language) {
  return ResourceModel.find({ language, approved: true });
};

// finds a resource with a specified id
exports.findResourceById = function (id) {
  return ResourceModel.findOne({ _id: id, approved: true });
};

exports.findFavorites = function (favorites) {
  return ResourceModel.find({ _id: { $in: favorites } });
};

// finds all resources with a specified tag
// TODO: make this work for multiple tags
exports.findResourcesByTag = function (language, tag) {
  return ResourceModel.find({ language }, { tags: tag });
};

// finds all resources submitted by a user
exports.findResourcesByUser = function (userId) {
  return ResourceModel.find({ user: userId, approved: true });
};

exports.findResourceByUrl = function (url) {
  return ResourceModel.findOne({ url, approved: true });
};

// deletes a resource by id
exports.deleteResourceById = function (id) {
  return ResourceModel.findByIdAndRemove({ _id: id }, () => {});
};

// deletes a resource by name
exports.deleteResourceByTitle = function (title) {
  return ResourceModel.remove({ title });
};

// updates a resource's rating
exports.updateResourceRating = function (id, modifier) {
  return ResourceModel.findOneAndUpdate({ _id: id }, { $inc: { rating: modifier } }, { new: true });
};

// finds all resources still pending approval from an admin
exports.findUnapprovedResources = function () {
  return ResourceModel.find({ approved: false });
};

// updates a resource and marks it approved by an administrator
exports.approveResource = function (update) {
  return ResourceModel.findOneAndUpdate({ _id: update._id }, { $set: {
    title: update.title,
    description: update.description,
    url: update.url,
    language: update.language,
    tags: update.tags,
    approved: true,
  },
  });
};
