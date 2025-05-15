from django.urls import path

from . import views


urlpatterns = [
    path('api/csrf/', views.get_csrf_token, name='api_csrf'),
    path('api/register/', views.RegisterAPI.as_view(), name='api_register'),
    path('api/login/',  views.LoginAPI.as_view(),  name='api_login'),
    path('api/logout/', views.LogoutAPI.as_view(), name='api_logout'),
    path('api/change-password/', views.ChangePasswordAPI.as_view(), name='api_change_password'),
]