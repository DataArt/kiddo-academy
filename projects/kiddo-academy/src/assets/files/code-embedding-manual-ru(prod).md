Ты можешь поставить игру Kiddo на свой сайт — как плейер YouTube. Для этого надо скопировать код ниже и вставить его в код веб-сайта — опять-таки как плейер YouTube.
```html
<script src="https://kiddo.academy/player/kiddo-player.js" defer></script>
<script> const assetsPath = 'https://kiddo.academy/player/assets/'; </script>
```
На странице твоего сайта появится все, что на сайте Kiddo находится на черном фоне — задачки, условия, помощь, терминал, редактор ответов и так далее. Все, что находится под и над черным прямоугольником, на твой сайт копироваться не будет.<br>
<br>
Также на страницу необходимо вставить следующий тег:
```html
<body>
  ...
  <kiddo-player></kiddo-player>
  ...
</body>
```
После загрузки скрипта в этом месте появится плеер.

Существует 2 варианта передачи настройки уровня в плеер:

1. В теге <strong>< kiddo-player ></strong> определить атрибут <strong>kiddo-scene-config</strong>, который будет содержать в себе ссылку на YAML-файл с кодом уровня.<br>
<i>Пример HTML-страницы:</i>
```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <base href="/">
      <title>Document</title>
      <script src="https://kiddo.academy/player/kiddo-player.js" defer></script>
      <script> const assetsPath = 'https://kiddo.academy/player/assets/'; </script>
    </head>
    <body>
      <kiddo-player kiddo-scene-config="https://kiddo.academy/tasks/src/ru/raccoon/task1/task.yaml">
      </kiddo-player>
    </body>
    </html>
```

HTML-файл можно скачать по этой <a href="/player/assets/files/kiddo-embedding-with-url(prod).html" download>ссылке</a>.<br>

2. В теге < script > определить строковую переменную и присвоить ей код настройки уровня в формате YAML. После выбрать элемент <strong>< kiddo-player ></strong> (например, с помощью функции document.querySelector) и его атрибуту <strong>kiddo-scene-config</strong> присвоить значение переменной с кодом уровня.<br>
<i>Пример HTML-страницы:</i>
```html
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <base href="/">
  <title>Document</title>
  <script src="https://kiddo.academy/player/kiddo-player.js" defer></script>
  <script> const assetsPath = 'https://kiddo.academy/player/assets/'; </script>
</head>
<body>
  <kiddo-player></kiddo-player>

  <script>
      // Чтобы поменять уровень, впиши свой код в YAML-формате между обратными кавычками:
    const sceneConfig = `
    sceneType: Raccoon
    generatingFunc: >-
      this.setPlayerPosition(1, 0);
      this.setGameField([
        ['BU', 'RO', 'BU', 'BU', 'BU', 'BU'],
        ['BU', 'RO', 'GR', 'RO', 'RO', 'RO'],
        ['BU', 'RO', 'RO', 'RO', 'GR', 'RO'],
        ['BU', 'RO', 'RO', 'GR', 'GR', 'FI'],
        ['BU', 'GR', 'GR', 'GR', 'OF', 'OF'],
        ['BU', 'GR', 'GR', 'GR', 'OF', 'GR']
      ]);
      this.addCheckingLogic(
        \`return this.player.position.x === 5 && this.player.position.y === 3
          ? null
          : "FINISH_NOT_REACHED"\`);
    initialScript: |-
      import raccoon

      # Add your code here
    taskDescription: Доведи енота до флага
    `;

    const kiddoPlayerElement = document.querySelector('kiddo-player');
    kiddoPlayerElement.setAttribute('kiddo-scene-config', sceneConfig);

  </script>
</body>
</html>
```
HTML-файл можно скачать по этой <a href="/player/assets/files/kiddo-embedding-with-variable(prod).html" download>ссылке</a>.<br>
<br>
<p>Если ты хочешь, чтобы на сайте появились специальные задачки-уровни или даже целые разделы, пиши на <a href='mailto:kiddo@dataart.com'>kiddo@dataart.com</a> — обсудим.</p>
