import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { config } from '../../configuration/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config().jwtSecret,
    });
  }

  async validate(payload: { userId: string }) {
    const user = await this.usersService.findOneById(payload.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
