from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _


class Report(models.Model):
    """Report model."""
    
    class Status(models.TextChoices):
        PENDING = 'pending', _('Ожидание')
        IN_PROGRESS = 'in_progress', _('В процессе')
        COMPLETED = 'completed', _('Завершён')
        CANCELLED = 'cancelled', _('Отменён')
    
    title = models.CharField(
        _('Название'),
        max_length=200,
    )
    description = models.TextField(
        _('Описание'),
        blank=True,
    )
    status = models.CharField(
        _('Статус'),
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING,
    )
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='reports',
        verbose_name=_('Автор'),
    )
    file = models.FileField(
        _('Файл'),
        upload_to='reports/',
        blank=True,
        null=True,
    )
    created_at = models.DateTimeField(
        _('Создан'),
        auto_now_add=True,
    )
    updated_at = models.DateTimeField(
        _('Обновлён'),
        auto_now=True,
    )
    
    class Meta:
        verbose_name = _('Отчёт')
        verbose_name_plural = _('Отчёты')
        ordering = ['-created_at']
    
    def __str__(self):
        return f'{self.title} ({self.get_status_display()})'
