# Generated by Django 2.1.4 on 2019-03-06 00:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_idea_contenido'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='idea',
            name='contenido',
        ),
    ]
