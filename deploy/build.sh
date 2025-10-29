#!/bin/bash

CONFIG_FILE="deploy.conf"
PASSWD_FILE="deploy/PASSWD"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Загрузка конфигурации
load_config() {
    if [ -f "$CONFIG_FILE" ]; then
        source "$CONFIG_FILE"
    elif [ -f "$SCRIPT_DIR/$CONFIG_FILE" ]; then
        source "$SCRIPT_DIR/$CONFIG_FILE"
    fi
}

# Получение пароля
get_password() {
    if [ -f "$PASSWD_FILE" ]; then
        # Берем первую строку из файла с паролем
        PASSWORD=$(head -n 1 "$PASSWD_FILE")
        echo "🔑 Пароль загружен из файла $PASSWD_FILE"
    else
        # Запрашиваем пароль у пользователя
        read -s -p "🔑 Введите пароль SSH: " PASSWORD
        echo
    fi
}

# Параметры по умолчанию
DEFAULT_USER="username"
DEFAULT_IP="8.8.4.4"
DEFAULT_REMOTE_PATH="root/"
DEFAULT_LOCAL_WAR_PATH=""
DEFAULT_REMOTE_FILENAME="server.jar"
DEFAULT_SSH_PORT="22"

# Загружаем конфигурацию
load_config

# Парсинг аргументов
parse_arguments() {
    while [[ $# -gt 0 ]]; do
        case $1 in
            -u|--user) DEPLOY_USER="$2"; shift 2 ;;
            -i|--ip) DEPLOY_IP="$2"; shift 2 ;;
            -p|--path) REMOTE_PATH="$2"; shift 2 ;;
            -l|--local-path) LOCAL_WAR_PATH="$2"; shift 2 ;;
            -f|--filename) REMOTE_FILENAME="$2"; shift 2 ;;
            --ssh-port) SSH_PORT="$2"; shift 2 ;;
            -c|--config) CONFIG_FILE="$2"; load_config; shift 2 ;;
            --passwd-file) PASSWD_FILE="$2"; shift 2 ;;
            -h|--help) show_help; exit 0 ;;
            *) echo "Неизвестный параметр: $1"; show_help; exit 1 ;;
        esac
    done
}

show_help() {
    cat << EOF
Использование: $0 [OPTIONS]

OPTIONS:
  -u, --user USER          Имя пользователя SSH
  -i, --ip IP              IP/хост сервера
  -p, --path PATH          Путь на сервере
  -l, --local-path PATH    Локальный путь к WAR
  -f, --filename NAME      Имя файла на сервере
  --ssh-port PORT          SSH порт (по умолчанию: 22)
  -c, --config FILE        Конфигурационный файл
  --passwd-file FILE       Файл с паролем (по умолчанию: PASSWD)
  -h, --help               Показать справку

Конфигурационный файл (deploy.conf) может содержать:
  DEPLOY_USER, DEPLOY_IP, REMOTE_PATH, LOCAL_WAR_PATH, 
  REMOTE_FILENAME, SSH_PORT

Файл с паролем (PASSWD) должен содержать пароль в первой строке.
Если файл не существует, пароль будет запрошен интерактивно.

Пример deploy.conf:
  DEPLOY_USER="s467525"
  DEPLOY_IP="se.ifmo.ru"
  REMOTE_PATH="httpd-root/fcgi-bin"
  LOCAL_WAR_PATH="build/libs/server.war"
  REMOTE_FILENAME="server.jar"
  SSH_PORT="22"

Пример PASSWD файла:
  my_secure_password
EOF
}

# Установка финальных значений
set_final_values() {
    USER="${DEPLOY_USER:-$DEFAULT_USER}"
    IP="${DEPLOY_IP:-$DEFAULT_IP}"
    REMOTE_PATH="${REMOTE_PATH:-$DEFAULT_REMOTE_PATH}"
    LOCAL_WAR_PATH="${LOCAL_WAR_PATH:-$DEFAULT_LOCAL_WAR_PATH}"
    REMOTE_FILENAME="${REMOTE_FILENAME:-$DEFAULT_REMOTE_FILENAME}"
    SSH_PORT="${SSH_PORT:-$DEFAULT_SSH_PORT}"
    
    REMOTE_FILE_PATH="$REMOTE_PATH/$REMOTE_FILENAME"
}

