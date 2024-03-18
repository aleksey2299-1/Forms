from rest_framework import viewsets, permissions
from rest_framework.request import Request

from forms.models import Form
from forms.serializers import CreateFormSerializer


class FormViewSet(viewsets.ModelViewSet):
    queryset = Form.objects.all()
    serializer_class = CreateFormSerializer
    permission_classes = (permissions.AllowAny,)
    http_method_names = ("get", "post", "patch", "delete")

    def create(self, request: Request, *args, **kwargs):
        print(request.data)
        return super().create(request, *args, **kwargs)
