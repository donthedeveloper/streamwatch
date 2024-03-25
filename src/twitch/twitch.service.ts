import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AppTokenAuthProvider, RefreshingAuthProvider, StaticAuthProvider } from '@twurple/auth';
import { ApiClient } from '@twurple/api';
import { ChatClient } from '@twurple/chat';
import { EventSubWsListener } from '@twurple/eventsub-ws';

@Injectable()
export class TwitchService implements OnApplicationBootstrap {
    onApplicationBootstrap() {
        this.connectToTwitch();
    }

    private connectToTwitch() {
        console.log('Connect to Twitch!');

        const authProvider = new StaticAuthProvider(process.env.TWITCH_CLIENT_ID, process.env.TWITCH_ACCESS_TOKEN);

        // Connect Twitch chat client
        const chatClient = new ChatClient({ authProvider, channels: ['donthedeveloper'] });
        chatClient.connect();

        chatClient.onMessage((channel, user, text, msg) => {
            console.log(user, 'user id: ' + msg.userInfo.userId, text);
        });

        // Connect Twitch EventSub listener
        const apiClient = new ApiClient({ authProvider });

        const listener = new EventSubWsListener({ apiClient });
        listener.start();

        listener.onStreamOnline(process.env.TWITCH_USER_ID, (event) => {
            console.log(`${event.broadcasterDisplayName} just went live!`)
        });

        listener.onStreamOffline(process.env.TWITCH_USER_ID, (event) => {
            console.log(`${event.broadcasterDisplayName} just went offline.`)
        });
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
