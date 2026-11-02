#!/bin/bash

# Django Backend Setup Script

echo "🚀 Setting up Django backend..."

# Navigate to backend directory
cd backend

# Create virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Run migrations
echo "🗄️  Running migrations..."
python manage.py migrate

# Create superuser (optional)
echo "👤 Creating superuser..."
python manage.py createsuperuser --noinput --username admin --email admin@example.com 2>/dev/null || echo "Superuser already exists"

# Set admin password
echo "🔑 Setting admin password..."
python manage.py shell -c "
from apps.users.models import User
user = User.objects.get(username='admin')
user.set_password('admin123')
user.role = 'admin'
user.full_name = 'Администратор'
user.save()
print('Admin user configured')
"

# Create manager user
echo "👨‍💼 Creating manager user..."
python manage.py shell -c "
from apps.users.models import User
if not User.objects.filter(username='manager').exists():
    user = User.objects.create_user(
        username='manager',
        email='manager@example.com',
        password='manager123',
        role='manager',
        full_name='Менеджер'
    )
    print('Manager user created')
else:
    print('Manager user already exists')
"

# Create regular user
echo "👤 Creating regular user..."
python manage.py shell -c "
from apps.users.models import User
if not User.objects.filter(username='user').exists():
    user = User.objects.create_user(
        username='user',
        email='user@example.com',
        password='user123',
        role='user',
        full_name='Пользователь'
    )
    print('Regular user created')
else:
    print('Regular user already exists')
"

echo "✅ Backend setup complete!"
echo ""
echo "📝 To start the backend server:"
echo "   cd backend"
echo "   source venv/bin/activate"
echo "   python manage.py runserver"
echo ""
echo "🔑 Demo accounts:"
echo "   Admin: admin / admin123"
echo "   Manager: manager / manager123"
echo "   User: user / user123"
