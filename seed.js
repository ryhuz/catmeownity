const District = require('./models/district.model');

require('dotenv').config();
require('./lib/connection');

District.insertMany([
    {
        name: 'Buona Vista',
        locality: 'West',
    },
    {
        name: 'Dover',
        locality: 'West',
    },
    {
        name: 'West Coast',
        locality: 'West',
    },
    {
        name: 'Bugis',
        locality: 'South',
    },
    {
        name: 'Rochor',
        locality: 'South',
    },
    {
        name: 'Serangoon Road',
        locality: 'Central',
    },
    {
        name: 'Farrer Park',
        locality: 'Central',
    },
    {
        name: 'Cairnhill',
        locality: 'Central',
    },
    
]).then(suc => {
    console.log('successfully added users');
}).catch(e => {
    console.log('users failed to add');
    console.log(e)
});