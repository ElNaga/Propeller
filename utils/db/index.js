const mongoose = require('mongoose');
const config = require('../config');

const init = async () => {
    const url = config.get('db').url;
    const dbname = config.get('db').dbName;
    const dsn = `mongodb://${url}/${dbname}?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(dsn);
        console.log('Successfully connected to DB!');
    } catch (error) {
        console.error('Could not connect to DB:', error);
        process.exit(1);
    }
}

module.exports = {
    init
};