from django.http import FileResponse
from django.shortcuts import get_object_or_404
from .models import Video
import subprocess
import os
from django.http import JsonResponse,HttpResponseNotFound
from django.shortcuts import render, redirect
from .forms import VideoUploadForm

def upload_video(request):
    if request.method == 'POST':
        form = VideoUploadForm(request.POST, request.FILES)
        print('hey')
        if form.is_valid():
            print('form valid')
            form.save()
            return redirect('video_list')  # Redirect to a page that lists uploaded videos
    else:
        form = VideoUploadForm()
        print('formnotvalid')

    return render(request, 'streamhtml.html', {'form': form})





def delete_video(request):
     if request.method == 'POST':
        title_to_delete = request.POST['title']

        try:
            videos_to_delete = Video.objects.filter(title=title_to_delete)

        # Delete the associated video files and video objects
            for video in videos_to_delete:
               video.video_file.delete()
               video.delete()
            return redirect('video_list')  # Redirect to a view that lists all videos
        except Video.DoesNotExist:
            error_message = "Video not found."
     else:
        error_message = "get request insted of post"

     return render(request, 'delete_video.html', {'error_message': error_message})




    

def show(request):
    return render(request,'videoshow.html')

from django.http import FileResponse, HttpResponseNotFound
from django.shortcuts import get_object_or_404
from .models import Video
import os

def stream_compressed_video(request, video_title):
    video = get_object_or_404(Video, title=video_title)
    video_file_name = video.video_file.name if video else None
    video_path = video.video_file.path if video else None

    if video_file_name:
        
        if os.path.exists(video_path):
            # Construct the path to the compressed video file
            compressed_name = os.path.splitext(video_file_name)[0] + '.compressed.mp4'
            compressed_path = os.path.join(video_path)
            # Serve the compressed video
            response = FileResponse(open(compressed_path, 'rb'))
            return response
    return HttpResponseNotFound("Video not found")

def video_list(request):
    videos = Video.objects.all()
    for video in videos:
        print(video)
        # Assuming your video field is named 'video_file'
       # video.video_file.url = video.video_file.url.replace('public/static/', 'media/')
    print(videos)
    return render(request, 'playhome.html', {'videos': videos})



def upload_video1(request):
    return render(request,'uploadhtml.html')



def delete_video1(request):
    return render(request,'deletevedio.html')