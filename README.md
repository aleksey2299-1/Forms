***

# Формы

***

## Технологии:

[![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)](https://www.typescriptlang.org/)
[![AntDesign](https://img.shields.io/badge/AntDesign-5.3.1-blue?style=for-the-badge&logo=antdesign)](https://ant.design/)

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.python.org/)

[![Python](https://img.shields.io/badge/Python-3.12-blue?style=for-the-badge&logo=Python)](https://www.python.org/)
[![Django](https://img.shields.io/badge/Django-%204.2-blue?style=for-the-badge&logo=django)](https://www.djangoproject.com/)
[![DRF](https://img.shields.io/badge/DjangoRESTFramework-%203.14.0-blue?style=for-the-badge&logo=django)](https://www.django-rest-framework.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-%2016-blue?style=for-the-badge&logo=PostgreSQL)]([https://www.postgresql.org/])
[![Gunicorn](https://img.shields.io/badge/Gunicorn-%2020.1.0-blue?style=for-the-badge&logo=gunicorn)](https://gunicorn.org/)
[![drf-spectacular](https://img.shields.io/badge/drf--spectacular-0.27.0-blue?style=for-the-badge)](https://drf-spectacular.readthedocs.io/)

[![Swagger](https://img.shields.io/badge/Swagger-4A154B?style=for-the-badge&logo=swagger&logoColor=Black)](https://swagger.io/)
[![Docker](https://img.shields.io/badge/Docker-white?style=for-the-badge&logo=docker&logoColor=White)](https://www.docker.com/)
[![DockerCompose](https://img.shields.io/badge/Docker_Compose-34567C?style=for-the-badge&logo=docsdotrs&logoColor=White)](https://docs.docker.com/compose/)
[![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)](https://nginx.org/)
[![Certbot](https://img.shields.io/badge/certbot-003A70?style=for-the-badge&logo=letsencrypt&logoColor=white)](https://certbot.eff.org/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://docs.github.com/ru)

***

## Функционал:

- Создание и редактирование форм
- Создание вопросов с зависимостью от ответов на другие вопросы
- Просмотр всех ответов на формы

***

## Технические особенности:

Репозиторий включает в себя два файла **docker-compose.yml** и 
**docker-compose.production.yml**, что позволяет развернуть проект на
локальном или удалённом серверах.

Данная инструкция подразумевает, что на вашем локальном/удалённом сервере 
уже установлен Git, Python 3.12, пакетный менеджер pip, Docker, 
Docker Compose, утилита виртуального окружения python3-venv.

Реализовано получение и автопродление сертификатов для сайта внутри docker контейнера.

В проекте настроена автодокументация с помощью **Swagger**.

С подробными инструкциями запуска вы можете ознакомиться ниже.

***

## Как запустить:

### Запуск проекта в Docker-контейнерах с помощью Docker Compose:

Создайте и перейдите в директорию проекта:

```bash
mkdir forms
cd forms/
```

Скачайте и добавьте файл **docker-compose.production.yml** в директорию.

Cоздайте файл **.env**:

```bash
nano .env
```

Добавьте следующие строки и подставьте свои значения:
````dotenv
POSTGRES_DB=DB                           # название db
POSTGRES_USER=USER                       # имя пользователя для db
POSTGRES_PASSWORD=PASSWORD               # пароль пользователя для db
DB_HOST=db                               # если поменять, то тогда нужно поменять название сервиса в docker-compose.production.yml
DB_PORT=5432                             # это порт для доступа к db
SECRET_KEY=SECRET_KEY                    # SECRET_KEY в настройках django
DEBUG=False                              # режим debug (True или False)
ALLOWED_HOSTS=127.0.0.1 backend          # ваши адреса через пробел (пример:localhost 127.0.0.1 xxxx.com)
# Поля ниже ниже можно не заполнять если вы планируете запускать только локально
GET_CERTS=False                          # получить ли сертификаты для сайта
CERTBOT_EMAIL=example@example.com        # email для получения сертификатов
DOMAIN=test.com                          # ваш домен для которого планируются сертификаты
````

Установить docker: https://www.docker.com/get-started/

В терминале linux это можно сделать так:
````bash
sudo apt update
sudo apt install curl
curl -fSL https://get.docker.com -o get-docker.sh
sudo sh ./get-docker.sh
sudo apt install docker-compose-plugin 
````

Запустить Docker в директории с файлом **docker-compose.yaml** (чтобы запустить в фоновом режиме добавьте флаг -d):
````bash
docker compose -f docker-compose.production.yml up
````
В терминале Linux могут потребоваться права суперпользователя:
````bash
sudo docker compose -f docker-compose.production.yml up
````

Для доступа в админ-зону (если вам нужны какие-то данные из бд, или нужно создать объекты) перейдите на страницу http://localhost:8000/admin/:

Логин: `admin@admin.ru`

Пароль: `admin`

### Если вы хотите иметь возможность поменять код:

Склонируйте репозиторий:
````bash
git clone git@github.com:aleksey2299-1/Forms.git forms
````

Перейдите в папку forms и запустите файл **docker-compose.yml**:
````bash
cd forms
docker compose up
````

> **Примечание.** Любые изменения в коде при сохранении будут немедленно отображаться при запросах к серверу
***

После развертывания сайт будет доступен по вашему домену или, если вы его не указывали, по адресу http://localhost:8000/.

Для возможности редактирование перейдите на `<ваш домен>/forms`, для авторизации воспользуйтесь данными для доступа в админ зону.
