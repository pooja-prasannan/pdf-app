from django.conf.urls import url
from django.contrib.auth import views as auth_views
from .views import (CovertView, DemoView, Base64ImageView, MergeImageView, EditorView)
from django.views.decorators.csrf import csrf_exempt

app_name = 'process'

urlpatterns = [

    url(r'^convert/$', csrf_exempt(CovertView.as_view()), name='convert'),

    url(r'^demo/$', DemoView.as_view(), name='convert'),

    url(r'^images/$', csrf_exempt(Base64ImageView.as_view()), name='base64image'),

    url(r'^merge-images/$', csrf_exempt(MergeImageView.as_view()), name='merge-image'),

    url(r'^editor/(?P<pk>.*)$', csrf_exempt(EditorView.as_view()), name='editor')


]
