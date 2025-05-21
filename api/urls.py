from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenBlacklistView,
)

from . import views


urlpatterns = [
    path('api/register/', views.RegisterAPI.as_view(), name='api_register'),

    path('api/tournaments/', views.TournamentListCreateAPI.as_view(), name='tournament_list'),
    path('api/tournaments/<int:pk>/', views.TournamentDetailAPI.as_view(), name='tournament_detail'),
    
    path('api/login/', views.LoginToken.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
