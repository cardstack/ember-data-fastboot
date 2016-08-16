export function initialize(applicationInstance) {
  let store = applicationInstance.lookup('service:store');
  let shoebox = applicationInstance.lookup('service:fastboot').get('shoebox');

  let shoeboxSerializer = applicationInstance.lookup('serializer:-shoebox');
  shoeboxSerializer.set('store', store);

  shoebox.put('ember-data-store', {
    get records() {
      return Object.keys(store.typeMaps).map(k => {
        let name = store.typeMaps[k].type.modelName;
        return store.peekAll(name).toArray();
      }).reduce((a,b) => a.concat(b), [])
        .filter(record => {
          // Filter records without an id because they cannot be deserialized.
          // Call deleteRecord to remove it from any relationships.
          if (record.get('id')) return true;
          store.deleteRecord(record);
          return false;
        })
        .map(record => record._createSnapshot())
        .map(snapshot => shoeboxSerializer.serialize(snapshot, { includeId: true }))
        .reduce((a,b) => { a.data.push(b.data); return a; }, { data: [] });
    }
  });
}

export default {
  name: 'ember-data-fastboot',
  initialize
};
