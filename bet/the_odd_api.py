from django.contrib import admin
from .models import *
from django.shortcuts import get_object_or_404
from django.db.models import F
import json
import requests
from django.http import JsonResponse

def update_game_list(modeladmin, request, queryset):
    api_key = 'cc7678327fff34159a75ee213a35a516'
    sport_key = 'upcoming'

    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': sport_key,
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )

update_game_list.short_description = 'update upcoming game list'


def all_game_list(modeladmin, request, queryset):
    api_key = 'cc7678327fff34159a75ee213a35a516'

    ##########################################################################
    #soccer_uefa_champs_league##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_uefa_champs_league',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )

    ##########################################################################
    #soccer_uefa_europa_league##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_uefa_europa_league',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #soccer_uefa_european_championship##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_uefa_european_championship',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #soccer_usa_mls##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_usa_mls',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )

    #americanfootball_ncaaf

    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'americanfootball_ncaaf',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #americanfootball_nfl##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'americanfootball_nfl',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    # ##########################################################################
    # #americanfootball_nfl_super_bowl_winner##
    # ##########################################################################
    # odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
    #     'api_key': api_key,
    #     'sport': 'americanfootball_nfl_super_bowl_winner',
    #     'region': 'us', # uk | us | eu | au
    #     'mkt': 'totals', # h2h | spreads | totals
    #     'dateFormat': 'iso'
    # })

    # odds_json = json.loads(odds_response.text)
    # if not odds_json['success']:
    #     return JsonResponse({'status': 0, 'message': 'There was a problem with the odds request: americanfootball_nfl_super_bowl_winner' + odds_json['msg']})
    # else:
    #     objs = odds_json['data']
    #     for obj in objs:
    #         verif = Game.objects.filter(api_id=obj['id'])
    #         if not verif.exists():
    #             category = get_object_or_404(Category, title=obj['sport_key'])
    #             Game.objects.create(
    #                 api_id=obj['id'], 
    #                 sport_key=obj['sport_key'], 
    #                 sport_nice=obj['sport_nice'], 
    #                 team1=obj['teams'][0], 
    #                 team2=obj['teams'][1],
    #                 home_team=obj['home_team'],
    #                 commence_time=obj['commence_time'],
    #                 category=category
    #             )
    ##########################################################################
    #baseball_mlb##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'baseball_mlb',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )

    ##########################################################################
    #basketball_euroleague##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'basketball_euroleague',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #basketball_nba##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'basketball_nba',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #basketball_ncaab##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'basketball_ncaab',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #soccer_argentina_primera_division##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_argentina_primera_division',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #soccer_australia_aleague##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_australia_aleague',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )

    ##########################################################################
    #soccer_belgium_first_div##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_belgium_first_div',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #soccer_brazil_campeonato##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_brazil_campeonato',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    
    ##########################################################################
    #soccer_china_superleague##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_china_superleague',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #soccer_denmark_superliga##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_denmark_superliga',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #soccer_efl_champ##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_efl_champ',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #soccer_england_league1##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_england_league1',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #soccer_england_league2##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_england_league2',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #soccer_epl##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_epl',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #soccer_fa_cup##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_fa_cup',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #soccer_fifa_world_cup##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_fifa_world_cup',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )

    ##########################################################################
    #soccer_finland_veikkausliiga##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_finland_veikkausliiga',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #soccer_france_ligue_one##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_france_ligue_one',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #soccer_france_ligue_two##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_france_ligue_two',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #soccer_germany_bundesliga##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_germany_bundesliga',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #soccer_germany_bundesliga2##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_germany_bundesliga2',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #soccer_italy_serie_a##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_italy_serie_a',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #soccer_italy_serie_b##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_italy_serie_b',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #soccer_japan_j_league##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_japan_j_league',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #soccer_korea_kleague1##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_korea_kleague1',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #soccer_league_of_ireland##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_league_of_ireland',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )

    ##########################################################################
    #soccer_mexico_ligamx##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_mexico_ligamx',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #soccer_netherlands_eredivisie##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_netherlands_eredivisie',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #soccer_norway_eliteserien##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_norway_eliteserien',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #soccer_portugal_primeira_liga##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_portugal_primeira_liga',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #soccer_russia_premier_league##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_russia_premier_league',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )

    ##########################################################################
    #soccer_spain_la_liga##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_spain_la_liga',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #soccer_spain_segunda_division##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_spain_segunda_division',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )

    ##########################################################################
    #soccer_spl##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_spl',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #soccer_sweden_allsvenskan##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_sweden_allsvenskan',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #soccer_sweden_superettan##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_sweden_superettan',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )
    ##########################################################################
    #soccer_switzerland_superleague##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_switzerland_superleague',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )

    ##########################################################################
    #soccer_turkey_super_league##
    ##########################################################################
    odds_response = requests.get('https://api.the-odds-api.com/v3/odds', params={
        'api_key': api_key,
        'sport': 'soccer_turkey_super_league',
        'region': 'us', # uk | us | eu | au
        'mkt': 'totals', # h2h | spreads | totals
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
                category = get_object_or_404(Category, title=obj['sport_key'])
                Game.objects.create(
                    api_id=obj['id'], 
                    sport_key=obj['sport_key'], 
                    sport_nice=obj['sport_nice'], 
                    team1=obj['teams'][0], 
                    team2=obj['teams'][1],
                    home_team=obj['home_team'],
                    commence_time=obj['commence_time'],
                    category=category
                )

all_game_list.short_description = 'update tout les matchs'