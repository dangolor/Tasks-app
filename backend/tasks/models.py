import random
from django.db import models
from django.conf import settings

PASTEL_COLORS = [
    "#FFD1DC",  # rosa pastel
    "#AEC6CF",  # azul pastel
    "#FFB347",  # naranja pastel
    "#B39EB5",  # lila pastel
    "#77DD77",  # verde pastel
    "#FDFD96",  # amarillo pastel
]

class TaskType(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Task(models.Model):
    class Status(models.TextChoices):
        PENDING = 'pending'
        IN_PROGRESS = 'in_progress'
        COMPLETED = 'completed'

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tasks')
    task_type = models.ForeignKey(TaskType, on_delete=models.PROTECT, related_name='tasks')
    description = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=12, choices=Status.choices, default=Status.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    color = models.CharField(max_length=7, blank=True, editable=False)

    def __str__(self):
        return f'{self.task_type} - {self.status} ({self.user.username})'