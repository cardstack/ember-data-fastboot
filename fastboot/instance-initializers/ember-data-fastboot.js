import Ember from 'ember';

export function initialize(applicationInstance) {
  let store = applicationInstance.lookup('service:store');
  let shoebox = applicationInstance.lookup('service:fastboot').get('shoebox');
  const modelNames = applicationInstance.lookup('data-adapter:main').getModelTypes().mapBy('name');

  shoebox.put('ember-data-store', {
    get records() {
      return modelNames.map(name => {
        return store.peekAll(name).toArray();
      }).reduce((a,b) => a.concat(b), [])
        .filter(record => record.get('isLoaded') && !record.get('isNew'))
        .map(record => {
          const serializedRecord = record.serialize({ includeId: true});

          record.eachRelationship((name, meta) => {
            const link = record[meta.kind](name).link();

            if (link) {
              const dashName = Ember.String.dasherize(name);

              serializedRecord.data.relationships = serializedRecord.data.relationships || {}
              serializedRecord.data.relationships[dashName] = serializedRecord.data.relationships[dashName] || {}
              serializedRecord.data.relationships[dashName].links = {
                related: link
              }
            }
          })

          return serializedRecord
        })
        .reduce((a,b) => { a.data.push(b.data); return a; }, { data: [] });
    }
  });
}

export default {
  name: 'ember-data-fastboot',
  initialize
};
