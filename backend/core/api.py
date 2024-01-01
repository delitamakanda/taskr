from core.models import (
    Workspace,
    Folder,
    File,
    Product,
    Subscription,
)
from core.serializers import (
    WorkspaceSerializer,
    FolderSerializer,
    FileSerializer,
    ProductSerializer,
    SubscriptionSerializer,
)

from rest_framework import generics, permissions, filters

class ProductListAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permissions_classes = (permissions.IsAuthenticated,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name',)
    ordering_fields = ('id', 'name', 'created_at',)

class ProductDetailAPIView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permissions_classes = (permissions.IsAuthenticated,)

class WorkspaceListAPIView(generics.ListAPIView):
    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer
    permissions_classes = (permissions.IsAuthenticated,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('title',)
    ordering_fields = ('id', 'title', 'created_at',)

    def get_queryset(self):
        return Workspace.objects.filter(owner=self.request.user)

class WorkspaceCreateAPIView(generics.CreateAPIView):
    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer
    permissions_classes = (permissions.IsAuthenticated,)

class WorkspaceDeleteAPIView(generics.DestroyAPIView):
    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer
    permissions_classes = (permissions.IsAuthenticated,)

class WorkspaceDetailAPIView(generics.RetrieveAPIView):
    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer
    permissions_classes = (permissions.IsAuthenticated,)

class FolderListAPIView(generics.ListAPIView):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer
    permissions_classes = (permissions.IsAuthenticated,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('title',)
    ordering_fields = ('id', 'title', 'created_at',)


class FolderDetailAPIView(generics.RetrieveAPIView):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer
    permissions_classes = (permissions.IsAuthenticated,)

class FileListAPIView(generics.ListAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    permissions_classes = (permissions.IsAuthenticated,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('title',)
    ordering_fields = ('id', 'title', 'created_at',)

class FileDetailAPIView(generics.RetrieveAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    permissions_classes = (permissions.IsAuthenticated,)


class SubscriptionListAPIView(generics.ListAPIView):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    permissions_classes = (permissions.IsAuthenticated,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('id',)

    def get_queryset(self):
        return Subscription.objects.filter(user=self.request.user)


class SubscriptionDetailAPIView(generics.RetrieveAPIView):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    permissions_classes = (permissions.IsAuthenticated,)
