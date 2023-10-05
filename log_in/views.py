from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.http import JsonResponse
from sign_in import models
from sign_in.models import CustomUser
from django.urls import reverse
def log(request):
    url = reverse('video_list')
    return redirect(url)


def login_view(request):
    if  request.method == 'POST':
        return _extracted_from_login_view_3(request)
    messages.error(request, "try again")
    return render(request, 'home.html')


# TODO Rename this here and in `login_view`
def _extracted_from_login_view_3(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    print(username)
    print(password)
    print(type(password))
    user = authenticate(username=username, password=password)
    userid=CustomUser.objects.filter(username=username)
    userpass=CustomUser.objects.filter(password=password)
    print('user=',user)
    print(userid)

    print(userpass)
    if user is not None:
        print('verified')
        login(request, user)
        response_data = {'redirect_url': '/logi/log1/'}  # Change to the appropriate URL
        return JsonResponse(response_data)  # Change 'success_page' to the appropriate URL name
    elif not userid.exists() :
        print('username')
        messages.error(request,"plz inter valid username")
    elif not userpass.exists() and userid.exists():
        print('password')
        messages.error(request,"plz inter valid password")
    else:
        print('Invalid username or password')
        messages.error(request, "Invalid username and password")
        #return JsonResponse({'error':'"Invalid username or password"'})

    error_messages = [str(message) for message in messages.get_messages(request)]

    # Return JSON response with error messages
    return JsonResponse({'errors': error_messages})
