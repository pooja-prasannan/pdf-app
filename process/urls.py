from django.conf.urls import url
from django.contrib.auth import views as auth_views
from .views import (CovertView, DemoView)

app_name = 'process'

urlpatterns = [

    url(r'^convert/$', CovertView.as_view(), name='convert'),

    url(r'^demo/$', DemoView.as_view(), name='convert'),
]
