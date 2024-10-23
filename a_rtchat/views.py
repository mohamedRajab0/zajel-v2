from django.shortcuts import render, get_object_or_404, redirect
from rest_framework import viewsets

from .forms import MessageForms, GroupForms
from .models import ZajelMessage, ZajelGroup
from django.contrib.auth.decorators import login_required
from .serializers import ZajelMessageSerializer, ZajelGroupSerializer

def index(request):
    zajel_group = ZajelGroup.objects.all()
    form = GroupForms()

    if request.method == 'POST':
        print("")
        form = GroupForms(request.POST)
        if form.is_valid():
            form.save()
            return redirect('chat:index')  # Redirect to the same page after successful form submission

    context = {
        'zajel_group': zajel_group,
        'form': form
    }
    return render(request, 'chat/index.html', context)

def room(request, room_name):
    group = get_object_or_404(ZajelGroup, group_name=room_name)
    messages = ZajelMessage.objects.filter(group_name=group).order_by('created')

    context = {
        'room_name': room_name,
        'messages': messages
    }
    return render(request, "chat/room.html", context)

from rest_framework import viewsets
from .models import ZajelMessage, ZajelGroup
from .serializers import ZajelMessageSerializer, ZajelGroupSerializer

class ZajelMessageViewSet(viewsets.ModelViewSet):
    queryset = ZajelMessage.objects.all()
    serializer_class = ZajelMessageSerializer

class ZajelGroupViewSet(viewsets.ModelViewSet):
    queryset = ZajelGroup.objects.all()
    serializer_class = ZajelGroupSerializer