from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class usuario(User):
	foto = models.ImageField(upload_to="foto_usuario/")
	identificacion = models.CharField(max_length=20,verbose_name='identificación', db_tablespace="identificacion")
	
	def save(self, *args, **kwargs):
		self.username = self.email
		self.set_password(self.password)
		super(usuario, self).save(*args, **kwargs)


	class Meta:
		verbose_name = "Usuario"
		verbose_name_plural = "Usuarios"

	def __unicode__(self):
		return self.identificacion