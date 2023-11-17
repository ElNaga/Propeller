const mongoose = require('mongoose');
const config = require('../config');

const init = () => {
    const url = config.get('db').url;
    const dbname = config.get('db').dbName;
    const dsn = `mongodb+srv://${url}/${dbname}?retryWrites=true&w=majority`;
    mongoose.connect(
        dsn,
        err => {
            if (err) {
                return console.log('Could not connect to db', err);
            }
            console.log('Successfully connetcted to db');
        }
    )
};

module.exports = {
    init
};