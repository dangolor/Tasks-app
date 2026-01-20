import random
from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import Task

def generate_unique_color(used_colors, max_attempts=1000):
    "Evita colores ya usados al asignar un nuevo color. Maximo de intentos para evitar loops infinitos."
    for _ in range(max_attempts):
        color = "#{:06X}".format(random.randint(0, 0xFFFFFF))
        if color not in used_colors:
            return color
    return"#CCCCCC"

@receiver(pre_save, sender=Task)
def task_assign_color(sender, instance, **kwargs):
    if not instance.color:
        used_colors = set(Task.objects.exclude(pk=instance.pk).values_list('color', flat=True))
        new_color = generate_unique_color(used_colors)
        instance.color = new_color