
const inert = require('inert');
const vision = require('vision');
const hapiSwagger = require('hapi-swagger');


module.exports = {
    name: 'Hapi-Swagger',
    version: '1.0',
    register: (server, options) => {
        try {
            hapiSwagger.options = {
                info: {
                    title: 'Delivery Service for Pizza Company API Documentation',
                    version: '1.0',
                },
                swaggerUI: true,
                documentationPage: true,
                documentationPath: '/docs',
            };

            server.register(vision);
            server.register(inert);
            server.register(hapiSwagger);



        } catch (error) {
            console.log(`Error registering swagger plugin: ${err}`);
        }
    }
};
 