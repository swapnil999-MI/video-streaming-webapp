from sign_in import models
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from .models import CustomUser
from django.contrib import messages

def  signin (request):
    if request.method == 'POST':
        data = request.POST
        fname = data.get('fname')
        mname = data.get('mname')
        lname = data.get('lname')
        phone = data.get('phone')
        email = data.get('mail')
        username = data.get('username')
        password = data.get('password')
        address = data.get('address')
        sex = data.get('sex')


        user=CustomUser.objects.filter(username=username)
        if user.exists():
            messages.error(request, "Username already exist plz try with another username.")
            return redirect('/signin/myview/')

        vaildmail=CustomUser.objects.filter(email=email)
        if vaildmail.exists():
            messages.error(request, "Email already exist plz try with another Email id.")
            return redirect('/signin/myview/')


        # Create a new custom user
        user = CustomUser.objects.create_user(
            username=username,
            password=password,
            first_name=fname,
            middle_name=mname,
            last_name=lname,
            email=email,
            phone=phone,
            address=address,
            sex=sex,
        )

        # Handle other fields and user sign-in record creation
        messages.success(request, "Account created sucessfuly.")

        return render(request,'signinhtml.html')  # Redirect to login page after successful sign-up
    else:
        return render(request, 'signinhtml.html')  # Render the signup form