import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AppTokenAuthProvider, RefreshingAuthProvider } from '@twurple/auth';
import { ChatClient } from '@twurple/chat';

@Injectable()
export class TwitchService implements OnApplicationBootstrap {
    onApplicationBootstrap() {
        this.connectToTwitch();
    }

    private connectToTwitch() {
        console.log('Connect to Twitch!');
    }

    async getTwitchToken(code: string) {
        try {
            const response = await fetch('https://id.twitch.tv/oauth2/token', {
                body: new URLSearchParams({
                    client_id: process.env.TWITCH_CLIENT_ID,
                    client_secret: process.env.TWITCH_CLIENT_SECRET,
                    code,
                    grant_type: 'authorization_code',
                    redirect_uri: process.env.TWITCH_OAUTH_REDIRECT_URI
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST'
            });

            if (!response.ok) {
                throw new Error('HTTP error status: ' + response.status);
            }

            return await response.json();
        } catch(error) {
            throw new Error('Something went wrong with the request to get the token by sending Twitch an authorization code.');
        } 
    }
}
