from rest_framework import routers
from .api import *
from django.urls import path
from django.conf.urls import url
from django.views.decorators.csrf import csrf_exempt
from .views import *
router = routers.DefaultRouter() 
router.register('wallet-transaction', WalletTransactionViewSet, 'wallet_transaction' )

urlpatterns = [
    url(r'^profile/$', ProfileUpdateView.as_view()),
    url(r'^depot/$', WalletFormView.as_view()),
    url(r'^retrait/$', RetraitView.as_view()),
    url(r'^wallet/$', WalletView.as_view()),
    url(r'^games/$', GameView.as_view()),
    url(r'^game-details/$', GameDetailsView.as_view()),
    url(r'^bets/$', BetView.as_view()),
    url(r'^users/$', UserListView.as_view()),
    url(r'^friends/$', FriendListView.as_view()),
    url(r'^demandereculist/$', DemandeReceiveView.as_view()),
    url(r'^demandesentlist/$', DemandeSentView.as_view()),
    url(r'^friends-actions/$', RequestFriendView.as_view()),
    url(r'^add-bet/$', AddBetView.as_view()),
    url(r'^delete-bet/$', DeleteBetView.as_view()),
    url(r'^mybets/$', MyBetView.as_view()),
    url(r'^myoldbets/$', MyOldBetView.as_view()),
    url(r'^myactivebets/$', MyActiveBetView.as_view()),
    url(r'^accept-bet/$', AcceptBetView.as_view()),
    path('trasaction/success/', MoncashView.as_view()),
]

urlpatterns += router.urls

