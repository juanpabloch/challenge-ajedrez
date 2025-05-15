from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin, 
    Group, Permission
)
from django.utils import timezone

# Create your models here.
class UserManager(BaseUserManager):

    def create_user(self, email, password):
        user = self.model(
            email=self.normalize_email(email),
            password=password,
        )
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password):
        user = self.create_user(
            email=email,
            password=password,
        )
        user.is_superuser = 1
        user.is_staff = 1
        user.is_active = 1
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=255, blank=False)
    last_name = models.CharField(max_length=255, blank=False)
    user_name = models.CharField(max_length=255, blank=False)
    password = models.CharField(max_length=255)
    email = models.CharField(max_length=100, unique=True)
    activated = models.IntegerField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active  = models.BooleanField(default=True)
    is_staff   = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    class Meta:
        db_table = 'users'

    def __str__(self):
        return self.email

    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_group_set',  # Cambia esto a un nombre único
        blank=True,
    )

    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_permissions_group_set',  # Cambia esto a un nombre único
        blank=True,
    )

class Tournament(models.Model):
    STATE_CHOICES = [
        ('pending', 'Pendiente'),
        ('in_progress', 'En curso'),
        ('finish', 'Finalizado'),
    ]

    MODE_CHOICES = [
        ('bullet', 'Bullet'),
        ('standard', 'Standard'),
    ]

    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    mode = models.CharField(
        max_length=20,
        choices=MODE_CHOICES,
    )
    state = models.CharField(
        max_length=11,
        choices=STATE_CHOICES,
        default=STATE_CHOICES[0][0],
    )
    start_date = models.DateField()
    start_time = models.TimeField()
    players = models.PositiveIntegerField()
    prize = models.PositiveIntegerField(help_text="Premio")

    def __str__(self):
        return self.name
