from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    """Custom User model with role-based access control."""
    
    class Role(models.TextChoices):
        ADMIN = 'admin', _('Администратор')
        MANAGER = 'manager', _('Менеджер')
        USER = 'user', _('Пользователь')
        GUEST = 'guest', _('Гость')
    
    role = models.CharField(
        _('Роль'),
        max_length=20,
        choices=Role.choices,
        default=Role.USER,
    )
    full_name = models.CharField(
        _('Полное имя'),
        max_length=200,
        blank=True,
    )
    phone = models.CharField(
        _('Телефон'),
        max_length=20,
        blank=True,
    )
    bio = models.TextField(
        _('О себе'),
        blank=True,
    )
    avatar = models.ImageField(
        _('Аватар'),
        upload_to='avatars/',
        blank=True,
        null=True,
    )
    is_active = models.BooleanField(
        _('Активен'),
        default=True,
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
        verbose_name = _('Пользователь')
        verbose_name_plural = _('Пользователи')
        ordering = ['-created_at']
    
    def __str__(self):
        return f'{self.username} ({self.get_role_display()})'
    
    @property
    def permissions_list(self):
        """Get list of permissions for this user based on role."""
        role_permissions = {
            'admin': ['*'],  # All permissions
            'manager': [
                'users.view', 'users.edit',
                'reports.view', 'reports.create',
                'dashboard.view'
            ],
            'user': ['dashboard.view'],
            'guest': [],
        }
        return role_permissions.get(self.role, [])


class Permission(models.Model):
    """Permission model for fine-grained access control."""
    
    codename = models.CharField(
        _('Код права'),
        max_length=100,
        unique=True,
    )
    name = models.CharField(
        _('Название'),
        max_length=200,
    )
    description = models.TextField(
        _('Описание'),
        blank=True,
    )
    
    class Meta:
        verbose_name = _('Право доступа')
        verbose_name_plural = _('Права доступа')
        ordering = ['codename']
    
    def __str__(self):
        return f'{self.codename} - {self.name}'


class RolePermission(models.Model):
    """Mapping between roles and permissions."""
    
    role = models.CharField(
        _('Роль'),
        max_length=20,
        choices=User.Role.choices,
    )
    permission = models.ForeignKey(
        Permission,
        on_delete=models.CASCADE,
        related_name='role_permissions',
        verbose_name=_('Право'),
    )
    
    class Meta:
        verbose_name = _('Право роли')
        verbose_name_plural = _('Права ролей')
        unique_together = ['role', 'permission']
    
    def __str__(self):
        return f'{self.get_role_display()} - {self.permission.codename}'
