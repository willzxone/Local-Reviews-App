# Generated by Django 4.2.3 on 2023-07-09 12:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0004_alter_review_stars'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='category',
            name='business',
        ),
        migrations.AddField(
            model_name='business',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='business', to='apis.category'),
        ),
        migrations.AlterField(
            model_name='review',
            name='business',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='apis.business'),
        ),
    ]
