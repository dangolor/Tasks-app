from rest_framework import serializers
from .models import TaskType, Task


class TaskTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskType
        fields = ["id", "name"]


class TaskSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    task_type = TaskTypeSerializer(read_only=True)

    task_type_id = serializers.PrimaryKeyRelatedField(
        queryset=TaskType.objects.all(),
        source="task_type",
        write_only=True,
    )

    class Meta:
        model = Task
        fields = [
            "id",
            "user",
            "task_type",
            "task_type_id",
            "description",
            "status",
            "created_at",
            "updated_at",
            "color",
        ]
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
            "user",
            "color",
        ]

    def validate_status(self, value):
        allowed_statuses = [status.value for status in Task.Status]
        if value not in allowed_statuses:
            raise serializers.ValidationError(
                f"Invalid status. Must be one of: {allowed_statuses}"
            )
        return value