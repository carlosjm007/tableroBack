# Generated by Django 2.1.4 on 2019-03-06 00:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_auto_20190305_1820'),
    ]

    operations = [
        migrations.AddField(
            model_name='idea',
            name='contenido',
            field=models.CharField(default='', max_length=200),
        ),
    ]
