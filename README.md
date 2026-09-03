# Город 812 — веб-приложение v2

В этой версии убран «операционный остаток». Добавлена реальная отправка в существующую Google Form через Google Apps Script.

## Подключение

1. Откройте https://script.google.com/
2. Создайте новый проект.
3. Вставьте содержимое `Code.gs`.
4. Нажмите Deploy → New deployment.
5. Тип: Web app.
6. Execute as: Me.
7. Who has access: Anyone.
8. Скопируйте URL веб-приложения.
9. В `index.html` замените:
   PASTE_APPS_SCRIPT_WEB_APP_URL_HERE
   на этот URL.
10. Разместите `index.html` на любом статическом хостинге или используйте его как основу для Android-приложения.

Важно: Google Apps Script получает доступ к форме от имени аккаунта, который развернул скрипт. При первом запуске Google попросит разрешить доступ к Google Forms.
