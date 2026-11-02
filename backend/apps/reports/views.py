from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from .models import Report
from .serializers import ReportSerializer, ReportCreateSerializer, ReportUpdateSerializer
from .permissions import CanViewReports, CanCreateReports, CanEditReports, CanDeleteReports, IsReportAuthorOrAdmin


class ReportListView(generics.ListAPIView):
    """List all reports."""
    permission_classes = [IsAuthenticated, CanViewReports]
    serializer_class = ReportSerializer
    
    def get_queryset(self):
        # Admin and manager can see all reports
        if self.request.user.role in ['admin', 'manager']:
            return Report.objects.all()
        # Regular users can only see their own reports
        return Report.objects.filter(author=self.request.user)


class ReportDetailView(generics.RetrieveAPIView):
    """Get report details."""
    permission_classes = [IsAuthenticated, CanViewReports]
    serializer_class = ReportSerializer
    
    def get_queryset(self):
        if self.request.user.role in ['admin', 'manager']:
            return Report.objects.all()
        return Report.objects.filter(author=self.request.user)


class ReportCreateView(generics.CreateAPIView):
    """Create new report."""
    permission_classes = [IsAuthenticated, CanCreateReports]
    serializer_class = ReportCreateSerializer
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class ReportUpdateView(generics.UpdateAPIView):
    """Update report."""
    permission_classes = [IsAuthenticated, CanEditReports, IsReportAuthorOrAdmin]
    serializer_class = ReportUpdateSerializer
    
    def get_queryset(self):
        if self.request.user.role in ['admin', 'manager']:
            return Report.objects.all()
        return Report.objects.filter(author=self.request.user)


class ReportDeleteView(generics.DestroyAPIView):
    """Delete report."""
    permission_classes = [IsAuthenticated, CanDeleteReports, IsReportAuthorOrAdmin]
    
    def get_queryset(self):
        if self.request.user.role == 'admin':
            return Report.objects.all()
        return Report.objects.filter(author=self.request.user)
