from django.contrib import admin
from django.contrib.auth.models import User
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

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'first_name', 'last_name', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Workspace)
admin.site.register(Folder)
admin.site.register(File)
admin.site.register(Subscription)
admin.site.register(Collaborators)
admin.site.register(Customer)
admin.site.register(ProductRelation)
admin.site.register(PriceRelation)
admin.site.register(Product)
admin.site.register(Price)

