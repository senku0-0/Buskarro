from django.shortcuts import render,redirect
from django.http import HttpResponse,JsonResponse
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt 
from django.utils.decorators import method_decorator
# from rest_framework.decorators import api_view
from .models import *
from .TokenJWT import *
from datetime import datetime
from django.utils import timezone
import bcrypt
from urllib.parse import urlencode 
import json
from io import BytesIO
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.mail import EmailMultiAlternatives
from xhtml2pdf import pisa
from Buskarro import settings
from django.core.serializers.json import DjangoJSONEncoder
# Create your views here.

# registration api

class Validate:
    def check_password(login_password, hashed_password):
        login_password_bytes = login_password.encode('utf-8')
        if isinstance(hashed_password, str):
            hashed_password_bytes = hashed_password.encode('utf-8')
        else:
            hashed_password_bytes = hashed_password
        is_correct = bcrypt.checkpw(login_password_bytes, hashed_password_bytes)
        return is_correct

    def hash_passcode(self,Password):
        value = Password.encode('utf-8')
        hash_password = bcrypt.hashpw(value, bcrypt.gensalt(rounds=12))
        print(hash_password)
        return(hash_password)
    
    def Reg_Validating(self, Username, Email, Password, CPassword ,auth):
        special_char = """!@#$%^&*()[{]},<>:;"'|/-"""
        if Password == CPassword:
            print(len(Password))
            if len(Password) < 8:
                return True, "Minimum 8 characters"
            elif Registration.objects.filter(Username=Username).exists():
                return True , "Username already exists"
            elif any(a in special_char for a in Username):
                return True , 'Username cannot contain special character besides "." "_"'
            elif Registration.objects.filter(Email=Email).exists():
                return True , 'Email already registered here'
            else:
                code = self.hash_passcode(Password)
                reg_data = Registration.objects.create(Username=Username, Email=Email, Password=code,auth =auth)
                reg_data.save()
                return False, "Registration Sucessfull"
        else:
            return True, 'Password didn\'t match'

    @staticmethod   
    def Log_validate(Username, login_Password):
        user = Registration.objects.filter(Username = Username).first()
        if user:
            if Validate.check_password(login_Password,user.Password):
                if user.auth == 'User':
                    return False,'Welcome User'
                elif user.auth == 'Admin':
                    return False,'Welcome Admin'
            else:
                return True, "Password is Invalid"
        else:
            return True,"Username is Invalid"

class User_Reg(APIView):

    def get(self, request):
        return render(request, 'registration.html')
    
    def post(self, request):
        Username = request.POST.get('name')
        Email = request.POST.get('email')
        Password = request.POST.get('pass')
        CPassword = request.POST.get('Cpass')
        auth = 'User'
        reg = Validate()
        valid,msg = reg.Reg_Validating(Username, Email, Password, CPassword,auth)
        if valid: 
            return render(request,'registration.html',{'msg':msg,'m':True})
        if msg == "Registration Sucessfull": 
            success = urlencode({
                'msg': 'Registration Sucessfull', 
                'm1': True,
            })
            return redirect(f'/?{success}')

# lgoin api
class Log(APIView):
    def get(self,request):
        m1 = request.GET.get('m1')
        msg = request.GET.get('msg')
        if m1 and msg:
            return render(request,'signin.html',{'m1':m1,'msg':msg})
        return verify(request,m1,msg,secret_key)

    def post(self,request):
        Username = request.POST.get('Username')
        login_Password = request.POST.get('Password')
        user = Registration.objects.filter(Username = Username).first()
        valid,msg = Validate.Log_validate(Username,login_Password)
        if valid:
            return render(request,'signin.html',{'msg':msg,'m':True})
        res = HttpResponse() 
        token = create_JWT(Username, user.Email, user.auth,secret_key) 
        if msg == 'Welcome Admin':
            res = redirect('Admin-Dashboard') 
            res.set_cookie('Authorization', token, max_age=300, httponly=True,secure=True) 
            return res
        elif msg == 'Welcome User':
            res = redirect('Home') 
            res.set_cookie('Authorization', token, max_age=300, httponly=True,secure=True) 
            return res
                   
class Theory:
    def TNC(self,request):
        return render(request,'tnc.html')  
    def Policies(self,request):
        return render(request,'policies.html') 
    def Blog(self,request):
        return render(request,'blog.html') 
    def User_Agreement(self,request):
        return render(request,'user_agreement.html')  
    def about(self,request):
        token = request.COOKIES.get('Authorization')
        if token:
            valid,refreshed = refresh_Token(token,secret_key)
            res = render(request,'about.html') 
            if valid:
                res.set_cookie("Authorization", refreshed , max_age=4*7*24*60*60, httponly=True, secure=True)  # weeks * days * hours * minutes * seconds 
                return res
            else:
                return res
        else:
            return redirect('Login')
        
