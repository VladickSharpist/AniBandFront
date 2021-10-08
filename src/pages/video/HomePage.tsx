/*import React, { useState, useEffect } from 'react';
import * as signalR from "@microsoft/signalr";
import Cookies from "universal-cookie"*/

const HomePage = () => {
    /*const ACCESS_TOKEN = 'access_token'
    const cookies = new Cookies()
    const [ connection, setConnection ] = useState<signalR.HubConnection>();

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:5001/hubs/notifications', { accessTokenFactory: () => cookies.get(ACCESS_TOKEN) })
            .withAutomaticReconnect()
            .build();
        newConnection.serverTimeoutInMilliseconds = 1000000
        
        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');

                    connection.on('SendNotificationAsync', (message: string) => {
                        console.log(message)
                     });

                    connection.on('GetNewNotificationsAsync', (messages: string[]) => {
                        messages.forEach((message: string) => {
                            console.log(message)
                        });
                     });

                })
                .catch((e: any) => console.log('Connection failed: ', e));
        }
    }, [connection]);*/

return(
    <div>
        HomePage
    </div>
)
}

export default HomePage