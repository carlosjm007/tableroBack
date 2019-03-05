from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
# Create your models here.

class usuario(AbstractUser):
	foto = models.ImageField(upload_to="foto_usuario/", null=True, blank=True)
	identificacion = models.CharField(
		max_length=20,
		unique=True,
		error_messages={
			'unique': _("A user with that identification already exists."),
		},)
	
	def save(self, *args, **kwargs):
		self.username = self.email
		super(usuario, self).save(*args, **kwargs)

	class Meta:
		verbose_name = "Usuario"
		verbose_name_plural = "Usuarios"

	def __unicode__(self):
		return self.identificacion