import * as signalR from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function useNotification(accessToken: string){

    const [ connection, setConnection ] = useState<signalR.HubConnection>();

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:5001/hubs/notifications', { accessTokenFactory: () => accessToken })
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
                        toast.info(message, { 
                            position: "bottom-left",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined, 
                        })
                     });

                    connection.on('GetNewNotificationsAsync', (messages: string[]) => {
                        messages.forEach((message: string) => {
                            console.log(message)
                        });
                     });

                })
                .catch((e: any) => console.log('Connection failed: ', e));
        }
    }, [connection]);
}

export { useNotification }