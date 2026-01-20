import logging

_logger = logging.getLogger(__name__)

from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status
from .models import TaskType

User = get_user_model()


class TaskFlowAPITest(APITestCase):
    def setUp(self):
        self.user, _ = User.objects.get_or_create(
            email="pruebas@a.com",
            defaults={"username": "pruebas"}
        )

        self.user.set_password("pruebas")
        self.user.save()
        response = self.client.post(
            "/api/auth/login/",
            {"username": "pruebas", "password": "pruebas"},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.access_token = response.data["access"]

        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.access_token}")
        self.task_type = TaskType.objects.create(name="XDefault Type")

    def test_create_task_using_first_task_type(self):
        response = self.client.get("/api/tasks/categories/")
        _logger.warning(f"Response data: {response.data}")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data["results"]), 0)

        first_type = response.data["results"][0]
        task_type_id = first_type["id"]

        payload = {
            "task_type_id": task_type_id,
            "description": "Task created from automated test",
            "status": "pending",
        }

        response = self.client.post("/api/tasks/create/", payload, format="json")
        _logger.warning(f"Task Creation Response data: {response.data}")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        data = response.data

        # 4) Validaciones clave
        self.assertEqual(data["description"], payload["description"])
        self.assertEqual(data["status"], "pending")
        self.assertEqual(data["task_type"]["id"], task_type_id)
        self.assertEqual(data["user"], self.user.username)
