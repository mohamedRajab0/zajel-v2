from django.shortcuts import render, get_object_or_404, redirect
from requests import Response
from rest_framework import viewsets

from .forms import MessageForms, GroupForms
from .models import ZajelMessage, ZajelGroup
from django.contrib.auth.decorators import login_required
from .serializers import ZajelMessageSerializer, ZajelGroupSerializer
# from users.permmisson import IsInGroup
from django.contrib.auth.models import User
from rest_framework.decorators import action, api_view
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import BasicAuthentication
from rest_framework.response import Response
from rest_framework import status


def index(request):
    zajel_group = ZajelGroup.objects.all()
    form = GroupForms()

    if request.method == 'POST':
        print("")
        form = GroupForms(request.POST)
        if form.is_valid():
            form.save()
            # Redirect to the same page after successful form submission
            return redirect('chat:index')

    context = {
        'zajel_group': zajel_group,
        'form': form
    }
    return render(request, 'chat/index.html', context)


def room(request, room_name):
    group = get_object_or_404(ZajelGroup, group_name=room_name)
    messages = ZajelMessage.objects.filter(
        group_name=group).order_by('created')

    context = {
        'room_name': room_name,
        'messages': messages
    }
    return render(request, "chat/room.html", context)


class ZajelMessageViewSet(viewsets.ModelViewSet):
    queryset = ZajelMessage.objects.all()
    serializer_class = ZajelMessageSerializer

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        # Retrieve the message instance
        instance = self.get_object()

        # Check if the user is the author of the message
        if instance.author != request.user:
            return Response({"error": "You do not have permission to edit this message. go awawy"},
                            status=status.HTTP_403_FORBIDDEN)

        # if 'group_name' in request.data or 'author' in request.data:
        #     return Response({"error": "You cannot modify read-only fields: 'group_name' or 'author'."},
        #                     status=status.HTTP_400_BAD_REQUEST)

        # Proceed with the update if the user is the author
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


class ZajelGroupMessagesViewSet(viewsets.ModelViewSet):
    serializer_class = ZajelMessageSerializer

    def get_queryset(self):
        group_id = self.kwargs.get('group_id')  # Using 'group_id' directly
        print("group_id retrieved from URL:", group_id)

        if group_id is not None and ZajelGroup.objects.filter(id=group_id).exists():
            print(f"Filtering messages for group ID: {group_id}")
            messages = ZajelMessage.objects.filter(group_name_id=group_id)
            print("Filtered messages:", messages)
            return messages

        print("No valid group found or no messages associated with it.")
        return ZajelMessage.objects.none()

    def list(self, request, *args, **kwargs):
        group_id = self.kwargs.get('group_id')

        # Check if the group exists
        if not ZajelGroup.objects.filter(id=group_id).exists():
            print("==== Group not found ====")
            return Response({"error": "Group not found"}, status=status.HTTP_404_NOT_FOUND)

        # Call the superclass's list method to return the filtered messages
        return super().list(request, *args, **kwargs)


class ZajelGroupViewSet(viewsets.ModelViewSet):
    queryset = ZajelGroup.objects.all()
    serializer_class = ZajelGroupSerializer
