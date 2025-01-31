from django.urls import path
from .views import *

theory = Theory()
logging_out = Logout()
dele = Admin_ScheduledBuses()
urlpatterns = [
    path('Home/',Index.as_view(),name='Home'),
    path('Registration/',User_Reg.as_view(),name='Registration'),
    path('',Log.as_view(),name='Login'),
    path('Contact-us/',Contact_Us.as_view(),name='Contact-Us'),
    path('About-us/',theory.about,name='About-us'),
    path('Term-n-conditions/',theory.TNC,name='Term-n-conditions'),
    path('Policies/',theory.Policies,name='Policies'),
    path('Blog/',theory.Blog,name='Blog'),
    path('User-Agreement/',theory.User_Agreement,name='User-Agreement'),
    path('Admin-Dashboard/',Admin_TodayScheduled.as_view(),name='Admin-Dashboard'),
    path('Admin-Scheduled-Bus/',Admin_ScheduledBuses.as_view(),name='Admin-Scheduled-Bus'),
    path('Admin-Schedule-Bus/',Admin_Schedule_Bus.as_view(),name='Admin-Schedule-Bus'),
    path('Logout/',logging_out.logout,name='Logout'),
    path('Delete/',dele.Delete_Bus,name='Delete'),
    path('Update/',dele.Edit_Bus,name='Update'),
    path('Booking/', User_panel.as_view(), name='Booking'),
    path('Continue-Booking/', User_Booking.as_view(), name='Continue-Booking'),
    path('Confirm-Booking/', User_CBooking.as_view(), name='Confirm-Booking'),
]