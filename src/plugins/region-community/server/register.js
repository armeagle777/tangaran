'use strict';

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: 'region',
    plugin: 'region-community',
    type: 'json',
    inputSize: {
      default: 6,
      isResizable: true,
    },
  });
};
