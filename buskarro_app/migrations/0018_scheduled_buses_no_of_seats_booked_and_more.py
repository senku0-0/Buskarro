# Generated by Django 5.1.4 on 2025-01-28 07:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('buskarro_app', '0017_contact_alter_bus_bus_no'),
    ]

    operations = [
        migrations.AddField(
            model_name='scheduled_buses',
            name='No_of_seats_booked',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='scheduled_buses',
            name='Seats',
            field=models.IntegerField(default=36),
        ),
    ]
