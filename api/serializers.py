from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Tournament

User = get_user_model()


class LoginTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Añade claims extras
        token['email'] = user.email
        return token


class RegisterSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True, min_length=8)
    password2 = serializers.CharField(write_only=True, min_length=8)
    terms = serializers.BooleanField(write_only=True)

    class Meta:
        model = User
        fields = (
            'first_name', 'last_name', 'user_name',
            'email', 'password1', 'password2', 'terms'
        )

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError("Las contraseñas no coinciden.")
        
        if data['terms'] is False:
            raise serializers.ValidationError("Debes aceptar los términos y condiciones.") 
        
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            user_name=validated_data['user_name'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password1'])
        user.save()
        return user
       

class TournamentSerializer(serializers.ModelSerializer):
    state = serializers.ChoiceField(
        choices=Tournament.STATE_CHOICES,
        read_only=True
    )
    
    class Meta:
        model = Tournament
        fields = '__all__'
