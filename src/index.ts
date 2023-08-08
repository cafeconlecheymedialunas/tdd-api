import Application from './Application';

const application = Application.getInstance();

application.config();
application.routes();
application.errors();
application.server();

export { application };
