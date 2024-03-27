from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework import serializers

from forms.models import Answer, Dependence, FilledForm, Form, Option, Question
from forms_project.constants import TYPES_WITH_OPTIONS


def deactivate_forms(data):
    if data:
        prev_active_forms = Form.objects.filter(active=True)
        prev_active_forms.update(active=False)


class GetDependenceSerializer(serializers.ModelSerializer):
    """Сериализатор зависимости для response."""

    question = serializers.IntegerField(source="option.question.id")
    option = serializers.CharField(source="option.option")

    class Meta:
        model = Dependence
        fields = ("id", "question", "option")


class DependenceSerializer(serializers.ModelSerializer):
    """Сериализатор зависимости."""

    question = serializers.IntegerField(source="option.question.id")
    option = serializers.CharField()

    class Meta:
        model = Dependence
        fields = ("id", "question", "option")

    def run_validation(self, data=...):
        validated_data = super().run_validation(data)
        if data and isinstance(data.get("question"), int):
            validated_data["question"] = data["question"]
            return validated_data

    def to_representation(self, instance):
        return GetDependenceSerializer(instance).data


class OptionSerializer(serializers.ModelSerializer):
    """Сериализатор опции."""

    class Meta:
        model = Option
        fields = ("id", "option")


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
                if options_data and question.type in TYPES_WITH_OPTIONS:
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


class AnswerSerializer(serializers.ModelSerializer):
    """Сериализатор ответа на вопрос."""

    class Meta:
        model = Answer
        fields = ("answer",)


class QuestionForFilledFormSerializer(serializers.ModelSerializer):
    """Сериализатор вопроса при создании заполненной формы."""

    id = serializers.IntegerField()
    depends = DependenceSerializer(required=False, allow_null=True)
    options = OptionSerializer(many=True, required=False, allow_null=True)
    answers = serializers.ListField(required=False, allow_null=True)

    class Meta:
        model = Question
        fields = ("id", "name", "type", "required", "depends", "options", "answers")


class RepresentationQuestionSerializer(serializers.ModelSerializer):
    """Сериализатор вопроса для заполненной формы."""

    depends = DependenceSerializer(required=False)
    options = OptionSerializer(many=True, required=False)
    answers = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = ("id", "name", "type", "required", "depends", "options", "answers")

    def get_answers(self, instance):
        form_instance = self.context.get("form_instance")
        return [answer.answer for answer in instance.answers.filter(form=form_instance)]


class RepresentationFilledFormSerializer(serializers.ModelSerializer):
    """Сериализатор заполненной формы."""

    questions = RepresentationQuestionSerializer(many=True, source="parent.questions")
    title = serializers.CharField(source="parent.title")
    description = serializers.CharField(source="parent.description")

    class Meta:
        model = FilledForm
        fields = ("id", "parent", "title", "description", "questions")


class FilledFormSerializer(serializers.ModelSerializer):
    """Сериализатор для создания заполеннной формы."""

    questions = QuestionForFilledFormSerializer(many=True)

    class Meta:
        model = FilledForm
        fields = ("id", "parent", "questions")

    def create(self, validated_data):
        questions_data = validated_data.pop("questions")
        with transaction.atomic():
            form = FilledForm.objects.create(**validated_data)
            for question_data in questions_data:
                question = get_object_or_404(Question, id=question_data["id"])
                for answer in question_data.get("answers", []):
                    Answer.objects.create(question=question, answer=answer, form=form)
        return form

    def to_representation(self, instance):
        return RepresentationFilledFormSerializer(
            instance, context={"form_instance": instance}
        ).data
