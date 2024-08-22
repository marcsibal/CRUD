import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { User } from './types/user.interface';
import { AuthService } from './auth.service';
import { UserDocument } from '../users/schema/user.schema'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Req() req: Request) {
    // Initiates the Google OAuth flow
  }

  @Get('google/signin')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as UserDocument;
    return res.json({ message: "Login Successfully Email: " + user.email });


  }
}
