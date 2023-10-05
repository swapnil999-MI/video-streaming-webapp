from django.contrib.auth.models import User
from django.shortcuts import render
from django.shortcuts import redirect, reverse
import random
from django.http import JsonResponse
from django.core.mail import send_mail
from django.contrib import messages
from sign_in.models import CustomUser
from django.http import HttpResponse
from django.conf import settings
from django.contrib.auth.hashers import make_password
def index(request):
    return render(request,'home.html')


def forgot(request):
    return render(request,'forgo.html')


def updatepass(request):
    if request.method == 'POST':
        password = request.POST.get('password')
        mail = request.POST.get('mail')
        print('password',password)
        print(type(password))
        print(mail)
        try:
            _extracted_from_updatepass_8(mail, password, request)
        except User.DoesNotExist:
            messages.error(request, 'user not present with this email')

    else:
        print('get')

        messages.error(request, 'bad request try again')
    error_messages = [str(message) for message in messages.get_messages(request)]
    return JsonResponse({'errors': error_messages})


# TODO Rename this here and in `updatepass`
def _extracted_from_updatepass_8(mail, password, request):
    user = CustomUser.objects.get(email=mail)
    print(user)
    hashed_password = make_password(password)
    user.set_password(password)
    user.save()
    messages.success(request, 'Password is updated successfuly!')

def getotp1(request):
    return render(request,'otp.html')
        
def getotp(request):
    if request.method != 'POST':
        return render(request, 'home.html')
    data = request.POST
    rmail = data.get('mail')
    print(rmail)
    valid_mail = CustomUser.objects.filter(email=rmail).exists()  # Use exists() to check if the email exists
    print(valid_mail)
    if valid_mail:
        rdin = random.randint(0000, 9999)
        otp_message = f"Your OTP is {rdin}"
        send_mail(
            "OTP for updating password.",
            otp_message,
            "swapniljagadale007@gmail.com",
            [rmail],
            fail_silently=False,
        )
        return JsonResponse({'otp': rdin})
    else:
        messages.error(request, "Email does not exist. Please try with a valid email.")
        return JsonResponse({'errors': "Email does not exist. Please try with a valid email."})
    
