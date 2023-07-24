import { HashPasswordable } from '../../domain/interfaces/services/HashPasswordable';
import { ClientException } from '../../domain/types/errors';

export class HashPassword implements HashPasswordable {
  readonly hashing;
  readonly saltRounds;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(hashing: any, saltRounds = 10) {
    this.hashing = hashing;

    this.saltRounds = saltRounds;
  }

  hash = async (password: string): Promise<string | false> => {
    const salt = await this.hashing.genSalt(this.saltRounds);

    const hash = await this.hashing.hash(password, salt);

    if (!hash) throw new ClientException();

    return hash;
  };

  verify = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await this.hashing.compare(password, hashedPassword);
  };
}
