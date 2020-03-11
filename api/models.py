from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from imagekit.models import ProcessedImageField
from imagekit.processors import SmartResize, ResizeToFill
from django.contrib.auth.models import User

# Create your models here.

class Image(models.Model):
    image = ProcessedImageField(default='images/DJI_0335.JPG',
            upload_to='images/', processors=[ResizeToFill(400,300)], format='JPEG', 
            options={'quality':72})
    #image = models.ImageField(upload_to = 'images/', default = 'images/DJI_0335.JPG')
    location = models.CharField(max_length=30)
    description = models.TextField(max_length=360)
    #creation_date = models.DateTimeField( auto_now_add=True)
    #user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

    
    def __str__(self): 
        return '{}'.format(self.location) 
    
    """
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        img_read = storage.open(self.image.name, 'r')
        img = Image.open(img_read)

        if img.height > 0 or img.width > 0:
            output_size = (4000, 3000)
            img.thumbnail(output_size)
            in_mem_file = io.BytesIO()
            img.save(in_mem_file, format='JPEG')
            img_write = storage.open(self.image.name, 'w+')
            img_write.write(in_mem_file.getvalue())
            img_write.close()

        img_read.close()"""

    def total_ratings(self):
        ratings= Rating.objects.filter(image=self)
        return len(ratings)        

    def avg_ratings(self):
        sum = 0
        ratings = Rating.objects.filter(image=self)
        for rating in ratings:
            sum += rating.stars
        if len(ratings) > 0:
            return sum/len(ratings)
        else:
            return 0
    

 

class Rating(models.Model):
    stars = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    #needs to have the same name as the primary key
    image = models.ForeignKey(Image, on_delete=models.CASCADE, default='images/DJI_0335.JPG')

    def __str__(self): 
        return '{}'.format(self.image) 

    # to allow users to post only one review and no more on a single image
    class Meta:
        unique_together = (('user', 'image'),)
        index_together = (('user', 'image'),)


    

