require('dotenv').config();
const Hapi = require('@hapi/hapi');
var Joi = require('@hapi/joi');

var consumer = require('./consumer');
var producer = require('./producer');


Joi.objectId = require('joi-objectid')(Joi);

const init = async () => {
    consumer;
    const server = Hapi.server({
        port: process.env.PORT
    });

    await server.register([{
        plugin: require('./hapi-swagger')
    }]);

    server.route({
        method: 'POST',
        path: '/updateorderstatus/{id}',
        handler: async (req, h) => {
            let res = await producer.sendMessage(req, h)
            return h.response(res).code(200);
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
