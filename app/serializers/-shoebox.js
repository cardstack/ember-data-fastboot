import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  // store.push expects singular model names in "type":
  // http://emberjs.com/api/data/classes/DS.Store.html#method_push
  //
  // but by default JSONAPISerializer produces plural:
  // https://github.com/emberjs/data/blob/c6d233b2/addon/serializers/json-api.js#L708-L723
  // https://github.com/emberjs/data/blob/c6d233b2/addon/serializers/json-api.js#L360-L368
  //
  // We override both of these functions to guard against future deprecations:
  // https://github.com/emberjs/data/blob/c6d233b2/addon/serializers/json-api.js#L598-L612
  payloadKeyFromModelName(modelName) { return modelName; },
  payloadTypeFromModelName(modelName) { return modelName; }
});
