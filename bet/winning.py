from django.contrib import admin
from .models import *
from django.shortcuts import get_object_or_404
from django.db.models import F
import json
import requests

def win_team1(modeladmin, request, queryset):
    for object in queryset:
        game = get_object_or_404(Game, id=object.bet.game.id)
        Game.objects.filter(id=object.bet.game.id, is_end=False).update(is_end=True)
        user_win = object.user
        if object.user_position == 'team1':
            Wallet.objects.filter(user=user_win).update(montant=F('montant') + object.bet.prix)
            BetActive.objects.filter(id=object.id).update(is_end=True, winning_user=user_win)
        else:
            Wallet.objects.filter(user=object.bet.owner).update(montant=F('montant') + object.bet.prix)
            BetActive.objects.filter(id=object.id).update(is_end=True, winning_user=object.bet.owner)

win_team1.short_description = 'Victoire de Team1'

def win_team2(modeladmin, request, queryset):
    for object in queryset:
        game = get_object_or_404(Game, id=object.bet.game.id)
        Game.objects.filter(id=object.bet.game.id, is_end=False).update(is_end=True)
        user_win = object.user
        if object.user_position == 'team2':
            Wallet.objects.filter(user=user_win).update(montant=F('montant') + object.bet.prix)
            BetActive.objects.filter(id=object.id).update(is_end=True, winning_user=user_win)
        else:
            Wallet.objects.filter(user=object.bet.owner).update(montant=F('montant') + object.bet.prix)
            BetActive.objects.filter(id=object.id).update(is_end=True, winning_user=object.bet.owner)

win_team2.short_description = 'Victoire de Team2'