class Logout:
    def logout(self,request):
        res = redirect('Login')
        res.delete_cookie('Authorization')
        return res

# Show today scheduled buses (GET)
class Admin_TodayScheduled(APIView):
    def Scheduled(self,request,token):
        self.delete_expiredBus()
        CD = datetime.now().strftime("%Y-%m-%d")
        tok = decode(token,secret_key)
        user_info = {
            'Username':tok.get('Username'),
            'Email':tok.get('Email'),
        }
        info = {
            'today_scheduled': Scheduled_buses.objects.all().filter(Date = CD),
            **user_info
        }
        return render(request,'admin_panel.html',info)
    
    def get(self,request):
        token = request.COOKIES.get('Authorization')
        if token:
            valid,refreshed = refresh_Token(token,secret_key)
            res = self.Scheduled(request,token)
            if valid:
                res.set_cookie("Authorization", refreshed , max_age=4*7*24*60*60, httponly=True, secure=True)  # weeks * days * hours * minutes * seconds 
                return res
            else:
                return res
        else:
            return redirect('Login')

    def delete_expiredBus(self):
        current_date = timezone.now().date()
        Scheduled_buses.objects.filter(Date__lt=current_date).delete()
        Bus.objects.filter(Date__lt=current_date).delete()

# show all schedules buses (GET)
class Admin_ScheduledBuses(APIView):
    def delete_expiredBus(self):
        current_date = timezone.now().date()
        Scheduled_buses.objects.filter(Date__lt=current_date).delete()

    def Edit_Bus(self, request):
        if request.method == "POST":
            Bus_No = request.POST.get('hBus_no')#Database value 
            Date_str = request.POST.get('hdate')#Database value 
            if Bus_No and Date_str:
                Date_obj = datetime.strptime(Date_str, "%b. %d, %Y")
                Date = Date_obj.strftime("%Y-%m-%d")
                if Date:
                    find_Bus = Scheduled_buses.objects.filter(Bus_No=Bus_No, Date=Date).first()
                    if find_Bus:
                        find_Bus.Bus_No = request.POST.get('ebus_no')
                        find_Bus.F = request.POST.get('efrom')
                        find_Bus.T = request.POST.get('eto')
                        find_Bus.Driver_name = request.POST.get('eDriver_name')
                        eDate_str = request.POST.get('eDate')
                        if eDate_str:
                            eDate_obj = datetime.strptime(eDate_str, "%b. %d, %Y")
                            find_Bus.Date = eDate_obj.strftime("%Y-%m-%d")
                        find_Bus.save()
            return redirect('Admin-Scheduled-Bus')
        return redirect('Admin-Scheduled-Bus')

    def Delete_Bus(self, request):
        if request.method == "POST":
            Bus_No = request.POST.get('Bus_No')
            Date_str = request.POST.get('Date')
            try:
                Date_obj = datetime.strptime(Date_str, "%b. %d, %Y")
                Date = Date_obj.strftime("%Y-%m-%d")
            except ValueError:
                Date = None

            if Bus_No and Date:
                find_bus = Scheduled_buses.objects.filter(Bus_No=Bus_No, Date=Date)
                find_bus.delete()
            return redirect('Admin-Scheduled-Bus')
        
    def Scheduled(self,request,token):
        self.delete_expiredBus()
        CD = datetime.now().strftime("%Y-%m-%d")
        tok = decode(token,secret_key)
        user_info = {
            'Username':tok.get('Username'),
            'Email':tok.get('Email'),
        }
        info = {
            'all_scheduled': Scheduled_buses.objects.all(),
            **user_info
        }
        return render(request,'scheduled_bus.html',info)
    
    def get(self,request):
        token = request.COOKIES.get('Authorization')
        if token:
            valid,refreshed = refresh_Token(token,secret_key)
            res = self.Scheduled(request,token)
            if valid:
                res.set_cookie("Authorization", refreshed , max_age=4*7*24*60*60, httponly=True, secure=True)  # weeks * days * hours * minutes * seconds 
                return res
            else:
                return res
        else:
            return redirect('Login')
    
