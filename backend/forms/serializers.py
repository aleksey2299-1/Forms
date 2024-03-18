from rest_framework import serializers
from django.db import transaction

from forms.models import Form, Question, Option, Dependence


class DependenceSerializer(serializers.ModelSerializer):
    question = serializers.IntegerField()
    option = serializers.CharField()

    class Meta:
        model = Dependence
        fields = ("id", "question", "option")


class DependenceListSerializer(serializers.ModelSerializer):
    question = serializers.IntegerField(source="option.question.id")

    class Meta:
        model = Dependence
        fields = ("id", "question", "option")


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ("id", "option", "checked")


class QuestionSerializer(serializers.ModelSerializer):
    depends = DependenceSerializer(required=False)
    options = OptionSerializer(many=True, required=False)

    class Meta:
        model = Question
        fields = ("id", "name", "type", "answer", "required", "depends", "options")


class QuestionListSerializer(serializers.ModelSerializer):
    depends = DependenceListSerializer(required=False)
    options = OptionSerializer(many=True, required=False)

    class Meta:
        model = Question
        fields = ("id", "name", "type", "answer", "required", "depends", "options")


class FormSerializer(serializers.ModelSerializer):
    questions = QuestionListSerializer(many=True)

    class Meta:
        model = Form
        fields = ("id", "title", "description", "questions")


class CreateFormSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)

    class Meta:
        model = Form
        fields = ("id", "title", "description", "questions")

    def create(self, validated_data: dict) -> Form:
        questions_data = validated_data.pop("questions")
        with transaction.atomic():
            form = Form.objects.create(**validated_data)
            questions = []
            for question_data in questions_data:
                options_data = question_data.pop("options", None)
                depends_data = question_data.pop("depends", None)
                question = Question.objects.create(**question_data, form=form)
                if depends_data:
                    question_index = depends_data["question"]
                    dep = Dependence.objects.create(
                        option=Option.objects.get(option=depends_data["option"], question=questions[question_index]),
                    )
                    question.depends = dep
                    question.save()
                if options_data and question.type in ("Multiple choice", "Checkboxes", "Drop-down"):
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
                        option=Option.objects.get(option=depends_data["option"], question=questions[question_index]),
                    )
                    question.depends = dep
                    question.save()
                if options_data and question.type in ("Multiple choice", "Checkboxes", "Drop-down"):
                    for option_data in options_data:
                        Option.objects.create(**option_data, question=question)
                questions.append(question)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

    def to_representation(self, instance):
        return FormSerializer(instance).data
