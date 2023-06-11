from django.urls import path
from dj_rest_auth.registration.views import RegisterView, ResendEmailVerificationView, VerifyEmailView
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView, PasswordResetView, PasswordResetConfirmView
from . import views

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', RegisterView.as_view(), name='register'),
    path('user/', UserDetailsView.as_view(), name='user-details'),
    path('password/reset/', PasswordResetView.as_view(), name='password_reset'),
    path('password/reset/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('email/resend/', ResendEmailVerificationView.as_view(), name='resend_email_verification'),
    path('email/verify/', VerifyEmailView.as_view(), name='verify_email'),
    path('confirm/', views.email_confirm_redirect, name='email-confirm'),
    path('reset/', views.password_reset_confirm_redirect, name='password-reset-confirm'),
    path('google/', views.GoogleLoginView.as_view(), name='google-login'),
]