# Generated by Django 4.2.11 on 2024-03-17 21:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('forms', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dependence',
            name='question',
        ),
    ]
