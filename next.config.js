const path = require('path');
const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');
const withImages = require('next-images');
const withPlugins = require("next-compose-plugins");
require('dotenv').config();


module.exports = {
    env: {
        APP_URL: process.env.NODE_ENV === 'development' ? 
                                        'http://localhost:3000' : 'https://ecommerce-frontend-tau.vercel.app',
        API_URL: 'http://digishop.opportunitytent.com',
        APP_ID: '614109506161618',
        CLIENT_ID: '515282459574-q49pt0cr2kmkcf5p3rjupjhebhm46r0g.apps.googleusercontent.com'
    },

webpack: config => {
    config.resolve.alias['components/admin'] = path.join(__dirname, 'components/admin')
    config.resolve.alias['components/forms'] = path.join(__dirname, 'components/forms')
    config.resolve.alias['components'] = path.join(__dirname, 'components')
    config.resolve.alias['store/admin'] = path.join(__dirname, 'store/admin')
    config.resolve.alias['store'] = path.join(__dirname, 'store')
    config.resolve.alias['styles'] = path.join(__dirname, 'styles')
    return config
}   
}