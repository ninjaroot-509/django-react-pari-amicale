from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from phonenumber_field.modelfields import PhoneNumberField
from django.core.mail import send_mail, BadHeaderError, mail_admins

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True)
    phone = PhoneNumberField()
    photo = models.ImageField(default='photo.jpg', upload_to='profile_pics/', null=True, blank=True)
    friends = models.ManyToManyField("Profile",blank=True)

    class Meta:
        verbose_name = 'Profile Liste'
        verbose_name_plural = 'Listes des profiles'

    def __str__(self):
        return self.user.username

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

class FriendRequest(models.Model):
	to_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='to_user', on_delete=models.CASCADE)
	from_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='from_user', on_delete=models.CASCADE)
	timestamp = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return "From {}, to {}".format(self.from_user.username, self.to_user.username)

class Wallet(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    montant = models.FloatField(default=0)

    class Meta:
        verbose_name = 'Portefeuille Liste'
        verbose_name_plural = 'Listes des portefeuilles'

    def __str__(self):
        return '{} a {} Gourdes'.format(self.user.username, self.montant) # TODO

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_wallet(sender, instance, created, **kwargs):
    if created:
        Wallet.objects.create(user=instance)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def save_user_wallet(sender, instance, **kwargs):
    instance.wallet.save()

import datetime
from django.utils import timezone

class WalletRequested(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    montant = models.FloatField(default=0)
    ref_code = models.CharField(max_length=6)
    is_complete = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)
    expiry = models.DateTimeField(default=timezone.now() + datetime.timedelta(seconds=1200))

    class Meta:
        verbose_name = 'Recharge Liste'
        verbose_name_plural = 'Listes des recharges'

    def __str__(self):
        return self.user.username # TODO

class WalletTransaction(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    montant = models.FloatField(default=0)
    date = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'Transaction Liste'
        verbose_name_plural = 'Listes des transactions'

    def __str__(self):
        return '{} a recu {} Gourdes le {}'.format(self.user.username, self.montant, self.date) # TODO

    
class Retrait(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    montant = models.FloatField(default=0)
    is_done = models.BooleanField(default=True)
    envoyer = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Retrait Liste'
        verbose_name_plural = 'Listes des retraits'
    
    def __str__(self):
        return '{} a retire {} Gourdes a son portefeuille le {}'.format(self.user.username, self.montant, self.date) # TODO



class Game(models.Model):
    api_id = models.CharField(max_length=200)
    sport_key = models.CharField(max_length=100)
    sport_nice = models.CharField(max_length=100)
    team1 = models.CharField(max_length=250)
    team2 = models.CharField(max_length=250)
    home_team = models.CharField(max_length=250)
    commence_time = models.DateTimeField()
    add_time = models.DateTimeField(auto_now_add=True)
    site_key = models.CharField(max_length=100)
    site_nice = models.CharField(max_length=100)
    last_update = models.DateTimeField()
    win = models.CharField(max_length=100)
    null = models.CharField(max_length=100, null=True, blank=True)
    lose = models.CharField(max_length=100)
    is_foot = models.BooleanField(default=False)
    is_other = models.BooleanField(default=False)
    is_end = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Matchs Liste'
        verbose_name_plural = 'Listes des matchs'

    def __str__(self):
        return '{} VS {}'.format(self.team1, self.team2) # TODO


class Bet(models.Model): 
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    prix = models.FloatField(default=0)
    winning_equipe = models.CharField(max_length=250, blank=True)
    is_null = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Paris Liste'
        verbose_name_plural = 'Listes des Paris'

    def __str__(self):
        return '{} VS {}'.format(self.game.team1, self.game.team2) # TODO

class BetActive(models.Model): 
    bet = models.ForeignKey(Bet, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    user_position = models.CharField(max_length=250)
    winning_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='winning_user', on_delete=models.CASCADE, null=True, blank=True)
    is_end = models.BooleanField(default=False)
    add_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'ParisActive Liste'
        verbose_name_plural = 'Listes des ParisActive'

    def __str__(self):
        return '{} VS {}'.format(self.bet.game.team1, self.bet.game.team2) # TODO
