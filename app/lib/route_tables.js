'use strict';

module.exports = function(routes) {
try{
    let columns = ['', 'Name', 'Path'];

    let Table = require('cli-table');

    let table = new Table({
        style: {
            head: ['green'],
            compact: true
        },
        head: columns
    });

    console.log('\n*********************************************************');
    console.log('\t\tAPIs for this service ');
    console.log('**********************************************************\n');

    for (const key of routes) {
        // if (routes.hasOwnProperty(key)) {
            let val = key;
            let row = {};
            let version = 1;
            let path;

            path = '/v' + version + val.path;

            row[val.method]  = [val.name, path];
            table.push(row);
        // }
    }

    console.log(table.toString());
    return table;
} catch(err) {
    throw new Error(err);
}
};
