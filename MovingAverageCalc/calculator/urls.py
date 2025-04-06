from django.urls import path
from . import views

urlpatterns = [
    path('sma/<str:data_id>/<int:sma_period>', views.moving_average),
    path ('objectKeys', views.keys)
]