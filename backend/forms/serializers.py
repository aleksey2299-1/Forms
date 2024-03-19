from django.db import transaction
from rest_framework import serializers

from forms.models import (
    Dependence,
    FilledForm,
    FilledOption,
    FilledQuestion,
    Form,
    Option,
    Question,
)
from forms_project.constants import TYPES_WITH_OPTIONS


def deactivate_forms(data):
    if data:
        prev_active_forms = Form.objects.filter(active=True)
        prev_active_forms.update(active=False)


class DependenceSerializer(serializers.ModelSerializer):
    """Сериализатор зависимости."""

    question = serializers.IntegerField()
    option = serializers.CharField()

    class Meta:
        model = Dependence
        fields = ("id", "question", "option")


class OptionSerializer(serializers.ModelSerializer):
    """Сериализатор опции."""

    class Meta:
        model = Option
        fields = ("id", "option")


class FilledOptionSerializer(serializers.ModelSerializer):
    """Сериализатор опции в заполненной форме."""

    class Meta:
        model = FilledOption
        fields = ("id", "option", "checked")


class FilledQuestionSerializer(serializers.ModelSerializer):
    """Сериализатор вопроса для заполненной формы."""

    options = FilledOptionSerializer(many=True, required=False)

    class Meta:
        model = FilledQuestion
        fields = ("id", "name", "type", "answer", "required", "options")


class QuestionSerializer(serializers.ModelSerializer):
    """Сериализатор вопроса."""

    depends = DependenceSerializer(required=False)
    options = OptionSerializer(many=True, required=False)

    class Meta:
        model = Question
        fields = ("id", "name", "type", "required", "depends", "options")


class FormSerializer(serializers.ModelSerializer):
    """Сериализатор формы."""

    questions = QuestionSerializer(many=True)

    class Meta:
        model = Form
        fields = ("id", "title", "description", "questions", "active")

    def create(self, validated_data: dict) -> Form:
        questions_data = validated_data.pop("questions")
        with transaction.atomic():
            deactivate_forms(validated_data["active"])
            form = Form.objects.create(**validated_data)
            questions = []
            for question_data in questions_data:
                options_data = question_data.pop("options", None)
                depends_data = question_data.pop("depends", None)
                question = Question.objects.create(**question_data, form=form)
                if depends_data:
                    question_index = depends_data["question"]
                    dep = Dependence.objects.create(
                        option=Option.objects.get(
                            option=depends_data["option"],
                            question=questions[question_index],
                        ),
                    )
                    question.depends = dep
                    question.save()
                if options_data and question.type in (
                    "Multiple choice",
                    "Checkboxes",
                    "Drop-down",
                ):
                    for option_data in options_data:
                        Option.objects.create(**option_data, question=question)
                questions.append(question)
        return form

    def update(self, instance: Form, validated_data: dict) -> Form:
        questions_data = validated_data.pop("questions")

        with transaction.atomic():
            Question.objects.filter(form=instance).delete()
            questions = []
            for question_data in questions_data:
                options_data = question_data.pop("options", None)
                depends_data = question_data.pop("depends", None)
                question = Question.objects.create(**question_data, form=instance)
                if depends_data:
                    question_index = depends_data["question"]
                    dep = Dependence.objects.create(
                        option=Option.objects.get(
                            option=depends_data["option"],
                            question=questions[question_index],
                        ),
                    )
                    question.depends = dep
                    question.save()
                if options_data and question.type in TYPES_WITH_OPTIONS:
                    for option_data in options_data:
                        Option.objects.create(**option_data, question=question)
                questions.append(question)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class FilledFormSerializer(serializers.ModelSerializer):
    """Сериализатор заполеннной формы."""

    questions = FilledQuestionSerializer(many=True)

    class Meta:
        model = FilledForm
        fields = ("id", "parent", "title", "description", "questions")

    def create(self, validated_data):
        questions_data = validated_data.pop("questions")
        with transaction.atomic():
            form = FilledForm.objects.create(**validated_data)
            for question_data in questions_data:
                options_data = question_data.pop("options", None)
                question = FilledQuestion.objects.create(**question_data, form=form)
                if options_data and question.type in TYPES_WITH_OPTIONS:
                    for option_data in options_data:
                        FilledOption.objects.create(**option_data, question=question)
        return form
