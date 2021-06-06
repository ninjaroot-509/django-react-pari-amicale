from rest_framework import serializers
from bet.models import *
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    first_name = serializers.ReadOnlyField(source='user.first_name')
    last_name = serializers.ReadOnlyField(source='user.last_name')
    class Meta:
        model = Profile
        fields = '__all__'
        # read_only_fields = ('user',)

class DemandeSerializer(serializers.ModelSerializer):
    from_user_name = serializers.CharField(source='from_user.username')
    to_user_name = serializers.CharField(source='to_user.username')
    class Meta:
        model = FriendRequest
        fields = '__all__'
        # read_only_fields = ('user',)

class GameSerializer(serializers.ModelSerializer):
    cate_name = serializers.CharField(source='category.name')
    cate_groupe = serializers.CharField(source='category.groupe')
    class Meta:
        model = Game
        fields = '__all__'
        # read_only_fields = ('user',)

class BetSerializer(serializers.ModelSerializer):
    owner_name = serializers.CharField(source='owner.username')
    team1 = serializers.CharField(source='game.team1')
    team2 = serializers.CharField(source='game.team2')
    commence_time = serializers.CharField(source='game.commence_time')
    class Meta:
        model = Bet
        fields = '__all__'
        # read_only_fields = ('user',)

class BetActiveSerializer(serializers.ModelSerializer):
    team1 = serializers.CharField(source='bet.game.team1')
    team2 = serializers.CharField(source='bet.game.team2')
    winning_equipe = serializers.CharField(source='bet.winning_equipe')
    is_null = serializers.BooleanField(source='bet.is_null')
    commence_time = serializers.CharField(source='bet.game.commence_time')
    acceptors_name = serializers.CharField(source='user.username')
    owner_name = serializers.CharField(source='bet.owner.username')
    owner_id = serializers.ReadOnlyField(source='bet.owner.id')
    prix = serializers.CharField(source='bet.prix')
    class Meta:
        model = BetActive
        fields = '__all__'
        # read_only_fields = ('user',)

class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = '__all__'
        # read_only_fields = ('user',)

class WalletTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WalletTransaction
        fields = '__all__'
        # read_only_fields = ('user',)

class RetraitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Retrait
        fields = '__all__'
        # read_only_fields = ('user',)

class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = '__all__'


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only':True}}
        # read_only_fields = ('id',)

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    # read_only_fields = ('id',)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Identifiants incorrects")

class WalletRequestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = WalletRequested 
        fields = '__all__'

    