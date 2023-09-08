// Función para comprobar si un puerto está ocupado
import http from 'http';
import net from 'net';
import express, { Express } from 'express';

export default class Server {
  isPortTaken = async (port: number): Promise<boolean> => {
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
  };

  getAvailablePort = async (initialPort: number, maxAttempts: number): Promise<number | null> => {
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

    return null; // Si no se encuentra un puerto disponible después de los intentos máximos
  };

  start = async (app: Express, initialPort: number, maxAttempts: number): Promise<http.Server | null> => {
    const port = await this.getAvailablePort(initialPort, maxAttempts);

    if (port === null) {
      console.error('No se encontró un puerto disponible después de los intentos máximos.');
      return null;
    }

    const server = app.listen(port, () => {
      console.log(`Servidor Express iniciado en el puerto ${port}`);
    });

    return server;
  };
}
