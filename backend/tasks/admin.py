from django.contrib import admin
from .models import TaskType, Task

@admin.register(TaskType)
class TaskTypeAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('task_type', 'user', 'status', 'color', 'created_at', 'updated_at')
    list_filter = ('status', 'task_type')
    search_fields = ('user__username', 'description')