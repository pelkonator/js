'use strict';

/**
 * Read the documentation () to implement custom controller functions
 */

//module.exports = {};

module.exports = {
    /**
     * Create a record.
     *
     * @return {Object}
     */
  
    create(ctx) {
      return strapi.services.orders.create(ctx.request.body);
    },
  };