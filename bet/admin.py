from django.contrib import admin
from .models import *
from django.shortcuts import get_object_or_404
from django.db.models import F
import json
import requests
# Register your models here.
from .winning import * 
from .the_odd_api import * 

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
class BetActiveAdmin(admin.ModelAdmin):
    list_display = [
        'user',
        'team1',
        'team2',
        'user_position',
        'winning_user',
        'add_time',
        'is_end'
    ]
    list_editable = ['is_end',]
    list_filter = ['user', 'user_position', 'add_time', 'is_end']
    actions = [ win_team1, win_team2]
    search_fields = ['user_position', 'user', 'add_time']
admin.site.register(BetActive, BetActiveAdmin)
admin.site.register(FriendRequest)
admin.site.register(Category)




class GameAdmin(admin.ModelAdmin):
    list_display = [
        'team1',
        'team2',
        'category',
        'sport_key',
        'commence_time',
        'is_end'
    ]
    list_editable = ['is_end',]
    list_filter = ['commence_time', 'sport_key', 'team1', 'team2', 'category', 'is_end']
    actions = [ win_team1, win_team2, update_game_list, all_game_list]
    search_fields = ['team1', 'team2', 'commence_time']
admin.site.register(Game, GameAdmin)
