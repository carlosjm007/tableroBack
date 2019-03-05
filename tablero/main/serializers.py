from rest_framework import serializers
from .models import usuario
from django.contrib.auth import authenticate
from rest_framework.validators import UniqueValidator

# User Serializer
class UserSerializer(serializers.ModelSerializer):
	foto = serializers.SerializerMethodField('TraeFoto')

	def TraeFoto(self, objeto):
		if (objeto.foto):
			return "%s" % (objeto.foto.url)
		else:
			return None

	class Meta:
		model = usuario
		fields = ('id', 'email', 'first_name', 'last_name', 'foto', 'identificacion')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
	email = serializers.EmailField(validators=[UniqueValidator(queryset=usuario.objects.all())])
	first_name = serializers.CharField()
	last_name = serializers.CharField()
	foto = serializers.ImageField(required=False, max_length=None, allow_empty_file=True, use_url=True)

	class Meta:
		model = usuario
		fields = ('id', 'email', 'password', 'first_name', 'last_name', 'foto', 'identificacion')
		extra_kwargs = {'password': {'write_only': True}}

	def create(self, validated_data):
		#user = usuario.objects.create_user(validated_data['email'], validated_data['email'], validated_data['password'])
		user = usuario.objects.create(
				username = validated_data['email'],
				email = validated_data['email'],
				password = validated_data['password'],
				last_name = validated_data['last_name'],
				first_name = validated_data['first_name'],
				identificacion = validated_data['identificacion'],
			)
		user.set_password(validated_data['password'])
		user.save()
		return user

# Login Serializer
class LoginSerializer(serializers.Serializer):
	username = serializers.EmailField()
	password = serializers.CharField()

	def validate(self, data):
		user = authenticate(**data)
		if user and user.is_active:
			return usuario.objects.get(id=user.id)
		raise serializers.ValidationError("Incorrect Credentials")