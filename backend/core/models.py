import uuid

from django.db import models
from django.contrib.auth.models import User, AbstractUser
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.utils import timezone
from django.utils.text import slugify
from django.utils.safestring import mark_safe
from django.conf import settings
from django.template.loader import render_to_string

class Comment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.id

    class Meta:
        ordering = ['-id']
        verbose_name = 'Comment'
        verbose_name_plural = 'Comments'


class Share(models.Model):
    SHARE_TYPE = (
        ('read', 'Read only'),
        ('read_write', 'Read and write'),
    )
    INPUT_STATE = (
        (0, 'active'),
        (1, 'inactive'),
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    type = models.CharField(max_length=10, choices=SHARE_TYPE, default='read')
    timestamp = models.DateTimeField(auto_now_add=True)
    state = models.IntegerField(choices=INPUT_STATE, default=0)
    duration = models.IntegerField(default=172800000)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, blank=True, null=True)


class Filter(models.Model):
    CRITERIAS_FILTER = (
        (0, 'Not equal'),
        (1, 'Greater than'),
        (2, 'Greater than or equal'),
        (3, 'Less than'),
        (4, 'Less than or equal'),
        (5, 'Equal')
    )
    TYPE_FILTER = (
        (0, 'Filtre de texte'),
        (1, 'Filtre de date'),
        (2, 'Filtre numérique'),
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=250)
    criterias = models.IntegerField(choices=CRITERIAS_FILTER)
    type = models.IntegerField(choices=TYPE_FILTER)
    timestamp = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, blank=True, null=True)

class Team(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    team_members = models.ManyToManyField(self, related_name='team_members', blank=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-id']
        verbose_name = 'Team'
        verbose_name_plural = 'Teams'

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Team, self).save(*args, **kwargs)

class CustomUser(AbstractUser):

    def __str__(self):
        return self.email


class Tag(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['-id', '-created_at']
        verbose_name = 'Tag'
        verbose_name_plural = 'Tags'

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Tag, self).save(*args, **kwargs)


class History(models.Model):
    INPUT_TYPE = (
        ('create', 'creation'),
        ('edit', 'modification'),
        ('delete', 'suppression'),
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    type = models.CharField(max_length=10, choices=INPUT_TYPE)
    modified_field = models.CharField(max_length=150)
    old_value = models.CharField(max_length=150)
    new_value = models.CharField(max_length=150)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return 'f {self.modified_field}: {self.old_value} -> {self.new_value}'

    class Meta:
        ordering = ['-id']
        verbose_name = 'History'
        verbose_name_plural = 'Histories'

class ItemBase(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='%(class)s_related', on_delete=models.CASCADE)
    title = models.CharField(max_length=250)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

    def render(self):
        return render_to_string('courses/content/{}.html'.format(self._meta.model_name), {'item': self})

    def __str__(self):
        return self.title

class Text(ItemBase):
    content = models.TextField()

class File(ItemBase):
    file = models.FileField(upload_to='files')

class Image(ItemBase):
    file = models.FileField(upload_to='images')

class Video(ItemBase):
    url = models.URLField()

class Link(ItemBase):
    url = models.URLField()


class Page(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    content_type = models.ForeignKey(ContentType, limit_choices_to={'model__in':('text', 'link', 'video', 'image', 'file')}, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    item = GenericForeignKey('content_type', 'object_id')
    tags = models.ManyToManyField(Tag, blank=True)
    comments = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    share = models.ForeignKey(Share, on_delete=models.CASCADE, blank=True, null=True)
    history = models.ForeignKey(History, on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        ordering = ['-id']


class Table(models.Model):
    INPUT_STATE = (
        ('IP', 'In-progress'),
        ('CL', 'Closed'),
        ('AW', 'Awaiting'),
        ('NS', 'Not Started'),
        ('AN', 'Analysis'),
    )
    INPUT_PRIORITY = (
        (0, 'Low'),
        (1, 'Medium'),
        (2, 'High'),
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=250)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deadline_at = models.DateTimeField(blank=True, null=True)
    state = models.CharField(max_length=2, choices=INPUT_STATE, default='NS')
    assignee = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='tables', on_delete=models.CASCADE)
    priority = models.IntegerField(choices=INPUT_PRIORITY, default=0)
    tags = models.ManyToManyField(Tag, blank=True)


class Database(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=250)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag, blank=True)
    content_type = models.ForeignKey(ContentType, limit_choices_to={'model__in':('text', 'link', 'video', 'image', 'file')}, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    item = GenericForeignKey('content_type', 'object_id')
    comments = models.ManyToManyField(Comment, blank=True)
    collaborators = models.ManyToManyField(to=settings.AUTH_USER_MODEL, related_name='collaborators', blank=True)


class Relationship(models.Model):
    INPUT_TYPE = (
        (0, 'One to One'),
        (1, 'One to Many'),
        (2, 'Many to Many'),
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    page_from = models.ForeignKey(Page, on_delete=models.CASCADE, blank=True, null=True, related_name='page_from')
    table_from = models.ForeignKey(Table, on_delete=models.CASCADE, blank=True, null=True, related_name='table_from')
    page_to = models.ForeignKey(Page, on_delete=models.CASCADE, blank=True, null=True, related_name='page_to')
    table_to = models.ForeignKey(Table, on_delete=models.CASCADE, blank=True, null=True, related_name='table_to')
    type = models.IntegerField(default=0, choices=INPUT_TYPE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, blank=True, null=True, related_name='comment')
    filters = models.ForeignKey(Filter, on_delete=models.CASCADE, blank=True, null=True)
    linked_field = models.CharField(max_length=150, blank=True, null=True)
    associated_field = models.CharField(max_length=150, blank=True, null=True)


    

