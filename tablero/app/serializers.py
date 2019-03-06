from rest_framework import serializers
from .models import tablero, idea
from django.contrib.auth import authenticate
from rest_framework.validators import UniqueValidator
from django.templatetags.tz import localtime

class IdeaSerializer(serializers.ModelSerializer):
	usuario = serializers.SerializerMethodField('TraeUsuario')
	tablero = serializers.SerializerMethodField('TraeTablero')
	def TraeUsuario(self, objeto):
		return "%s %s" % (objeto.usuario.first_name, objeto.usuario.last_name)

	def TraeTablero(self, objeto):
		return objeto.tablero.id

	class Meta:
		model = idea
		fields = ('id', 'usuario', 'tablero', 'aprobado', 'contenido')

class TableroSerializer(serializers.ModelSerializer):
	usuario = serializers.SerializerMethodField('TraeUsuario')
	actualizado = serializers.SerializerMethodField('TraeActualizado')
	ideas = serializers.SerializerMethodField('TraeIdeas')
	def TraeUsuario(self, objeto):
		return "%s %s" % (objeto.usuario.first_name, objeto.usuario.last_name)
	def TraeActualizado(self, objeto):
		return "%s" % (localtime(objeto.actualizado).strftime("%d-%m-%y %I:%M %p"))
	def TraeIdeas(self, objeto):
		ideas = idea.objects.filter(tablero = objeto)
		serializer = IdeaSerializer(instance=ideas, many=True)
		return serializer.data
	class Meta:
		model = tablero
		fields = ('id', 'usuario', 'estado', 'nombre', 'ideas', 'actualizado')

class IdeaCRUDSerializer(serializers.ModelSerializer):

	class Meta:
		model = idea
		fields = ('id', 'usuario', 'tablero', 'aprobado', 'contenido')