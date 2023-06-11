from django.conf import settings
from django.http import HttpResponseRedirect
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client

def email_confirm_redirect(request, key):
    return HttpResponseRedirect(settings.EMAIL_CONFIRMATION_URL + '?key=' + key)

def password_reset_confirm_redirect(request, uidb64, token):
    return HttpResponseRedirect(settings.PASSWORD_RESET_CONFIRMATION_URL + '?uidb64=' + uidb64 + '&token=' + token)

class GoogleLoginView(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client
    callback_url = settings.GOOGLE_LOGIN_REDIRECT_URL