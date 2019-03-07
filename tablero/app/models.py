from django.db import models
from main.models import *

# Create your models here.

class tablero(models.Model):
	estados = (
			("PU","Público"),
			("PR","Privado")
		)
	usuario = models.ForeignKey(usuario, on_delete=models.CASCADE)
	estado =  models.CharField(
		max_length=2,
		choices=estados,
		default="PR",
	)
	nombre = models.CharField(max_length=100)
	actualizado = models.DateTimeField(auto_now=True)

	class Meta:
		verbose_name = "Tablero"
		verbose_name_plural = "Tableros"

	def __unicode__(self):
		return "%s - %s"%(self.id, self.usuario.username)

class idea(models.Model):
	usuario = models.ForeignKey(usuario, on_delete=models.CASCADE)
	tablero = models.ForeignKey(tablero, on_delete=models.CASCADE)
	contenido = models.CharField(max_length=200)
	aprobado = models.BooleanField(default=False)
	actualizado = models.DateTimeField(auto_now=True)
	creado = models.DateTimeField(auto_now_add=True)

	def save(self, *args, **kwargs):
		self.aprobado = False
		if (self.usuario == self.tablero.usuario):
			self.aprobado = True
		super(idea, self).save(*args, **kwargs)

	class Meta:
		verbose_name = "Idea"
		verbose_name_plural = "Ideas"

	def __unicode__(self):
		return "%s - %s"%(self.id, self.usuario.username)