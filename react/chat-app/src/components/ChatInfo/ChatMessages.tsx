import {Box, Divider, Stack, Typography, useTheme} from "@mui/material";
import {faker} from '@faker-js/faker';
import cx from 'classnames';
import './ChatMessages.css'
import {useEffect, useState} from "react";
import {getMessages} from "../../services/chat.ts";

export const ChatMessages = ({conversationId}) => {
    const [messages, setMessages] = useState([{
        content: faker.lorem.sentence(),
        createdAt: faker.date.between({from: '2024-01-01T00:00:00.000Z', to: '2024-01-01T00:00:12.000Z'}),
        senderId: 1,
    }, {
        content: faker.lorem.sentence(),
        createdAt: faker.date.between({from: '2024-01-01T00:00:12.000Z', to: '2024-01-01T00:07:24.000Z'}),
        senderId: 1
    }, {
        content: faker.lorem.sentence(),
        createdAt: faker.date.between({from: '2024-01-02T00:00:00.000Z', to: '2024-02-03T00:00:00.000Z'}),
        senderId: 2
    }]);
    useEffect(() => {
        const response = getMessages(conversationId);
        Promise.all([response]).then((result) => {
            const messages = result[0].data.map((message) => {
                return {...message, createdAt: new Date(message.createdAt)}
            })
            console.log(messages)
            setMessages(messages)
        })
    }, [conversationId])

    const parsedMessages = new Map();

    messages.forEach((message) => {
        const key = message.createdAt.toDateString();
        if (parsedMessages.get(key)) {
            const prevMessage = parsedMessages.get(key);
            prevMessage.push(message)
            parsedMessages.delete(key)
            parsedMessages.set(key, prevMessage)
        } else {
            parsedMessages.set(key, [message])
        }
    })

    const Message = ({message}) => {
        return <div style={{width: '100%'}}>
            <div className={cx({
                'sent': message.senderId == 1,
                'received': message.senderId !== 1
            })}>
                <Box sx={{
                    backgroundColor: message.senderId == 1 ? theme.palette.primary.light : theme.palette.grey["500"],
                    margin: '10px',
                    width: '50%'
                }} className={'message-card'}>
                    <div key={message.content}>{message.content}</div>
                    <span style={{color: theme.palette.grey["600"]}}>{Intl.DateTimeFormat('en', {
                        hour: 'numeric',
                        minute: 'numeric'
                    }).format(message.createdAt)}</span>
                </Box>
            </div>
        </div>
    }

    const messagesContent = [];
    const theme = useTheme();
    parsedMessages.forEach((messages, date) => {
        messagesContent.push(<div>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <Divider sx={{width: '30%'}}/>
                <Typography variant='caption' sx={{color: theme.palette.text}}>
                    {date}
                </Typography>
                <Divider sx={{width: '30%'}}/>
            </Stack>
            {messages.map((message) => {
                return <Message message={message}/>
            })}
        </div>)
    })

    return (<Box sx={{flexGrow: 1, height: '100%', overflowY: 'scroll', backgroundColor: theme.palette.grey["200"]}}>
        <div>{messagesContent}</div>
    </Box>)
}