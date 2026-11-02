from rest_framework.permissions import BasePermission


class HasPermission(BasePermission):
    """Custom permission to check if user has specific permission."""
    
    def __init__(self, permission_codename):
        self.permission_codename = permission_codename
    
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        
        # Admin has all permissions
        if request.user.role == 'admin':
            return True
        
        # Check if user has the specific permission
        user_permissions = request.user.permissions_list
        return self.permission_codename in user_permissions


class IsAdmin(BasePermission):
    """Permission to check if user is admin."""
    
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'admin'


class IsManagerOrAdmin(BasePermission):
    """Permission to check if user is manager or admin."""
    
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        return request.user.role in ['admin', 'manager']


class CanViewUsers(BasePermission):
    """Permission to view users list."""
    
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        return 'users.view' in request.user.permissions_list


class CanEditUsers(BasePermission):
    """Permission to edit users."""
    
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        return 'users.edit' in request.user.permissions_list


class CanDeleteUsers(BasePermission):
    """Permission to delete users."""
    
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        return 'users.delete' in request.user.permissions_list
