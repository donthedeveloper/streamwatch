import { Controller, Get, Query } from '@nestjs/common';
import { TwitchService } from './twitch.service';

@Controller('twitch')
export class TwitchController {
    constructor(private readonly twitchService: TwitchService) {}

    @Get('oauth/callback')
    async callback(
        @Query('code') code: string,
        //TODO: generate random state string on FE and match it on BE, before the request to get the authorization code (security)
        // @Query('state') state: string
    ) {
        if (!code) {
            throw new Error(`Twitch didn't send back an authorization code.`);
        }

        const data = await this.twitchService.getTwitchToken(code);
        console.log(data);
    }

    // TODO: Try this first https://twurple.js.org/
}
