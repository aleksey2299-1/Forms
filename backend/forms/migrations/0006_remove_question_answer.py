# Generated by Django 4.2.11 on 2024-03-19 18:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("forms", "0005_remove_option_checked_filledquestion_filledoption"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="question",
            name="answer",
        ),
    ]
