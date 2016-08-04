export function initialize(applicationInstance) {
  let store = applicationInstance.lookup('service:store');
  let shoebox = applicationInstance.lookup('service:fastboot').get('shoebox');

  shoebox.put('ember-data-store', {
    get records() {
      return Object.keys(store.typeMaps).map(k => {
        let name = store.typeMaps[k].type.modelName;
        return store.peekAll(name).toArray();
      }).reduce((a,b) => a.concat(b), [])
        .map(record => record.serialize({ includeId: true}))
        .reduce((a,b) => { a.data.push(b.data); return a; }, { data: [] });
    }
  });
}

export default {
  name: 'ember-data-fastboot',
  initialize
};
