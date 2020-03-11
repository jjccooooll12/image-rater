# image-rater
An image-rater web app developed using Django + ReactJs and Bootstrap.

The app allows to add a new image, insert a description and rate other users' images. 
You can also update and delete the pictures.

On the left side there are the images along with scroller thumbnails that you can click on. By doing so it will appear on the right 
the user description and the info about the picture (i.e. the average score that the image got from the ratings and the number of
users whom rated the image).


# Main challenges this web-app:

- Make the app full-responsive and mobile-first using Bootstrap 4.
- Upload and retrieve images in AWS S3, re-size them and display them responsively together with the text.
- Implement Jquery plugins.
- Create working RESTful APIs and connect Django backend with JS frontend.
