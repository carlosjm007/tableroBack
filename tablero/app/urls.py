from django.urls import include, path
from .api import *
from knox import views as knox_views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
	path('list/', TableroList.as_view(), name='tablero-list'),
    path('idea/', IdeaList.as_view()),
    path('idea/<int:pk>/', IdeaDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)