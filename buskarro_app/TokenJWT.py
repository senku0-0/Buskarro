import jwt
import datetime
from django.http import HttpResponse
from django.shortcuts import redirect,render

secret_key = """------Buskarro_Bhai_nahi_hora_mere_se------"""
def create_JWT(Username,Email,auth,secret_key):
    Header={
        "alg":"HS256",
        "typ":"JWT"
    }
    access_Payload={ 
        'Username':Username,
        'Email':Email,
        'auth':auth,
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=5)
    }
    access_token = jwt.encode(access_Payload, secret_key, algorithm='HS256', headers=Header)
    # print(token)
    return access_token

def refresh_Token(token, secret_key):    
    if token:
        threshold = 120  # seconds, 2 minutes
        tok = jwt.decode(token, secret_key, algorithms=['HS256'])
        expiring = tok['exp']  # this is already in the timestamp format
        current_time = datetime.datetime.now(datetime.timezone.utc).timestamp()  # converted into timestamp
        cal_diff = expiring - current_time
        if cal_diff <= threshold:
            tok['exp'] = (datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(weeks=4)).timestamp()
            refresh_token = jwt.encode(tok, secret_key, algorithm='HS256')
            return True,refresh_token
    return False ,None

def decode(token,secret_key):
    tok = jwt.decode(token,secret_key,algorithms=['HS256'])
    return tok

def verify(request,m1,msg,secret_key):
    token = request.COOKIES.get('Authorization')
    if token:
        tok = jwt.decode(token,secret_key,algorithms=['HS256'])
        if tok['auth'] == 'Admin':
            return redirect('Admin-Dashboard')
        elif tok['auth'] == 'User':
            return redirect('Home')
    else:
        return render(request,'signin.html')