import { Injectable } from '@nestjs/common';

@Injectable()
export class TwitchStrategy {
    async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
        console.log('validate');
        const { displayName, email, id } = profile;
        const user = {
            twitchId: id,
            email,
            name: displayName,
            accessToken
        }

        done(null, user);
    }
}