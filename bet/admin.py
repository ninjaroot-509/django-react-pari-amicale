from django.contrib import admin
from .models import *
from django.shortcuts import get_object_or_404
from django.db.models import F
import json
import requests
# Register your models here.

class ProfileAdmin(admin.ModelAdmin):
    list_display = [
        'user',
        'phone',
    ]
admin.site.register(Profile, ProfileAdmin)

class WalletAdmin(admin.ModelAdmin):
    list_display = [
        'user',
        'montant',
    ]
    search_fields = ['montant', 'user']
admin.site.register(Wallet, WalletAdmin)

class WalletTransactionAdmin(admin.ModelAdmin):
    list_display = [
        'user',
        'montant',
    ]
    list_filter = ['date', 'user']
    search_fields = ['montant', 'user', 'date']
admin.site.register(WalletTransaction, WalletTransactionAdmin)

class RetraitAdmin(admin.ModelAdmin):
    list_display = [
        'user',
        'montant',
        'envoyer',
        'is_done'
    ]
    list_editable = ['is_done',]
    list_filter = ['date', 'user', 'envoyer', 'is_done']
    search_fields = ['montant', 'user', 'date']
admin.site.register(Retrait, RetraitAdmin)

class WalletRequestedAdmin(admin.ModelAdmin):
    list_display = [
        'user',
        'montant',
        'is_complete',
        'date',
        'expiry'
    ]
    list_filter = ['date', 'user', 'is_complete']
    search_fields = ['montant', 'user', 'date']
admin.site.register(WalletRequested, WalletRequestedAdmin)

admin.site.register(Bet)
admin.site.register(BetActive)
admin.site.register(FriendRequest)

def win_team1(modeladmin, request, queryset):
    for object in queryset:
        game = get_object_or_404(Game, id=object.id)
        Game.objects.filter(id=object.id).update(is_end=True)
        active = BetActive.objects.filter(bet__game=game, is_end=False)
        if active:
            for a in active:
                user_win = a.user
                if a.user_position == 'team1':
                    Wallet.objects.filter(user=user_win).update(montant=F('montant') + a.bet.prix)
                    BetActive.objects.filter(id=a.id, winning_user=user_win).update(is_end=True)
                else:
                    Wallet.objects.filter(user=a.bet.owner).update(montant=F('montant') + a.bet.prix)
                    BetActive.objects.filter(id=a.id, winning_user=a.bet.owner).update(is_end=True)
        else:
            print('pas de pari active pour ce match')

win_team1.short_description = 'Victoire de Team1'

def win_team2(modeladmin, request, queryset):
    for object in queryset:
        game = get_object_or_404(Game, id=object.id)
        Game.objects.filter(id=object.id).update(is_end=True)
        active = BetActive.objects.filter(bet__game=game, is_end=False)
        if active:
            for a in active:
                BetActive.objects.filter(id=a.id).update(is_end=True)
                user_win = a.user
                if a.user_position == 'team2':
                    Wallet.objects.filter(user=user_win).update(montant=F('montant') + a.bet.prix)
                    BetActive.objects.filter(id=a.id, winning_user=user_win).update(is_end=True)
                else:
                    Wallet.objects.filter(user=a.bet.owner).update(montant=F('montant') + a.bet.prix)
                    BetActive.objects.filter(id=a.id, winning_user=a.bet.owner).update(is_end=True)
        else:
            print('pas de pari active pour ce match')

win_team2.short_description = 'Victoire de Team2'

def update_game_list(modeladmin, request, queryset):
    api_key = 'cc7678327fff34159a75ee213a35a516'
    sport_key = 'upcoming'

    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': sport_key,
        'region': 'us', # uk | us | eu | au
        'mkt': 'h2h', # h2h | spreads | totals
        'dateFormat': 'iso'
    })

    odds_json = json.loads(odds_response.text)
    if not odds_json['success']:
        return JsonResponse({'status': 0, 'message': 'There was a problem with the odds request:' + odds_json['msg']})
    else:
        objs = odds_json['data']
        for obj in objs:
            verif = Game.objects.filter(api_id=obj['id'])
            if not verif.exists():
                if obj['sport_key'] == 'basketball_nba':
                    Game.objects.create(
                        api_id=obj['id'], 
                        sport_key=obj['sport_key'], 
                        sport_nice=obj['sport_nice'], 
                        team1=obj['teams'][0], 
                        team2=obj['teams'][1],
                        home_team=obj['home_team'],
                        commence_time=obj['commence_time'],
                        site_key=obj['sites'][0]['site_key'],
                        site_nice=obj['sites'][0]['site_nice'],
                        last_update=obj['sites'][0]['last_update'],
                        win=obj['sites'][0]['odds']['h2h'][0],
                        lose=obj['sites'][0]['odds']['h2h'][1],
                        is_basket=True
                    )
                elif obj['sport_key'] == 'soccer_epl':
                    Game.objects.create(
                        api_id=obj['id'], 
                        sport_key=obj['sport_key'], 
                        sport_nice=obj['sport_nice'], 
                        team1=obj['teams'][0], 
                        team2=obj['teams'][1],
                        home_team=obj['home_team'],
                        commence_time=obj['commence_time'],
                        site_key=obj['sites'][0]['site_key'],
                        site_nice=obj['sites'][0]['site_nice'],
                        last_update=obj['sites'][0]['last_update'],
                        win=obj['sites'][0]['odds']['h2h'][0],
                        null=obj['sites'][0]['odds']['h2h'][2],
                        lose=obj['sites'][0]['odds']['h2h'][1],
                        is_foot=True
                    )
                elif obj['sport_key'] == 'baseball_mlb':
                    Game.objects.create(
                        api_id=obj['id'], 
                        sport_key=obj['sport_key'], 
                        sport_nice=obj['sport_nice'], 
                        team1=obj['teams'][0], 
                        team2=obj['teams'][1],
                        home_team=obj['home_team'],
                        commence_time=obj['commence_time'],
                        site_key=obj['sites'][0]['site_key'],
                        site_nice=obj['sites'][0]['site_nice'],
                        last_update=obj['sites'][0]['last_update'],
                        win=obj['sites'][0]['odds']['h2h'][0],
                        lose=obj['sites'][0]['odds']['h2h'][1],
                        is_baseball=True
                    )
                else:
                    print('error request')

update_game_list.short_description = 'update game list'

class GameAdmin(admin.ModelAdmin):
    list_display = [
        'team1',
        'team2',
        'commence_time',
        'is_foot',
        'is_basket',
        'is_baseball',
        'is_end'
    ]
    list_editable = ['is_end',]
    list_filter = ['commence_time', 'team1', 'team2', 'is_end']
    actions = [update_game_list, win_team1, win_team2]
    search_fields = ['team1', 'team2', 'commence_time']
admin.site.register(Game, GameAdmin)
