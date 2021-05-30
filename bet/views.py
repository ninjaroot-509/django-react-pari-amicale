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
from django.shortcuts import get_object_or_404, redirect
from datetime import datetime, timedelta, time
from itertools import chain
import json
import requests
from rest_framework import status

# An api key is emailed to you when you sign up to a plan
api_key = 'cc7678327fff34159a75ee213a35a516'


def index(request):
    return render(request, "build/index.html")

def create_ref_code():
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=6))
    
def view_404(request, exception=None):
    # make a redirect to homepage
    # you can use the name of url or just the plain link
    return redirect('/') # or redirect('name-of-index-url')

class UserListView(APIView):
    def get(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(user=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
            user_list = Profile.objects.all().exclude(user=user) 
            for f in user_list:
                if f in user.profile.friends.all():
                    user_list = user_list.exclude(id=f.id)
            serializer = ProfileSerializer(user_list, many=True)
            return JsonResponse(serializer.data, safe=False)

class FriendListView(APIView):
    def get(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(user=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
            p = user.profile
            friends = p.friends.all()
            serializer = ProfileSerializer(friends, many=True)
            return JsonResponse(serializer.data, safe=False)

class DemandeReceiveView(APIView):
    def get(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(user=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
            dem = FriendRequest.objects.filter(to_user=user)  
            serializer = DemandeSerializer(dem, many=True)
            return JsonResponse(serializer.data, safe=False)

class DemandeSentView(APIView):
    def get(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(user=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
            dem = FriendRequest.objects.filter(from_user=user)  
            serializer = DemandeSerializer(dem, many=True)
            return JsonResponse(serializer.data, safe=False)

class RequestFriendView(APIView):
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
            id_add = request.data.get("id_add", None)
            id_cancel = request.data.get("id_cancel", None)
            id_accept = request.data.get("id_accept", None)
            if id_add != None:
                user_id_add = User.objects.get(pk=id_add)
                frequest, created = FriendRequest.objects.get_or_create(from_user=user,to_user=user_id_add)
                return JsonResponse({'status': 1, 'message': 'request successfully!'})
            if id_cancel != None:
                user_id_cancel = User.objects.get(pk=id_cancel)
                frequest = FriendRequest.objects.filter(from_user=user,to_user=user_id_cancel).first()
                frequest.delete()
                return JsonResponse({'status': 1, 'message': 'request successfully!'})
            if id_accept != None:
                from_user = User.objects.get(pk=id_accept)
                frequest = FriendRequest.objects.filter(to_user=user, from_user=from_user).first()
                user1 = frequest.to_user
                user2 = from_user
                user1.profile.friends.add(user2.profile)
                user2.profile.friends.add(user1.profile)
                frequest.delete()
                return JsonResponse({'status': 1, 'message': 'request successfully!'})
            return JsonResponse({'status': 0, 'message': 'errrorrr!'})

class GameView(APIView):
    def get(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(user=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
            now = datetime.now()
            games = Game.objects.filter(commence_time__gte=now, is_end=False).order_by('commence_time')[:10]
            serializer = GameSerializer(games, many=True)
            return JsonResponse(serializer.data, safe=False)

class GameDetailsView(APIView):
    def get(self, request, format=None):
        pk = request.GET.get('pk', None)
        game_id = request.GET.get('id')
        if pk != None:
            user = User.objects.get(user=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
            games = Game.objects.get(id=game_id, is_end=False)  
            serializer = GameSerializer(games, many=False)
            return JsonResponse(serializer.data, safe=False)


class BetView(APIView):
    def get(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(user=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
            now = datetime.now()
            bets = Bet.objects.filter(game__commence_time__gte=now,is_active=False)
            for f in bets:
                if f.owner.profile not in user.profile.friends.all():
                    bets = bets.exclude(owner=f.owner) 
            serializer = BetSerializer(bets, many=True)
            return JsonResponse(serializer.data, safe=False)

class AddBetView(APIView):
    def post(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(user=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
            wallet = Wallet.objects.get(user=user)
            game = request.data.get("game")
            prix = request.data.get("prix")
            winning_equipe = request.data.get("winning_equipe")
            game_id = Game.objects.get(pk=game)
            if int(wallet.montant) >= int(prix):
                if game and prix and winning_equipe:
                    filtre_exist = Bet.objects.filter(owner=user, game=game_id)  
                    if not filtre_exist.exists():
                        Wallet.objects.filter(user=user).update(montant=F('montant') - int(prix))
                        Bet.objects.get_or_create(owner=user, game=game_id, prix=prix, winning_equipe=winning_equipe)  
                else:
                    return JsonResponse({'status': 0, 'message': 'errorrr!!!'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return JsonResponse({'message': 'Votre solde est insuffisant'}, status=status.HTTP_400_BAD_REQUEST)
            return JsonResponse({'status': 1, 'message': 'request successfully!'})

class DeleteBetView(APIView):
    def post(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(user=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
            bet_id = request.data.get("bet_id")
            if bet_id:
                Bet.objects.filter(owner=user, id=bet_id, is_active=False).delete()  
            else:
                return JsonResponse({'status': 0, 'message': 'errorrr!!!'}, status=status.HTTP_400_BAD_REQUEST)
            return JsonResponse({'status': 1, 'message': 'request successfully!'})

class MyBetView(APIView):
    def get(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(user=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
            now = datetime.now()
            bets = Bet.objects.filter(game__commence_time__gte=now, owner=user, is_active=False)  
            serializer = BetSerializer(bets, many=True)
            return JsonResponse(serializer.data, safe=False)

class MyActiveBetView(APIView):
    def get(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(user=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
            bet1 = BetActive.objects.filter(user=user, is_end=False)  
            bet2 = BetActive.objects.filter(bet__owner=user, is_end=False)  
            bets = chain(bet1, bet2)
            serializer = BetActiveSerializer(bets, many=True)
            return JsonResponse(serializer.data, safe=False)

class MyOldBetView(APIView):
    def get(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(user=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
            bet1 = BetActive.objects.filter(user=user, is_end=True)  
            bet2 = BetActive.objects.filter(bet__owner=user, is_end=True)  
            bets = chain(bet1, bet2) 
            serializer = BetActiveSerializer(bets, many=True)
            return JsonResponse(serializer.data, safe=False)

class AcceptBetView(APIView):
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
            id_accept = request.data.get("id_accept")
            user_position = request.data.get("user_position")
            bet = Bet.objects.get(id=id_accept)
            wallet = Wallet.objects.get(user=user)
            if int(wallet.montant) >= int(bet.prix):
                Wallet.objects.filter(user=user).update(montant=F('montant') - int(bet.prix))
                if user_position == 'team1':
                    BetActive.objects.get_or_create(bet=bet, user=user, user_position='team1')
                    Bet.objects.filter(id=id_accept).update(is_active=True)
                elif user_position == 'team2':
                    BetActive.objects.get_or_create(bet=bet, user=user, user_position='team2')
                    Bet.objects.filter(id=id_accept).update(is_active=True)
                else:
                    return JsonResponse({'status': 0, 'message': 'errorrr!!!'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return JsonResponse({'message': 'Votre solde est insuffisant'}, status=status.HTTP_400_BAD_REQUEST)
            return JsonResponse({'status': 1, 'message': 'request successfully!'})

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
            return JsonResponse({'status': 0, 'message': 'User with this id not found'}, status=status.HTTP_400_BAD_REQUEST)

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
                return JsonResponse({'status': 0, 'message': 'inssuffisance du capitale'}, status=status.HTTP_400_BAD_REQUEST)
        if montant:
            if int(getwallet.montant) >= montant:
                Wallet.objects.filter(user=user).update(montant=F('montant') - montant)
            else:
                return JsonResponse({'status': 0, 'message': 'inssuffisance du capitale'}, status=status.HTTP_400_BAD_REQUEST)
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
            return JsonResponse({'status': 0, 'message': 'User with this id not found'}, status=status.HTTP_400_BAD_REQUEST)

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
                return JsonResponse({'status': 0, 'message': 'username existe deja'}, status=status.HTTP_400_BAD_REQUEST)
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
        return JsonResponse({'sites': p})

class MoncashView(APIView):
    def post(self, request, format=None):
        transaction_id = request.GET['transactionId']
        moncash = moncashify.API(settings.MONCASH_CLIENT_ID, settings.MONCASH_SECRET_KEY)
        transaction = moncash.transaction_details_by_transaction_id(transaction_id)
        if transaction:
            montant = transaction["payment"]["cost"]
            order_id = transaction["payment"]["reference"]
            req = WalletRequested.objects.get(ref_code=order_id, is_complete=False)
            Wallet.objects.filter(user=req.user).update(montant=F('montant') + montant)
            WalletRequested.objects.filter(ref_code=order_id).update(is_complete=True)
            return JsonResponse({'status': 1, 'message': 'wallet success'})
        else:
            return JsonResponse({'status': 0, 'message': 'wallet error'}, status=status.HTTP_400_BAD_REQUEST)

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
            return JsonResponse({'status': 0, 'message': 'User with this id not found'}, status=status.HTTP_400_BAD_REQUEST)

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
