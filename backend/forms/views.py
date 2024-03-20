from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema
from rest_framework import permissions, viewsets

from forms.models import FilledForm, Form
from forms.serializers import FilledFormSerializer, FormSerializer


@extend_schema(tags=["Form for fill"])
class FormViewSet(viewsets.ModelViewSet):
    queryset = Form.objects.all()
    serializer_class = FormSerializer
    permission_classes = (permissions.AllowAny,)
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ("active",)
    http_method_names = ("get", "post", "patch", "delete")


@extend_schema(tags=["Filled forms"])
class FilledFormViewSet(viewsets.ModelViewSet):
    queryset = FilledForm.objects.all()
    serializer_class = FilledFormSerializer
    permission_classes = (permissions.AllowAny,)
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ("parent",)
    http_method_names = ("get", "post", "delete")
