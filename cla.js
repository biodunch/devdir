const algoliasearch = require('algoliasearch');

const client = algoliasearch(
  'DBGETQJB65',
  '9c9edc0d26065ce8cad687b661408caa'
);

const index = client.initIndex('demo_geo');

fetch('https://alg.li/doc-geo.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(airports) {
    index.addObjects(airports)
  });
