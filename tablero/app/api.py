from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import *
from .models import *
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework import status

# Register API
class TableroList(generics.ListCreateAPIView):
	queryset = tablero.objects.none()
	serializer_class = TableroSerializer
	permission_classes = [
		permissions.IsAuthenticated,
	]

	def list(self, request, *args, **kwargs):
		if self.request.GET.get("own")=="True":
			queryset = tablero.objects.filter(usuario = self.request.user)
		else:
			queryset = tablero.objects.filter(~Q(usuario = self.request.user))
		serializer = TableroSerializer(queryset, many=True)
		return Response(serializer.data)

class IdeaList(APIView):
	permission_classes = [
		permissions.IsAuthenticated,
	]
	def get(self, request, format=None):
		data = idea.objects.all()
		serializer = IdeaCRUDSerializer(data, many=True)
		return Response(serializer.data)

	def post(self, request, format=None):
		data = request.data
		#data["usuario"] = request.user.id
		serializer = IdeaCRUDSerializer(data=data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class IdeaDetail(APIView):
	permission_classes = [
		permissions.IsAuthenticated,
	]
	def get_object(self, pk):
		try:
			return idea.objects.get(pk=pk)
		except idea.DoesNotExist:
			return Response(status=status.HTTP_404_NOT_FOUND)

	def get(self, request, pk, format=None):
		data = self.get_object(pk)
		serializer = IdeaCRUDSerializer(data)
		return Response(serializer.data)

	def put(self, request, pk, format=None):
		data = self.get_object(pk)
		serializer = IdeaCRUDSerializer(data, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def delete(self, request, pk, format=None):
		snippet = self.get_object(pk)
		snippet.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)