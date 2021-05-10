from django.shortcuts import render
from rest_framework.generics import RetrieveUpdateAPIView
from django.http import HttpResponseRedirect
from django.conf import settings
import moncashify
import random
import string
from .serializers import *
from .models import *
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.core.mail import send_mail, BadHeaderError, mail_admins
from time import gmtime, strftime
from django.db.models import F
from knox.models import AuthToken
from django.shortcuts import get_object_or_404
from django.shortcuts import redirect

def view_404(request, exception=None):
    # make a redirect to homepage
    # you can use the name of url or just the plain link
    return redirect('/') # or redirect('name-of-index-url')

def index(request):
    return render(request, "build/index.html")

def create_ref_code():
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=6))


class WalletView(APIView):
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except:
            return None

    def get(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = Wallet.objects.get(user=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = Wallet.objects.get(user=tokenview)
        if not user:
            return JsonResponse({'status': 0, 'message': 'User with this id not found'})

        # You have a serializer that you specified which fields should be available in fo
        serializer = WalletSerializer(user)
        # And here we send it those fields to our react component as json
        # Check this json data on React side, parse it, render it as form.
        return JsonResponse(serializer.data, safe=False)

    def post(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = Profile.objects.get(user=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
        montant = request.data.get("montant", None)
        montantquiz = request.data.get("montantquiz", None)
        montantconver = request.data.get("montantconver", None)
        getwallet = Wallet.objects.get(user=user)
        if montantconver:
            kan = 10
            coin = int(montantconver) * int(kan)
            if int(getwallet.montant) >= int(montantconver):
                Wallet.objects.filter(user=user).update(montant=F('montant') - montantconver)
                Coin.objects.filter(user=user).update(coins=F('coins') + coin)
            else:
                return JsonResponse({'status': 0, 'message': 'inssuffisance du capitale'})
        if montant:
            if int(getwallet.montant) >= montant:
                Wallet.objects.filter(user=user).update(montant=F('montant') - montant)
            else:
                return JsonResponse({'status': 0, 'message': 'inssuffisance du capitale'})
        if montantquiz:
            kan = 10
            pricehere = int(montantquiz) / int(kan)
            Wallet.objects.filter(user=user).update(montant=F('montant') + pricehere)
        return JsonResponse({'status': 1, 'message': 'success!!'})


class ProfileUpdateView(APIView):
    def get_object(self, pk):
        try:
            return Profile.objects.get(pk=pk)
        except:
            return None
            
    def get(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = Profile.objects.get(user=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            print(tokenview)
            user = Profile.objects.get(user=tokenview)
        if not user:
            return JsonResponse({'status': 0, 'message': 'User with this id not found'})

        # You have a serializer that you specified which fields should be available in fo
        serializer = ProfileSerializer(user)
        # And here we send it those fields to our react component as json
        # Check this json data on React side, parse it, render it as form.
        return JsonResponse(serializer.data, safe=False)

    def post(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(pk=pk)
            userProfile = Profile.objects.get(pk=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
            userProfile = Profile.objects.get(pk=tokenview)
            
        username = request.data.get("username", None)
        first_name = request.data.get("first_name", None)
        last_name = request.data.get("last_name", None)
        email = request.data.get("email", None)
        phone = request.data.get("phone", None)
        bio = request.data.get("bio", None)
        photo = request.data.get("photo", None)
        if username:
            fil = User.objects.filter(username=username)
            if not fil:
                if username:
                    user.username = username
                if email:
                    user.email = email
                if first_name:
                    user.first_name = first_name
                if last_name:
                    user.last_name = last_name
                if phone:
                    userProfile.phone = phone
                if bio:
                    userProfile.bio = bio
                if photo:
                    userProfile.photo = photo
                user.save()
                userProfile.save()
                return JsonResponse({'status': 1, 'message': 'Your profile updated successfully!'})
            else:
                return JsonResponse({'status': 0, 'message': 'username existe deja'})
        else:
            if username:
                user.username = username
            if email:
                user.email = email
            if first_name:
                user.first_name = first_name
            if last_name:
                user.last_name = last_name
            if phone:
                userProfile.phone = phone
            if bio:
                userProfile.bio = bio
            if photo:
                userProfile.photo = photo
            user.save()
            userProfile.save()
            return JsonResponse({'status': 1, 'message': 'Your profile updated successfully!'})
            

class WalletFormView(APIView):
    # Assume you have a model named WalletRequested
    # this method will be used when walletreq try to update or save their wallet
    # for POST requests.
    def post(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(pk=pk)
        else:
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            user = User.objects.get(pk=tokenview)
        montant = request.data.get("montant")
        order_id = create_ref_code()
        WalletRequested.objects.create(user=user, montant=montant, ref_code=order_id)
        moncash = moncashify.API(settings.MONCASH_CLIENT_ID, settings.MONCASH_SECRET_KEY)
        payment = moncash.payment(order_id, int(montant))
        p = payment.redirect_url
        return JsonResponse({'site': p})

class MoncashView(APIView):
    def post(self, request, format=None):
        transaction_id = request.GET['transactionId']
        moncash = moncashify.API(settings.MONCASH_CLIENT_ID, settings.MONCASH_SECRET_KEY)
        transaction = moncash.transaction_details_by_transaction_id(transaction_id)
        if transaction:
            montant = transaction["payment"]["cost"]
            order_id = transaction["payment"]["reference"]
            req = WalletRequested.objects.get(ref_code=order_id, is_complete=False)
            Wallet.objects.filter(user=req.user).update(montant=montant)
            WalletRequested.objects.filter(ref_code=order_id).update(is_complete=True)
            return JsonResponse({'status': 1, 'message': 'wallet success'})
        else:
            return JsonResponse({'status': 0, 'message': 'wallet error'})

class RetraitView(APIView):
    def get(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = Wallet.objects.get(user=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = Retrait.objects.get(user=tokenview)
        if not user:
            return JsonResponse({'status': 0, 'message': 'User with this id not found'})

        # You have a serializer that you specified which fields should be available in fo
        serializer = RetraitSerializer(user, many=True)
        # And here we send it those fields to our react component as json
        # Check this json data on React side, parse it, render it as form.
        return JsonResponse(serializer.data, safe=False)

    def post(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(pk=pk)
        else:
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            user = User.objects.get(pk=tokenview)
        montant = request.data.get("montant")
        moncash_numero = request.data.get("phone")
        Retrait.objects.create(user=user, montant=montant)
        Wallet.objects.filter(user=user).update(montant=F('montant') - montant)
        subject = strftime("%Y-%m-%d %H:%M:%S", gmtime())
        messageadmin = "L'utilisateur %s veut faire un retrait de (%s Gourdes) a son compte moncash (%s) \n veuillez etre sure apres chaque retrait envoyer \n que vous activerez le button envoyer en True" % (user.username, montant, moncash_numero)
        mail_admins(subject, messageadmin)
        return JsonResponse({'status': 1, 'message': 'wallet success'})
