from rest_framework import serializers
from core.models import (
    CustomUser,
    Workspace,
    Folder,
    File,
    Subscription,
    Collaborators,
    Customer,
    ProductRelation,
    PriceRelation,
    Product,
    Price,
)


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'first_name', 'last_name', 'is_staff', 'is_active')
        read_only_fields = ('id',)
        extra_kwargs = {
            'password': {
                'write_only': True,
              'style': {'input_type': 'password'}
            }
        }


class WorkspaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workspace
        fields = '__all__'
        read_only_fields = ('id',)



class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = '__all__'

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = '__all__'


class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = '__all__'
        read_only_fields = ('id',)



class CollaboratorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collaborators
        fields = '__all__'


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class ProductRelationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ProductRelation
        fields = '__all__'


class PriceRelationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PriceRelation
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class PriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Price
        fields = '__all__'

