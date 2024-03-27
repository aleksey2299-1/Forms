from django.core.exceptions import ValidationError
from django.db import models


class Form(models.Model):
    """Модель формы для заполнения."""

    title = models.CharField()
    description = models.TextField()
    active = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Форма для заполнения"
        verbose_name_plural = "Формы для заполнения"
        ordering = ("-id",)

    def clean(self) -> None:
        if self.active:
            prev_active_forms = Form.objects.filter(~models.Q(pk=self.pk), active=True)
            if prev_active_forms:
                raise ValidationError("Only one form can be active.")


class FilledForm(models.Model):
    """Модель заполненной формы."""

    parent = models.ForeignKey(
        Form, related_name="filled_forms", on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = "Заполненная форма"
        verbose_name_plural = "Заполенные формы"
        ordering = ("-id",)


class Question(models.Model):
    """Модель вопроса для ответа."""

    class Types(models.TextChoices):
        """Виды вопроса."""

        Short = "Short answer"
        Long = "Paragraph"
        Date = "Date"
        Time = "Time"
        Checkboxes = "Checkboxes"
        Multiple = "Multiple choice"
        Dropdown = "Drop-down"

    form = models.ForeignKey(Form, related_name="questions", on_delete=models.CASCADE)
    depends = models.ForeignKey(
        "Dependence",
        related_name="dependence_for_question",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    name = models.CharField()
    type = models.CharField(choices=Types.choices)
    required = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Вопрос"
        verbose_name_plural = "Вопросы"
        ordering = ("id",)


class Option(models.Model):
    """Модель опции для выбора."""

    question = models.ForeignKey(
        Question, related_name="options", on_delete=models.CASCADE
    )
    option = models.CharField()

    class Meta:
        verbose_name = "Опция"
        verbose_name_plural = "Опции"
        ordering = ("id",)


class Answer(models.Model):
    """Модель ответа на вопрос."""

    question = models.ForeignKey(
        Question, related_name="answers", on_delete=models.CASCADE
    )
    form = models.ForeignKey(
        FilledForm, related_name="answers", on_delete=models.CASCADE
    )
    answer = models.TextField()

    class Meta:
        verbose_name = "Ответ"
        verbose_name_plural = "Ответы"
        ordering = ("-id",)


class Dependence(models.Model):
    """Модель зависимости для вопроса."""

    option = models.ForeignKey(
        Option, related_name="depends_on_option", on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = "Зависимость"
        verbose_name_plural = "Зависимости"
        ordering = ("id",)
