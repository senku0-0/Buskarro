from django.contrib import admin
from .models import *
# Register your models here.

class regShow(admin.ModelAdmin):
    list_display = ('id','Username','Email','Password','auth')

admin.site.register(Registration, regShow)

class Sched(admin.ModelAdmin):
    list_display = ('id','Bus_No','Date','F','T','Driver_name','Price','Time','Seats','No_of_seats_booked')

admin.site.register(Scheduled_buses, Sched)

class Bus_data(admin.ModelAdmin):
    list_display = [
        'id', 'Bus_No', 'Date', 'U1', 'U2', 'U3', 'U4', 'U5', 'U6', 'U7', 'U8', 'U9', 'U10', 'U11', 'U12', 'U13', 'U14', 'U15', 'U16', 'U17', 'U18',
        'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9', 'L10', 'L11', 'L12', 'L13', 'L14', 'L15', 'L16', 'L17', 'L18'
    ]
admin.site.register(Bus, Bus_data)

class Contact_data(admin.ModelAdmin):
    list_display = ['id','Date', 'Email', 'Message','is_solved']

admin.site.register(Contact, Contact_data)

