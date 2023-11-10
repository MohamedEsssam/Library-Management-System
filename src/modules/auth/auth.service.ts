import { jwtEnv } from '@utils/environments';
import { sign } from 'jsonwebtoken';

export class AuthService {
  private readonly SECRET_KEY = jwtEnv['JWT_KEY'];
  private readonly EXPIRATION_TIME = jwtEnv['EXPIRATION_TIME'];

  generateToken(payload: any) {
    return sign(payload, this.SECRET_KEY, { expiresIn: this.EXPIRATION_TIME });
  }
}
