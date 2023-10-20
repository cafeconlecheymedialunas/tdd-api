import http from 'http';
import net from 'net';
import { Express } from 'express';
import listEndpoints from 'express-list-endpoints';
import Application from './Application';

export default class Server {
  private routes: any;

  async isPortTaken(port: number): Promise<boolean> {
    return new Promise((resolve) => {
      const server = net
        .createServer()
        .once('error', () => resolve(true))
        .once('listening', () => {
          server.close();
          resolve(false);
        })
        .listen(port);
    });
  }

  async getAvailablePort(initialPort: number, maxAttempts: number): Promise<number | null> {
    let port = initialPort;

    let attempts = 0;

    while (attempts < maxAttempts) {
      const isTaken = await this.isPortTaken(port);

      if (!isTaken) {
        return port;
      }
      port++;
      attempts++;
    }

    return null;
  }

  async start(app: Express, initialPort: number, maxAttempts: number): Promise<http.Server | null> {
    const port = await this.getAvailablePort(initialPort, maxAttempts);

    if (port === null) {
      console.error('No se encontró un puerto disponible después de los intentos máximos.');
      return null;
    }

    const server = app.listen(port, async () => {
      console.log(`Servidor Express iniciado en el puerto ${port}`);
    });

    return server;
  }
}
