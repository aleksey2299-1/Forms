from django.db import models


class Form(models.Model):
    title = models.CharField()
    description = models.TextField()


class Question(models.Model):
    class Types(models.TextChoices):
        Short = "Short answer"
        Long = "Paragraph"
        Date = "Date"
        Time = "Time"
        Checkboxes = "Checkboxes"
        Multiple = "Multiple choice"
        Dropdown = "Drop-down"

    form = models.ForeignKey(Form, related_name="questions")
    name = models.CharField()
    type = models.CharField(choice=Types)
    answer = models.TextField(blank=True, null=True)


class Option(models.Model):
    question = models.ForeignKey(Question, related_name="options")
    option = models.CharField()
    checked = models.BooleanField()
