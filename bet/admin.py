from django.contrib import admin
from .models import *
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


admin.site.register(Game)
admin.site.register(Bet)
admin.site.register(BetActive)
admin.site.register(FriendRequest)
