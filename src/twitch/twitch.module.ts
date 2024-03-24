import { Module } from '@nestjs/common';
import { TwitchService } from './twitch.service';
import { TwitchController } from './twitch.controller';
import { TwitchStrategy } from './twitch.strategy';

@Module({
    providers: [TwitchService, TwitchStrategy],
    controllers: [TwitchController]
})
export class TwitchModule {}
