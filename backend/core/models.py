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
from django.contrib.auth import get_user_model

class Product(models.Model):
    active = models.BooleanField(default=True)
    name = models.CharField(max_length=250)
    description = models.TextField(blank=True, null=True)
    image = models.URLField(blank=True, null=True)
    metadata = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'


PRIING_TYPE_CHOICES = (
    ('recurring', 'Recurring'),
    ('one-time', 'One-Time'),
)

PRICING_PLAN_INTERVAL_CHOICES = (
    ('day', 'Day'),
    ('week', 'Week'),
    ('month', 'Month'),
    ('year', 'Year'),
)

class Price(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    active = models.BooleanField(default=True)
    description = models.TextField(blank=True, null=True)
    unit_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    currency = models.CharField(max_length=3, default='USD')
    type = models.CharField(max_length=250,choices=PRIING_TYPE_CHOICES, default='recurring')
    interval = models.CharField(max_length=250, choices=PRICING_PLAN_INTERVAL_CHOICES, default='month')
    interval_count = models.IntegerField(default=1)
    trial_period_days = models.IntegerField(default=30)
    metadata = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name = 'Price'
        verbose_name_plural = 'Prices'

class Workspace(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=250)
    icon_id = models.CharField(max_length=250, default='icon.png')
    data = models.TextField(blank=True, null=True)
    in_trash = models.TextField(blank=True, null=True)
    logo = models.FileField(blank=True, null=True, upload_to='workspaces/%Y/%m/%d/')
    banner_url = models.URLField(blank=True, null=True)

    class Meta:
        verbose_name = 'Workspace'
        verbose_name_plural = 'Workspaces'


class Folder(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=250)
    icon_id = models.CharField(max_length=250, default='icon.png')
    data = models.TextField(blank=True, null=True)
    in_trash = models.TextField(blank=True, null=True)
    banner_url = models.URLField(blank=True, null=True)
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        verbose_name = 'Folder'
        verbose_name_plural = 'Folders'

class File(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=250)
    icon_id = models.CharField(max_length=250, default='icon.png')
    data = models.TextField(blank=True, null=True)
    in_trash = models.TextField(blank=True, null=True)
    banner_url = models.URLField(blank=True, null=True)
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE, blank=True, null=True)
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        verbose_name = 'File'
        verbose_name_plural = 'Files'


SUBSCRIPTION_STATUS_CHOICES = (
    ('unpaid', 'Unpaid'),
    ('active', 'Active'),
    ('trialing', 'Trialing'),
    ('past_due', 'Past Due'),
    ('canceled', 'Canceled'),
    ('incomplete', 'Incomplete'),
    ('incomplete_expired', 'Incomplete Expired'),
)

class Subscription(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    status = models.CharField(max_length=250, choices=SUBSCRIPTION_STATUS_CHOICES, default='unpaid')
    metadata = models.TextField(blank=True, null=True)
    price = models.ForeignKey(Price, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    cancel_at_period_end = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    current_period_start = models.DateTimeField(auto_now_add=True)
    current_period_end = models.DateTimeField(auto_now_add=True)
    ended_at = models.DateTimeField(blank=True, null=True)
    canceled_at = models.DateTimeField(blank=True, null=True)
    trial_start = models.DateTimeField(blank=True, null=True)
    trial_end = models.DateTimeField(blank=True, null=True)

    class Meta:
        verbose_name = 'Subscription'
        verbose_name_plural = 'Subscriptions'


class Collaborators(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Collaborator'
        verbose_name_plural = 'Collaborators'


class CustomUser(AbstractUser):
    avatar_url = models.URLField(blank=True, null=True)
    billing_address = models.CharField(max_length=250, blank=True, null=True)
    payment_method = models.CharField(max_length=250, blank=True, null=True)

    def __str__(self):
        return self.email

    def get_short_name(self):
        return self.email


    def get_full_name(self):
        return self.email

class Customer(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    stripe_customer_id = models.CharField(max_length=250, blank=True, null=True)

    class Meta:
        verbose_name = 'Customer'
        verbose_name_plural = 'Customers'

class ProductRelation(models.Model):
    prices = models.ManyToManyField(Price)

    class Meta:
        verbose_name = 'Product Relation'
        verbose_name_plural = 'Product Relations'

class PriceRelation(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Price Relation'
        verbose_name_plural = 'Price Relations'
    