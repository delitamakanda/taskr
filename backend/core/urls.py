from django.urls import path
from core.views import index
from core.api import (
    WorkspaceListAPIView,
    WorkspaceDetailAPIView,
    WorkspaceCreateAPIView,
    WorkspaceDeleteAPIView,
    FolderListAPIView,
    FolderDetailAPIView,
    FileListAPIView,
    FileDetailAPIView,
    ProductListAPIView,
    ProductDetailAPIView,
    SubscriptionListAPIView,
    SubscriptionDetailAPIView,
)

urlpatterns = [
    path("", index, name="index"),
    path("api/workspaces/", WorkspaceListAPIView.as_view(), name="workspaces"),
    path("api/workspaces/create/", WorkspaceCreateAPIView.as_view(), name="workspace-create"),
    path("api/workspaces/<int:pk>/delete/", WorkspaceDeleteAPIView.as_view(), name="workspace-delete"),
    path("api/workspaces/<int:pk>/", WorkspaceDetailAPIView.as_view(), name="workspace"),
    path("api/folders/", FolderListAPIView.as_view(), name="folders"),
    path("api/folders/<int:pk>/", FolderDetailAPIView.as_view(), name="folder"),
    path("api/files/", FileListAPIView.as_view(), name="files"),
    path("api/files/<int:pk>/", FileDetailAPIView.as_view(), name="file"),
    path("api/products/", ProductListAPIView.as_view(), name="products"),
    path("api/products/<int:pk>/", ProductDetailAPIView.as_view(), name="product"),
    path("api/subscriptions/", SubscriptionListAPIView.as_view(), name="subscriptions"),
    path("api/subscriptions/<int:pk>/", SubscriptionDetailAPIView.as_view(), name="subscription"),
]
