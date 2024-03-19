from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions, viewsets

from forms.models import FilledForm, Form
from forms.serializers import FilledFormSerializer, FormSerializer


class FormViewSet(viewsets.ModelViewSet):
    queryset = Form.objects.all()
    serializer_class = FormSerializer
    permission_classes = (permissions.AllowAny,)
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ("active",)
    http_method_names = ("get", "post", "patch", "delete")


class FilledFormViewSet(viewsets.ModelViewSet):
    queryset = FilledForm.objects.all()
    serializer_class = FilledFormSerializer
    permission_classes = (permissions.AllowAny,)
    http_method_names = ("get", "post", "delete")
