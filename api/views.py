from django.contrib.auth import authenticate, login, logout

from rest_framework import status
from rest_framework import generics, status, authentication, permissions 
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import filters

from django_filters.rest_framework import DjangoFilterBackend

from .serializers import RegisterSerializer, ChangePasswordSerializer, TournamentSerializer
from .models import Tournament

# Create your views here.

class RegisterAPI(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({
            "message": "Usuario creado correctamente"
        }, status=status.HTTP_201_CREATED)


class LoginAPI(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, username=email, password=password)
        
        if user:
            login(request, user)
            return Response({"message": "Login exitoso"}, status=200)
        
        return Response({"error": "Credenciales inválidas"}, status=401)


class LogoutAPI(APIView):
    def post(self, request):
        logout(request)
        return Response({"message": "Logout exitoso"}, status=200)


class ChangePasswordAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(
            data=request.data, 
            context={'request': request}
        )
        
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response({"message": "Contraseña cambiada"}, status=200)


class TournamentListCreateAPI(generics.ListCreateAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    authentication_classes = [
        authentication.SessionAuthentication,
        authentication.BasicAuthentication
    ]
    permission_classes = [permissions.IsAuthenticated]

    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = ['state', 'start_date', 'mode']
    ordering_fields  = ['start_date', 'name']
    search_fields    = ['name']


class TournamentDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    authentication_classes = [
        authentication.SessionAuthentication,
        authentication.BasicAuthentication
    ]
    permission_classes = [permissions.IsAuthenticated]

