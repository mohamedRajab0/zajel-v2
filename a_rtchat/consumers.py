import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import User
from .models import ZajelMessage, ZajelGroup
from channels.db import database_sync_to_async


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        print(f'New connection to room: {self.room_name}')  # Log the connection


        # Join the room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        print(f"Handshake failed for room: {self.room_name}")
        await self.accept()
        print(f"Handshake successful for room: {self.room_name}")

    async def disconnect(self, close_code):
        # Leave the room group
        print(f'Disconnected from room: {self.room_name} with code {close_code}')
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Get the current user from the WebSocket scope
        user = self.scope["user"]

        # Save the message to the database
        await self.save_message(user, message)

        # Send the message to the room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'author': user.username if user.is_authenticated else 'Anonymous'
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']
        author = event['author']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'author': author
        }))

    @database_sync_to_async
    def save_message(self, user, message):
        group = ZajelGroup.objects.get(group_name=self.room_name)
        ZajelMessage.objects.create(
            group_name=group,
            author=user if user.is_authenticated else None,
            body=message
        )