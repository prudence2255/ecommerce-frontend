const path = require('path');
require('dotenv').config();


module.exports = {
    env: {
        API_URL: process.env.API_URL
    },

webpack: config => {
    config.resolve.alias['components/admin'] = path.join(__dirname, 'components/admin')
    config.resolve.alias['components'] = path.join(__dirname, 'components')
    config.resolve.alias['store/admin'] = path.join(__dirname, 'store/admin')
    config.resolve.alias['store'] = path.join(__dirname, 'store')
    config.resolve.alias['styles'] = path.join(__dirname, 'styles')
    return config
}   
}