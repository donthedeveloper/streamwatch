import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class TwitchService implements OnApplicationBootstrap {
    onApplicationBootstrap() {
        this.connectToTwitch();
    }

    private connectToTwitch() {
        console.log('Connect to Twitch!');
    }
}
