from core.models import (
    Workspace,
    Folder,
    File,
    Product,
)
from core.serializers import (
    WorkspaceSerializer,
    FolderSerializer,
    FileSerializer,
    ProductSerializer,
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


