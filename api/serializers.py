from .models import Image, Rating
from rest_framework import serializers 
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from rest_framework.response import Response


class ImageSerializer(serializers.ModelSerializer):

# in order to serialize wt the class Image the fields belonging to the User foreign key
   #username = serializers.CharField(
    #    source='user.username',
     #   read_only=True)"""

    class Meta:
        model = Image
        fields = ('id', 'image', 'location', 'description', 'total_ratings', 'avg_ratings')



class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'


        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')
        extra_kwargs = {'password':{'write_only':True,'required':True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user



     