# Schedule new buses for the User by the admin (POST)
class Admin_Schedule_Bus(APIView):
    def validate_data(self,Bus_No,Date,F,T,Driver_name,Price,Time):
        if isinstance(Date, str):
            Date_obj = datetime.strptime(Date, "%Y-%m-%d").date() 
        else:
            Date_obj = Date
        if isinstance(Time, str): 
            Time_obj = datetime.strptime(Time, "%H:%M").strftime("%I:%M %p") 
        else: 
            Time_obj = Time.strftime("%I:%M %p")
        if F != T:
            if Scheduled_buses.objects.filter(Bus_No = Bus_No,Date = Date_obj).exists():
                return True,"This Bus is already Scheduled for this date"
            elif Scheduled_buses.objects.filter(Driver_name = Driver_name,Date = Date_obj).exists():
                return True,"This Driver is already Scheduled for this date"
            else:
                data = Scheduled_buses.objects.create(Bus_No=Bus_No,Date=Date_obj,F=F,T=T,Driver_name=Driver_name,Price = Price,Time=Time_obj)
                combo = Bus.objects.create(Bus_No=Bus_No,Date=Date_obj,F=F,T=T)
                return False,"Saved"
        else:
            return True,"From-To Both of the feilds have same value"
    
    def Schedule(self,request,token):
        tok = decode(token,secret_key)
        user_info = {
            'Username':tok.get('Username'),
            'Email':tok.get('Email'),
        }
        return render(request,'schedule_bus.html',user_info)

    def get(self,request):
        token = request.COOKIES.get('Authorization')
        if token:
            valid,refreshed = refresh_Token(token,secret_key)
            res = self.Schedule(request,token)
            if valid:
                res.set_cookie("Authorization", refreshed , max_age=4*7*24*60*60, httponly=True, secure=True)  # weeks * days * hours * minutes * seconds 
                return res
            else:
                return res
        else:
            return redirect('Login')
    
    def post(self, request):
        Bus_No = request.POST.get('Bus_NO')
        Date = request.POST.get('Date')
        F = request.POST.get('f')
        T = request.POST.get('t')
        Driver_name = request.POST.get('Driver_name')
        Price = request.POST.get('Cost')
        Time = request.POST.get('time')
        valid, msg = self.validate_data(Bus_No, Date, F, T, Driver_name, Price, Time)
        token = request.COOKIES.get('Authorization')
        tok = decode(token, secret_key)
        user_info = {
            'Username': tok.get('Username'),
            'Email': tok.get('Email'),
        }
        if valid:
            all_scheduled = Scheduled_buses.objects.all()
            context = {'msg': msg, 'm': True, 'all_scheduled': all_scheduled, **user_info}
            return render(request, 'schedule_bus.html', context)
        if msg =="Saved":
            all_scheduled = Scheduled_buses.objects.all()
            context = {'msg': msg, 'm1': True, 'all_scheduled': all_scheduled, **user_info}
            return render(request, 'schedule_bus.html', context)
   
# User panel CRUD
class Index(APIView):
    def Value(self,request,token):
        tok = decode(token,secret_key)
        m1 = request.GET.get('m1')
        msg = request.GET.get("msg")
        user_info = {
            'Username':tok.get('Username'),
            'Email':tok.get('Email'),
        }
        if m1 and msg:
            user_info.update({'m1':m1,'msg':msg})
            return render(request,'index.html',user_info)
        return render(request,'index.html',user_info)
    
    def get(self,request):
        token = request.COOKIES.get('Authorization')
        if token:
            valid,refreshed = refresh_Token(token,secret_key)
            res = self.Value(request,token)
            if valid:
                res.set_cookie("Authorization", refreshed , max_age=4*7*24*60*60, httponly=True, secure=True)  # weeks * days * hours * minutes * seconds 
                return res
            else:
                return res
        else:
            return redirect('Login')
    def post(self,request):
        From = request.POST.get('From')
        To = request.POST.get('To')
        when_date = request.POST.get('when_date') 
        data = urlencode({
            "F":From,
            "T":To,
            "Date":when_date,
        })
        return redirect(f'/Booking/?{data}')
 
