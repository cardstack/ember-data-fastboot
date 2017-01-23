import Ember from 'ember';

export function initialize(applicationInstance) {
  let shoebox = applicationInstance.lookup('service:fastboot').get('shoebox');
  if (!shoebox) { return; }
  let dump = shoebox.retrieve('ember-data-store');
  if (!dump) { return; }
  let store = applicationInstance.lookup('service:store');

  Object.keys(dump.records).forEach((modelName) => {
    let recordsToPush = {};
    recordsToPush[modelName] = dump.records[modelName];
    if (Ember.isEmpty(recordsToPush[modelName])) { return; }

    if (Object.keys(recordsToPush[modelName]).includes('data')) {
      recordsToPush = recordsToPush[modelName];
    }

    store.pushPayload(modelName, recordsToPush);
  });
}

export default {
  name: 'ember-data-fastboot',
  initialize
};
