const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      data.users_permissions_user = ctx.state.user.id;
      entity = await strapi.services.author.create(data, { files });
    } else {
      entity = await strapi.services.author.create({...ctx.request.body, users_permissions_user:ctx.state.user.id});
    }
    return sanitizeEntity(entity, { model: strapi.models.author });
  },

    /**
   * Retrieve records.
   *
   * @return {Array}
   */

    async find(ctx) {
        let entities;
        if (ctx.query._q) {
            entities = await strapi.services.author.search({...ctx.query, users_permissions_user: ctx.state.user.id});
        } else {
            entities = await strapi.services.author.find({...ctx.query, users_permissions_user: ctx.state.user.id});
        }

        return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.author }));
    },

    /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.author.findOne({ id, users_permissions_user: ctx.state.user.id });
    return sanitizeEntity(entity, { model: strapi.models.author });
  },

    /**
   * Update a record.
   *
   * @return {Object}
   */
     async update(ctx) {
        const { id } = ctx.params;
    
        let entity;
        if (ctx.is('multipart')) {
          const { data, files } = parseMultipartData(ctx);
          entity = await strapi.services.author.update({ id, users_permissions_user: ctx.state.user.id  }, data, {
            files,
          });
        } else {
          entity = await strapi.services.author.update({ id, users_permissions_user: ctx.state.user.id  }, ctx.request.body);
        }
    
        return sanitizeEntity(entity, { model: strapi.models.author });
      },

    /**
   * Delete a record.
   *
   * @return {Object}
   */

  async delete(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.author.delete({ id, users_permissions_user: ctx.state.user.id });
    return sanitizeEntity(entity, { model: strapi.models.author });
  },

   /**
   * Count records.
   *
   * @return {Number}
   */

    count(ctx) {
        if (ctx.query._q) {
          return strapi.services.author.countSearch({...ctx.query, users_permissions_user: ctx.state.user.id});
        }
        return strapi.services.author.count({...ctx.query, users_permissions_user: ctx.state.user.id});
      }  
};