from django.contrib import admin
from django.contrib.auth.models import User
from core.models import (
    CustomUser,
    Comment,
    Share,
    Table,
    Filter,
    Page,
    Team,
    Tag,
    History,
    Database,
    Relationship,

)

class TeamAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',)}

class CustomUserInline(admin.StackedInline):
    model = Team

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'first_name', 'last_name', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)
    # inlines = [CustomUserInline]


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Comment)
admin.site.register(Share)
admin.site.register(Table)
admin.site.register(Filter)
admin.site.register(Page)
admin.site.register(Team, TeamAdmin)
admin.site.register(Tag)
admin.site.register(History)
admin.site.register(Database)
admin.site.register(Relationship)


