from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import Report


@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'status', 'created_at', 'updated_at']
    list_filter = ['status', 'created_at']
    search_fields = ['title', 'description', 'author__username']
    ordering = ['-created_at']
    
    fieldsets = (
        (None, {'fields': ('title', 'description', 'status')}),
        (_('Автор и файл'), {'fields': ('author', 'file')}),
    )
