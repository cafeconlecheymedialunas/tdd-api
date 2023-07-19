import { HashPasswordServiceInterface } from '../../domain/interfaces/services/HashPasswordServiceInterface';

import { ClientError } from '../../domain/types/errors';

export class HashPasswordService implements HashPasswordServiceInterface {
  readonly hashing;
  readonly saltRounds;

  constructor(hashing: any, saltRounds = 10) {
    this.hashing = hashing;

    this.saltRounds = saltRounds;
  }

  async hash(password: string): Promise<string | false> {
    const salt = await this.hashing.genSalt(this.saltRounds);

    const hash = await this.hashing.hash(password, salt);

    if (!hash) throw new ClientError();

    return hash;
  }

  async verify(password: string, hashedPassword: string): Promise<boolean> {
    return await this.hashing.compare(password, hashedPassword);
  }
}
