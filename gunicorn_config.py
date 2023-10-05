workers = 4  # You can adjust the number of workers as needed
bind = '0.0.0.0:8000'  # Replace with your desired IP address and port
errorlog = '/var/log/gunicorn/error.log'
timeout = 120
