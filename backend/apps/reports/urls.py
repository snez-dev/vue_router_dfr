from django.urls import path
from . import views

urlpatterns = [
    path('', views.ReportListView.as_view(), name='report-list'),
    path('<int:pk>/', views.ReportDetailView.as_view(), name='report-detail'),
    path('create/', views.ReportCreateView.as_view(), name='report-create'),
    path('<int:pk>/update/', views.ReportUpdateView.as_view(), name='report-update'),
    path('<int:pk>/delete/', views.ReportDeleteView.as_view(), name='report-delete'),
]
