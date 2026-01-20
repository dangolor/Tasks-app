FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .

RUN apt-get update && apt-get install -y --no-install-recommends \
    libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip && \
    pip install -r requirements.txt

COPY . .

EXPOSE 8000

#ejecuta tests antes de iniciar el servidor pero siempre lo inicia
CMD ["sh", "-c", "python manage.py migrate && python manage.py test || true && python manage.py runserver 0.0.0.0:8000"]