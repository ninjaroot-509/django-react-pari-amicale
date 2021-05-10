from bet.models import *
from rest_framework import viewsets, permissions, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import *
import django_filters.rest_framework
from knox.auth import TokenAuthentication
from django.contrib.auth import login
from django.shortcuts import get_object_or_404
from django.http import HttpResponseRedirect
from django.conf import settings
import moncashify
import random
import string
# TODO: permissions: POST vs GET (ks https://stackoverflow.com/questions/55549786/how-to-set-different-permission-classes-for-get-and-post-requests-using-the-same)
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    # .order_by('?')
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = ProfileSerializer
    filterset_fields = ('user',)

class WalletViewSet(viewsets.ModelViewSet):
    queryset = Wallet.objects.all()
    # .order_by('?')
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = WalletSerializer
    filterset_fields = ('__all__')

class WalletTransactionViewSet(viewsets.ModelViewSet):
    queryset = WalletTransaction.objects.all()
    # .order_by('?')
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = WalletTransactionSerializer
    filterset_fields = ('__all__')

class RetraitViewSet(viewsets.ModelViewSet):
    queryset = Retrait.objects.all()
    # .order_by('?')
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = RetraitSerializer
    filterset_fields = ('__all__')

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        _,token = AuthToken.objects.create(user) 
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        }) 

import json
import simplejson
from django.core import serializers

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        _,token = AuthToken.objects.create(user) 
        login(request, user)
        # wallet = Wallet.objects.get(user=user.id)
        # coin = Coin.objects.get(user=user.id)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token,
            # "wallet": simplejson.dumps(wallet.montant),
            # "coin": simplejson.dumps(coin.coins),
        }) 

class UserAPI(generics.RetrieveAPIView):
    permission_classes = [ 
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


