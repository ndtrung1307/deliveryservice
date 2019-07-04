require('dotenv').config();
const Hapi = require('@hapi/hapi');
var Joi = require('@hapi/joi');

Joi.objectId = require('joi-objectid')(Joi);

const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT
    });

    await server.register([{
        plugin: require('./hapi-swagger')
    }]);

    server.route({
        method: 'POST',
        path: '/updateorderstatus/{id}',
        handler: (req, h) => {
      
            return h.response('Send Order status success!!!  ' + req.payload.status + '   ' + req.params.id).code(200);
        },
        options: {
            description: 'Send A message to update status of Order',
            notes: 'DEMO FOR KAFKA',
            tags: ['api'],
            validate : {
                params: {
                    id : Joi.objectId().required()
                },
                payload: {
                    status: Joi.string().valid(["delivered", "cancelled"]).required()
                }
            }
        }
    });
    
    await server.start((err) => {
        if (err) {
            throw err;
        }
        console.log('Server running on %s', server.info.uri);
    });
};



process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
