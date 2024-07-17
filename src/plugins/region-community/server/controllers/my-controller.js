'use strict';

module.exports = ({ strapi }) => ({
  async findMany(ctx) {
    try {
      ctx.body = await strapi
        .plugin('region-community')
        .service('marketLocationsService')
        .getRegions();
    } catch (error) {
      console.error(error);
      ctx.body = error;
    }
  },

  async find(ctx) {
    try {
      ctx.body = await strapi
        .plugin('region-community')
        .service('marketLocationsService')
        .getRegionById(ctx);
    } catch (error) {
      console.error(error);
      ctx.body = error;
    }
  },
});
