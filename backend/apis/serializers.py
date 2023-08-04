from django.contrib.auth.models import User, Group
from rest_framework import serializers
from apis.models import Review, Business, Category


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class RegisterUserSerializer(serializers.HyperlinkedModelSerializer):
    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password'])
        return user

    def validate_username(self, value):
        # Custom validation for the 'username' field
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists.")
        return value

    def validate_email(self, value):
        # Custom validation for the 'email' field
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "Email address already registered.")
        return value

    def validate_password(self, value):
        # Custom validation for the 'password' field
        if len(value) < 8:
            raise serializers.ValidationError(
                "Password must be at least 8 characters long.")
        return value

    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups', 'password']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class ReviewReadSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Review
        depth = 1
        fields = '__all__'


class ReviewWriteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class BusinessReadSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Business
        depth = 1
        fields = [
            'url',
            'name',
            'slug',
            'description',
            'price_range',
            'street_address',
            'city',
            'region',
            'postal_code',
            'country',
            'website',
            'phone',
            'hours',
            'reviews',
            'category'
        ]


class BusinessWriteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Business
        fields = '__all__'


class CategoryReadSerializer(serializers.HyperlinkedModelSerializer):
    business = BusinessReadSerializer(many=True)

    class Meta:
        model = Category
        depth = 1
        ordering = ['name']
        fields = [
            'url',
            'name',
            'slug',
            'ordinal',
            'business'
        ]


class CategoryWriteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = [
            'url',
            'name',
            'slug',
            'ordinal',
        ]
