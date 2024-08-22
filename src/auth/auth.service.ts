import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }

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
