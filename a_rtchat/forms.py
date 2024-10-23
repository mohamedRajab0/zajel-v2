from django.forms import  ModelForm
from django import forms
from.models import *

class MessageForms (ModelForm):
    class Meta:
        model = ZajelMessage
        fields = ['body']
        widget = {
            'body': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter message...'}),
        }
class GroupForms (ModelForm):
    class Meta:
        model = ZajelGroup
        fields = ['group_name']
        widget = {
            'group_name': forms.TextInput(attrs={'class': 'form-group','id': 'room-name-submit', 'placeholder': 'Enter group name...'}),
        }