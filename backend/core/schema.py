from core.models import Database, Comment, Table, Team, Tag, Share, Filter, History, ItemBase, Page, Relationship
from django.conf import settings
from ninja import ModelSchema

class DatabaseSchema(ModelSchema):
    class Meta:
        model = Database
        exclude = ('created_at', 'updated_at')