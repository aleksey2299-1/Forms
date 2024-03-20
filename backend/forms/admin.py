from django.contrib import admin

from forms.models import (
    Dependence,
    FilledForm,
    FilledOption,
    FilledQuestion,
    Form,
    Option,
    Question,
)

admin.site.register(Form)
admin.site.register(FilledForm)
admin.site.register(Question)
admin.site.register(FilledQuestion)
admin.site.register(Option)
admin.site.register(FilledOption)
admin.site.register(Dependence)
