from django.core.exceptions import ValidationError
from django.db import models


class AbstractForm(models.Model):
    """Абстрактная модель формы."""

    title = models.CharField()
    description = models.TextField()

    class Meta:
        abstract = True


class AbstractQuestion(models.Model):
    """Абстрактная модель вопроса."""

    class Types(models.TextChoices):
        """Виды вопроса."""

        Short = "Short answer"
        Long = "Paragraph"
        Date = "Date"
        Time = "Time"
        Checkboxes = "Checkboxes"
        Multiple = "Multiple choice"
        Dropdown = "Drop-down"

    name = models.CharField()
    type = models.CharField(choices=Types.choices)
    required = models.BooleanField(default=False)

    class Meta:
        abstract = True
        verbose_name = "Вопрос"
        verbose_name_plural = "Вопросы"
        ordering = ("id",)


class AbstractOption(models.Model):
    """Абстрактная модель опции."""

    option = models.CharField()

    class Meta:
        abstract = True
        verbose_name = "Опция"
        verbose_name_plural = "Опции"
        ordering = ("id",)


class Form(AbstractForm):
    """Модель формы для заполнения."""

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


class FilledForm(AbstractForm):
    """Модель заполненной формы."""

    parent = models.ForeignKey(
        Form, related_name="filled_forms", on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = "Заполненная форма"
        verbose_name_plural = "Заполенные формы"
        ordering = ("-id",)


class Question(AbstractQuestion):
    """Модель вопроса для ответа."""

    form = models.ForeignKey(Form, related_name="questions", on_delete=models.CASCADE)
    depends = models.ForeignKey(
        "Dependence",
        related_name="dependence_for_question",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )

    class Meta(AbstractQuestion.Meta):
        abstract = False


class FilledQuestion(AbstractQuestion):
    """Модель вопроса с ответом."""

    form = models.ForeignKey(
        FilledForm, related_name="questions", on_delete=models.CASCADE
    )
    answer = models.TextField(blank=True, null=True)

    class Meta(AbstractQuestion.Meta):
        abstract = False


class Option(AbstractOption):
    """Модель опции для выбора."""

    question = models.ForeignKey(
        Question, related_name="options", on_delete=models.CASCADE
    )

    class Meta(AbstractOption.Meta):
        abstract = False


class FilledOption(AbstractOption):
    """Модель опции."""

    question = models.ForeignKey(
        FilledQuestion, related_name="options", on_delete=models.CASCADE
    )
    checked = models.BooleanField(default=False)

    class Meta(AbstractOption.Meta):
        abstract = False


class Dependence(models.Model):
    """Модель зависимости для вопроса."""

    option = models.ForeignKey(
        Option, related_name="depends_on_option", on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = "Зависимость"
        verbose_name_plural = "Зависимости"
        ordering = ("id",)
