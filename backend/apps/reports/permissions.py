from rest_framework.permissions import BasePermission


class CanViewReports(BasePermission):
    """Permission to view reports."""
    
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        return 'reports.view' in request.user.permissions_list


class CanCreateReports(BasePermission):
    """Permission to create reports."""
    
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        return 'reports.create' in request.user.permissions_list


class CanEditReports(BasePermission):
    """Permission to edit reports."""
    
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        return 'reports.edit' in request.user.permissions_list


class CanDeleteReports(BasePermission):
    """Permission to delete reports."""
    
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        return 'reports.delete' in request.user.permissions_list


class IsReportAuthorOrAdmin(BasePermission):
    """Permission to edit/delete only own reports or admin."""
    
    def has_object_permission(self, request, view, obj):
        if request.user.role == 'admin':
            return True
        return obj.author == request.user
