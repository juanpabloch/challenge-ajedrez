from django.urls import path

from . import views


urlpatterns = [
    path('api/register/', views.RegisterAPI.as_view(), name='api_register'),
    path('api/login/',  views.LoginAPI.as_view(),  name='api_login'),
    path('api/logout/', views.LogoutAPI.as_view(), name='api_logout'),
    path('api/change-password/', views.ChangePasswordAPI.as_view(), name='api_change_password'),

    path('api/tournaments/', views.TournamentListCreateAPI.as_view(), name='tournament_list'),
    path('api/tournaments/<int:pk>/', views.TournamentDetailAPI.as_view(), name='tournament_detail'),
]
