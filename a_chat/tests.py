from django.test import TestCase
from .models import *
# Create your tests here.


class ZajelGroupTest(TestCase):
    def setUp(self):
        self.group = ZajelGroup.objects.create(group_name='test_group')
        self.user = User.objects.create(username='test_user')
        self.group.members.add(self.user)

    def test_group_name(self):
        self.assertEqual(self.group.group_name, 'test_group')

    def test_group_members(self):
        self.assertEqual(self.group.members.first(), self.user)

    def test_group_image(self):
        self.assertEqual(self.group.image, None)

    def test_group_description(self):
        self.assertEqual(self.group.description, None)

    def test_group_created(self):
        self.assertIsNotNone(self.group.created)

    def test_group_name_property(self):
        self.assertEqual(self.group.name, 'test_group')