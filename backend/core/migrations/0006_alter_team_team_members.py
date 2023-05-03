# Generated by Django 4.2 on 2023-05-02 22:13

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_remove_team_author_alter_team_team_members'),
    ]

    operations = [
        migrations.AlterField(
            model_name='team',
            name='team_members',
            field=models.ManyToManyField(blank=True, related_name='team_members', to=settings.AUTH_USER_MODEL),
        ),
    ]
