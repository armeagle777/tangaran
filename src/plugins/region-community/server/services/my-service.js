'use strict';

module.exports = ({ strapi }) => ({
  async getRegions() {
    const regions = await strapi.entityService.findMany('api::region.region', {
      fields: ['id', 'name'],
      // populate: {
      //   communities: { fields: ['name'] },
      // },
    });
    console.log('regions::::::',regions);
    
    return regions;
  },
  async getRegionById(ctx) {
    const { regionId } = ctx.params;
    if (!regionId) throw new NotFoundError('No market found with given id');
    const region = await strapi.entityService.findOne('api::region.region', regionId, {
      fields: ['id', 'name'],
      // populate: {
      //   communities: { fields: ['name'] },
      // },
    });
    console.log('region::::::',region);
    
    return region;
  },
});
