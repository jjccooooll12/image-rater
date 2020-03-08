from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User
from .models import Image, Rating
from .serializers import UserSerializer, ImageSerializer, RatingSerializer
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.

class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    @action(detail=True, methods=['POST'])
    def rate_image(self,request,pk=None):
        if 'stars' in request.data:
            stars = request.data['stars']
            user = request.user
            image = Image.objects.get(id=pk)

            try:
                #image & user are foreign keys in the model, so that we need to specify
                #into the Rating object which are these parameters
                rating = Rating.objects.get(user=user.id, image=image.id)
                rating.stars = stars
                rating.save()
                serializer = RatingSerializer(rating, many=False)
                response = {'message':'Rating updated', 'result':serializer.data}
                return Response(response, status=status.HTTP_200_OK)
            except:
                rating= Rating.objects.create(user=user, image=image, stars=stars)
                serializer = RatingSerializer(rating, many=False)
                response = {'message':'Rating created', 'result':serializer.data}
                return Response(response, status=status.HTTP_200_OK)
        else:
            return Response({'message':'something went wrong'}, status=status.HTTP_400_BAD_REQUEST)
 


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    #Since we already created our own method rate_movie to update/create we make the
    #built-in Viewset one uneffective by overriding it
    def update(self,request,*args, **kwargs):
        response = {'message': 'You cannot update rating like that'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
    
    def create(self,request,*args, **kwargs):
        response = {'message': 'You cannot create rating like that'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)



class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication, ) 
    permission_classes = (AllowAny, )








 

    