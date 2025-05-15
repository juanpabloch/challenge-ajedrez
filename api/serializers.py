from django.contrib.auth import get_user_model

from rest_framework import serializers

User = get_user_model()


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
    

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField()
    new_password1 = serializers.CharField(min_length=8)
    new_password2 = serializers.CharField(min_length=8)

    def validate(self, attrs):
        if attrs['new_password1'] != attrs['new_password2']:
            raise serializers.ValidationError("Las nuevas contraseñas no coinciden.")
        return attrs

    def save(self, **kwargs):
        user = self.context['request'].user
        if not user.check_password(self.validated_data['old_password']):
            raise serializers.ValidationError("La contraseña actual es incorrecta.")
        
        user.set_password(self.validated_data['new_password1'])
        user.save()
        
        return user
       
