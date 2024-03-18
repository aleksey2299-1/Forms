from django.db import models


class Form(models.Model):
    title = models.CharField()
    description = models.TextField()
    from_form = models.ForeignKey("self", related_name="filled_forms", blank=True, null=True, on_delete=models.CASCADE)


class Question(models.Model):
    class Types(models.TextChoices):
        Short = "Short answer"
        Long = "Paragraph"
        Date = "Date"
        Time = "Time"
        Checkboxes = "Checkboxes"
        Multiple = "Multiple choice"
        Dropdown = "Drop-down"

    form = models.ForeignKey(Form, related_name="questions", on_delete=models.CASCADE)
    name = models.CharField()
    type = models.CharField(choices=Types.choices)
    answer = models.TextField(blank=True, null=True)
    required = models.BooleanField(default=False)
    depends = models.ForeignKey("Dependence", related_name="dependence_for_question", on_delete=models.SET_NULL, blank=True, null=True)


class Option(models.Model):
    question = models.ForeignKey(Question, related_name="options", on_delete=models.CASCADE)
    option = models.CharField()
    checked = models.BooleanField(default=False)


class Dependence(models.Model):
    option = models.ForeignKey(Option, related_name="depends_on_option", on_delete=models.CASCADE)
