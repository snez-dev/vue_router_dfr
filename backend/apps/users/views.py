from rest_framework import generics, status, views
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model

from .serializers import (
    UserSerializer, UserListSerializer, UserCreateSerializer,
    UserUpdateSerializer, LoginSerializer, RegisterSerializer,
    ChangePasswordSerializer
)
from .permissions import CanViewUsers, CanEditUsers, CanDeleteUsers, IsAdmin

User = get_user_model()


class LoginView(views.APIView):
    """User login view."""
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        
        user_data = UserSerializer(user).data
        
        return Response({
            'success': True,
            'token': str(refresh.access_token),
            'refresh_token': str(refresh),
            'user': user_data,
            'permissions': user.permissions_list
        }, status=status.HTTP_200_OK)


class RegisterView(generics.CreateAPIView):
    """User registration view."""
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        refresh = RefreshToken.for_user(user)
        user_data = UserSerializer(user).data
        
        return Response({
            'success': True,
            'token': str(refresh.access_token),
            'refresh_token': str(refresh),
            'user': user_data,
            'permissions': user.permissions_list
        }, status=status.HTTP_201_CREATED)


class LogoutView(views.APIView):
    """User logout view."""
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh_token')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            return Response({'success': True}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'success': False, 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(generics.RetrieveUpdateAPIView):
    """Get and update current user profile."""
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    
    def get_object(self):
        return self.request.user


class ChangePasswordView(views.APIView):
    """Change user password."""
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = request.user
        
        if not user.check_password(serializer.validated_data['current_password']):
            return Response(
                {'error': 'Неверный текущий пароль'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        
        return Response({'success': True, 'message': 'Пароль успешно изменён'})


class UserListView(generics.ListAPIView):
    """List all users."""
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated, CanViewUsers]
    serializer_class = UserListSerializer


class UserDetailView(generics.RetrieveAPIView):
    """Get user details."""
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated, CanViewUsers]
    serializer_class = UserSerializer


class UserCreateView(generics.CreateAPIView):
    """Create new user (admin only)."""
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated, IsAdmin]
    serializer_class = UserCreateSerializer


class UserUpdateView(generics.UpdateAPIView):
    """Update user."""
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated, CanEditUsers]
    serializer_class = UserUpdateSerializer


class UserDeleteView(generics.DestroyAPIView):
    """Delete user (admin only)."""
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated, IsAdmin]
