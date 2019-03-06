from django.contrib import admin
from .models import *

# Register your models here.
@admin.register(tablero)
class UsuarioAdmin(admin.ModelAdmin):
	pass

@admin.register(idea)
class UsuarioAdmin(admin.ModelAdmin):
	pass