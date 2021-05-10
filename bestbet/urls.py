from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from bet.views import index, view_404
from bet.api import RegisterAPI, LoginAPI, UserAPI
from knox import views as knox_views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/', include('bet.urls')),
    path('', index, name="index"),
    url(r'^.*/$', view_404)
] + static(settings.STATIC_URL,
                           document_root=settings.STATIC_ROOT) 
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header = "Administration de BestBet"
admin.site.site_title = "BestBet"
admin.site.index_title = "Bienvenue Admin"