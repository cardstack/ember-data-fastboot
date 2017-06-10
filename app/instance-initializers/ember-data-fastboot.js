export function initialize(applicationInstance) {
  let shoebox = applicationInstance.lookup('service:fastboot').get('shoebox');
  if (!shoebox) { return; }
  let dump = shoebox.retrieve('ember-data-store');
  if (!dump) { return; }
  let store = applicationInstance.lookup('service:store');
  store.pushPayload(dump.records);
}

export default {
  name: 'ember-data-fastboot',
  initialize() {
    if (typeof FastBoot === 'undefined') {
      initialize(...arguments);
    }
  }
};
