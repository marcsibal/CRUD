import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { OAuth2Client  } from 'google-auth-library';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return false;
    }

    const token = authHeader.split(' ')[1];
    const client = new OAuth2Client ();
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return false;
    }

    request.user = {
      email: payload.email,
      name: payload.name,
    };
    return true;
  }
}
