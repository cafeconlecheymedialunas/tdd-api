import Application from './Application';
import Server from './Server';
import config from './config';

const app = Application.getInstance().run();

const initialPort = config.PORT;

const maxAttempts = 10;

const server = new Server();

server.start(app, initialPort, maxAttempts);

export { app };