class User_panel(APIView):
    def Value(self,request,token):
        tok = decode(token,secret_key)
        From = request.GET.get('F')
        To = request.GET.get('T')
        when_date = request.GET.get('Date')
        now = datetime.now().strftime("%I:%M %p")
        bus = Scheduled_buses.objects.filter(F=From, T=To, Date=when_date)
        booked_seats = Bus.objects.filter(F = From, T = To , Date = when_date)
        booked = {}
        seat_columns = ['U1', 'U2', 'U3', 'U4', 'U5', 'U6', 'U7', 'U8', 'U9', 'U10', 'U11', 'U12', 'U13', 'U14', 'U15', 'U16', 'U17' , 'U18',
                        'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9', 'L10', 'L11', 'L12', 'L13', 'L14', 'L15', 'L16', 'L17', 'L18']
        for i in booked_seats:
            bus_no = i.Bus_No
            booked[bus_no] = [field for field in seat_columns if getattr(i, field)]
        user_info = {
            'Username':tok.get('Username'),
            'Email':tok.get('Email'),
        }
        contian = {
            "F":From,
            "T":To,
            "Date":when_date,
            "result":bus.count(),
            'data': bus,
            'booked_seats':booked,
            **user_info,
            'booked':json.dumps(booked, cls=DjangoJSONEncoder),
        }
        
        return render(request,'user_panel.html',contian)
    
    def get(self,request):
        token = request.COOKIES.get('Authorization')
        if token:
            valid,refreshed = refresh_Token(token,secret_key)
            res = self.Value(request,token)
            if valid:
                res.set_cookie("Authorization", refreshed , max_age=4*7*24*60*60, httponly=True, secure=True)  # weeks * days * hours * minutes * seconds 
                return res
            else:
                return res
        else:
            return redirect('Login')
    
    def post(self,request):
        selected_seats = request.POST.get('selected_seats')
        Hidden_BusNO = request.POST.get('Hidden_BusNO')
        Hidden_BusDate = request.POST.get('Hidden_BusDate')
        print(selected_seats,Hidden_BusNO,Hidden_BusDate)
        if selected_seats:
            search_info = Scheduled_buses.objects.filter(Bus_No = Hidden_BusNO, Date = Hidden_BusDate).first()
            data = urlencode({
                    'selected_seats':selected_seats,
                    'Bus_No':search_info.Bus_No,
                    'Date':search_info.Date,
                    'F':search_info.F,
                    'T':search_info.T,
                    'Driver_name':search_info.Driver_name,
                    'Price':search_info.Price,
                    'Time':search_info.Time,
                    })
            return redirect(f'/Continue-Booking/?{data}')
        return self.get(request)
    
class User_Booking(APIView):
    def validate_data(self,seats,data_list,Adults_No,child_No,Bus_No,Date,From,To,Driver_name,Price,Time):
        length = len(data_list)
        sum = int(Adults_No)+int(child_No)
        Calculate_child = int(child_No)*(int(Price)/2)
        Calculate_Adult = int(Adults_No)*int(Price)
        total_Price = Calculate_Adult+Calculate_child
        if sum == length:
            info = urlencode({
            "selected_seats": seats,
            "Adults_No": Adults_No,
            "child_No": child_No,
            "Bus_No": Bus_No,
            "Date": Date,
            "From": From,
            "To": To,
            "Driver_name": Driver_name,
            "Time": Time,
            'total_Price':total_Price,
            'Cal_child':Calculate_child,
            'Cal_Adult':Calculate_Adult
        })
            return redirect(f'/Confirm-Booking/?{info}')
        else:
            seats = urlencode({'selected_seats':seats})
            return redirect(f'/Continue-Booking/?{seats}')
    def Value(self,request,token):
        tok = decode(token,secret_key)
        user_info = {
            'Username':tok.get('Username'),
            'Email':tok.get('Email'),
        }
        return render(request,'booking.html',user_info)
    
    def get(self,request):
        token = request.COOKIES.get('Authorization')
        if token:
            valid,refreshed = refresh_Token(token,secret_key)
            res = self.Value(request,token)
            if valid:
                res.set_cookie("Authorization", refreshed , max_age=4*7*24*60*60, httponly=True, secure=True)  # weeks * days * hours * minutes * seconds 
                return res
            else:
                return res
        else:
            return redirect('Login')   
    
    def post(self,request):
        seats = request.GET.get('selected_seats')
        data_list = json.loads(seats) #convert into python list, before it was list string
        Bus_No = request.GET.get('Bus_No')
        Date = request.GET.get('Date')
        From = request.GET.get('F')
        To = request.GET.get('T')
        Driver_name = request.GET.get('Driver_name')
        Price = request.GET.get('Price')
        Time = request.GET.get('Time')
        Adults_No = request.POST.get('Adults_No')
        child_No = request.POST.get('child_No')
        return self.validate_data(seats,data_list,Adults_No,child_No,Bus_No,Date,From,To,Driver_name,Price,Time) 
    
