# Generated by Django 5.1.3 on 2025-01-25 07:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('buskarro_app', '0009_alter_scheduled_buses_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='scheduled_buses',
            name='Price',
            field=models.IntegerField(default=0),
        ),
    ]
