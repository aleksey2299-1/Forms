from django.contrib import admin

from forms.models import Form, Option, Dependence, Question


admin.site.register(Form)
admin.site.register(Question)
admin.site.register(Option)
admin.site.register(Dependence)
