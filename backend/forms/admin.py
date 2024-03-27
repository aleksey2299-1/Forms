from django.contrib import admin

from forms.models import Answer, Dependence, FilledForm, Form, Option, Question

admin.site.register(Form)
admin.site.register(FilledForm)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(Option)
admin.site.register(Dependence)
