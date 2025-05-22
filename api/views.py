from django.contrib.auth import authenticate, login, logout

from rest_framework import generics, status, authentication, permissions, filters
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView

from django_filters.rest_framework import DjangoFilterBackend

from .serializers import RegisterSerializer, TournamentSerializer, LoginTokenSerializer
from .models import Tournament

# Create your views here.


class LoginToken(TokenObtainPairView):
    serializer_class = LoginTokenSerializer


class RegisterAPI(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = ()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({
            "message": "Usuario creado correctamente"
        }, status=status.HTTP_201_CREATED)


class TournamentListCreateAPI(generics.ListCreateAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = ['state', 'start_date', 'mode']
    ordering_fields  = ['start_date', 'name']
    search_fields    = ['name']


class TournamentDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

