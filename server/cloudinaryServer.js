const dotenv = require('dotenv');
dotenv.config();

module.exports = ({ env }) => ({
    upload: {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: env(process.env.CLOUDINARY_NAME),
          api_key: env(process.env.CLOUDINARY_KEY),
          api_secret: env(process.env.CLOUDINARY_SECRET),
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    },
});