class User_CBooking(APIView):
    def Value(self, request, token):
        tok = decode(token, secret_key)
        user_info = {
            'Username': tok.get('Username'),
            'Email': tok.get('Email'),
        }
        seats = request.GET.get('selected_seats')
        data_list = json.loads(seats)
        length = len(data_list)
        Data = {
            "selected_seats": data_list,
            "Adults_No": request.GET.get('Adults_No'),
            "child_No": request.GET.get('child_No'),
            "Bus_No": request.GET.get('Bus_No'),
            "Date": request.GET.get('Date'),
            "From": request.GET.get('From'),
            "To": request.GET.get('To'),
            "Time": request.GET.get('Time'),
            "total_Price": request.GET.get('total_Price'),
            "Cal_child": request.GET.get('Cal_child'),
            "Cal_Adult": request.GET.get('Cal_Adult'),
            "length": length,
            **user_info
        }
        return render(request, 'book_payment.html', Data)

    def get(self, request):
        token = request.COOKIES.get('Authorization')
        if token:
            valid, refreshed = refresh_Token(token, secret_key)
            res = self.Value(request, token)
            if valid:
                res.set_cookie("Authorization", refreshed, max_age=4*7*24*60*60, httponly=True, secure=True)  # weeks * days * hours * minutes * seconds 
                return res
            else:
                return res
        else:
            return redirect('Login')

    def post(self, request):
        Name = request.POST.get('card_holder')
        exp_month = request.POST.get('exp_month')
        exp_year = request.POST.get('exp_year')
        card_number = request.POST.get('card_number')
        cvc = request.POST.get('cvc')  
        seats = request.GET.get('selected_seats')
        data_list = json.loads(seats)
        length = len(data_list)
        token = request.COOKIES.get('Authorization')
        data = {
            "Name": Name,
            "selected_seats": data_list,
            "Adults_No": request.GET.get('Adults_No'),
            "child_No": request.GET.get('child_No'),
            "Bus_No": request.GET.get('Bus_No'),
            "Date": request.GET.get('Date'),
            "From": request.GET.get('From'),
            "To": request.GET.get('To'),
            "Time": request.GET.get('Time'),
            "total_Price": request.GET.get('total_Price'),
            "Cal_child": request.GET.get('Cal_child'),
            "Cal_Adult": request.GET.get('Cal_Adult'),
            "length": length,
        }
        valid, msg = self.send_ticket_email(data, token)
        if valid:
            user_info = urlencode({
                'm1': True,
                'msg': msg,
            })
            Update_Seats = Scheduled_buses.objects.all().filter(Bus_No = data['Bus_No'],Date = data['Date']).first()
            Update_Seats.No_of_seats_booked += data['length']
            Update_Seats.save()
            Bus_seatUpadate= Bus.objects.all().filter(Bus_No = data['Bus_No'],Date = data['Date']).first()
            for i in data['selected_seats']:
                if hasattr(Bus_seatUpadate,i):
                    setattr(Bus_seatUpadate,i,True)
                    Bus_seatUpadate.save()
            return redirect(f"/Home/?{user_info}")
        return self.get(request)

    def render_to_pdf(self,template_src, context_dict={}):
        template = render_to_string(template_src, context_dict)
        result = BytesIO()
        pdf = pisa.pisaDocument(BytesIO(template.encode("UTF-8")), result)
        if pdf.err:
            return None
        return result.getvalue()
    
    def send_ticket_email(self, data, token):
        user_information = decode(token, secret_key)
        pdf = self.generate_ticket_pdf(data)  # ticket in pdf
        email_html = render_to_string('email.html', data)
        text_content = strip_tags(email_html)
        email = EmailMultiAlternatives(
            'Your Bus Trip Ticket',
            text_content,
            settings.EMAIL_HOST_USER,
            [user_information.get('Email')],
        )
        email.attach_alternative(email_html, "text/html")
        email.attach('ticket.pdf', pdf, 'application/pdf')
        email.send()
        return True, "Your ticket has been booked. YAY, START PACKING BAGES!!!"

    def generate_ticket_pdf(self, data):
        pdf = self.render_to_pdf('ticket.html', data)
        return pdf

class Contact_Us(APIView):
    def get(self,request):
        return render(request,'contact.html')
    def post(self,request):
        email = request.POST.get('email')
        message = request.POST.get('msg')
        Date = datetime.now().strftime("%Y-%m-%d")
        Contact.objects.create(Email=email,Message=message,Date=Date)
        return render(request,'contact.html',{'msg':'Thank you for contacting us','m1':True})

