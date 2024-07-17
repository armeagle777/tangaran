module.exports = [
  {
    method: 'GET',
    path: '/regions',
    handler: 'regionsController.findMany',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/regions/:regionId',
    handler: 'regionsController.find',
    config: {
      policies: [],
    },
  },
];
