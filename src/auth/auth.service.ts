import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { ExtractJwt } from 'passport-jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../users/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }

  generateJwtToken(user: User) {
    const payload = { email: user.email, sub: user._id };
    return this.jwtService.sign(payload);
  }
  async validateUser(profile: Profile): Promise<User> {
    const { emails, displayName, id } = profile;
    const email = emails[0].value;
    let user = await this.userModel.findOne({ googleId: id });
    if (!user) {
      user = new this.userModel({
        googleId: id,
        email,
        displayName,
      });

      try {
        const savedUser = await user.save();
        console.log('User saved:', savedUser);
      } catch (err) {
        console.error('Error saving user:', err);
      }
    }

    return user;
  }
}
