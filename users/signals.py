from django.dispatch import receiver
from django.db.models.signals import post_save
from allauth.account.models import EmailAddress
from django.contrib.auth.models import User
from .models import Profile


@receiver(post_save, sender=User)
def user_postsave(sender, instance, created, **kwargs):
    user = instance

    print("is my post save working ?")
    # add profile if user is created
    if created:
        print("Creating a profile for the user:", user)
        Profile.objects.create(user=user)
        print("Profile created:", user.profile)
    else:
        # update allauth emailaddress if exists
        print("user already")
        try:
            email_address = EmailAddress.objects.get_primary(user)
            if email_address.email != user.email:
                email_address.email = user.email
                email_address.verified = False
                email_address.save()
        except:
            # if allauth emailaddress doesn't exist create one
            EmailAddress.objects.create(
                user=user, email=user.email, primary=True, verified=False
            )