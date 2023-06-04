from ninja import Router
from core.models import Database, Comment, Table, Team, Tag, Share, Filter, History, ItemBase, Page, Relationship
from django.conf import settings

router = Router()

@router.get('/database/')
def database_list(request):
    return [
        {
            'id': db.id,
            'name': db.title,
        } for db in Database.objects.all()
    ]