# Проверка зависимостей
check_dependencies() {
    local deps=("npm" "gradlew" "scp" "sshpass")
    for dep in "${deps[@]}"; do
        if ! command -v "$dep" &> /dev/null && [ "$dep" != "gradlew" ]; then
            echo "❌ Не найден требуемый компонент: $dep"
            echo "Установите sshpass: sudo apt-get install sshpass"
            exit 1
        fi
    done
}

# Копирование файла с использованием пароля
copy_with_password() {
    local source="$1"
    local destination="$2"
    
    if [ -f "$PASSWD_FILE" ]; then
        # Используем sshpass с файлом
        if ! sshpass -f "$PASSWD_FILE" scp -o StrictHostKeyChecking=no -P "$SSH_PORT" "$source" "$destination"; then
            echo "❌ Ошибка при копировании на сервер"
            return 1
        fi
    else
        # Используем sshpass с переменной (менее безопасно, но работает)
        if ! sshpass -p "$PASSWORD" scp -o StrictHostKeyChecking=no -P "$SSH_PORT" "$source" "$destination"; then
            echo "❌ Ошибка при копировании на сервер"
            return 1
        fi
    fi
}

# Выполнение команды на сервере с использованием пароля
ssh_with_password() {
    local command="$1"
    
    if [ -f "$PASSWD_FILE" ]; then
        # Используем sshpass с файлом
        sshpass -f "$PASSWD_FILE" ssh -o StrictHostKeyChecking=no -p "$SSH_PORT" "$USER@$IP" "$command"
    else
        # Используем sshpass с переменной
        sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no -p "$SSH_PORT" "$USER@$IP" "$command"
    fi
}

# Основная функция деплоя
deploy() {
    echo "🚀 Запуск процесса деплоя..."
    
    # Получаем пароль
    get_password
    
    # Сборка
    echo "🔨 Сборка фронтенда (npm)..."
    if ! npm run build; then
        echo "❌ Ошибка сборки фронтенда"
        return 1
    fi
    
    echo "🔨 Сборка бэкенда (Gradle)..."
    if ! ./gradlew war; then
        echo "❌ Ошибка сборки бэкенда"
        return 1
    fi
    
    # Проверка WAR файла
    if [ ! -f "$LOCAL_WAR_PATH" ]; then
        echo "❌ WAR файл не найден: $LOCAL_WAR_PATH"
        return 1
    fi
    
    # Копирование на сервер
    echo "📤 Копирование на сервер..."
    if ! copy_with_password "$LOCAL_WAR_PATH" "$USER@$IP:$REMOTE_FILE_PATH"; then
        echo "❌ Ошибка при копировании на сервер"
        return 1
    fi
    
    # Деплой на WildFly
    echo "🎯 Деплой на WildFly..."
    if ! deploy_to_wildfly; then
        echo "❌ Ошибка деплоя на WildFly"
        return 1
    fi
    
    echo "✅ Деплой успешно завершен!"
    echo "https://itmo.ssngn.ru/lab2/"
}

# Деплой на WildFly через CLI
deploy_to_wildfly() {
    local temp_war_name="${REMOTE_FILENAME%.*}"
    
    # Создаем скрипт для деплоя
    #         deploy $REMOTE_FILE_PATH --name=$temp_war_name
    local deploy_script=$(cat << EOF
    # Подключаемся к WildFly CLI
    /opt/u0_wildfly/bin/jboss-cli.sh --connect \
        --controller=$WILDFLY_HOST:$WILDFLY_PORT \
        --user=$WILDFLY_USER \
        --password=$WILDFLY_PASSWORD << EOC

        deploy -l
EOC
EOF
    )
    
    # Выполняем скрипт деплоя на сервере
    ssh_with_password "$deploy_script"
}

# Главная функция
main() {
    parse_arguments "$@"
    set_final_values
    
    echo "=== Параметры деплоя ==="
    echo "Пользователь: $USER"
    echo "Сервер: $IP"
    echo "SSH порт: $SSH_PORT"
    echo "Локальный файл: $LOCAL_WAR_PATH"
    echo "Удаленный путь: $REMOTE_FILE_PATH"
    echo "Файл с паролем: $PASSWD_FILE"
    echo "========================"
    
    check_dependencies
    deploy
}

# Запуск главной функции
main "$@"