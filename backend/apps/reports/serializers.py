from rest_framework import serializers
from .models import Report


class ReportSerializer(serializers.ModelSerializer):
    """Serializer for Report model."""
    
    author_name = serializers.CharField(source='author.username', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = Report
        fields = [
            'id', 'title', 'description', 'status', 'status_display',
            'author', 'author_name', 'file', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'author', 'created_at', 'updated_at']


class ReportCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating reports."""
    
    class Meta:
        model = Report
        fields = ['title', 'description', 'status', 'file']


class ReportUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating reports."""
    
    class Meta:
        model = Report
        fields = ['title', 'description', 'status', 'file']
