import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { ExtractJwt } from 'passport-jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

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
      await user.save();
    }

    return user;
  }
}
