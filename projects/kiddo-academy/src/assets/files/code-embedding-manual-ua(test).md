Ти можеш поставити гру Kiddo на свій сайт — як плеєр YouTube. Для цього треба скопіювати код нижче та вставити його в код веб-сайту — знову-таки як плеєр YouTube.
```html
<script src="https://test.kiddo.academy/player/kiddo-player.js" defer></script>
<script> const assetsPath = 'https://test.kiddo.academy/player/assets/'; </script>
```
На сторінці твого сайту з'явиться все, що на сайті Kiddo знаходиться на чорному тлі: задачі, умови, допомога, термінал, редактор відповідей тощо. Все, що знаходиться під і над чорним прямокутником, на твій сайт копіюватись не буде.
<br>
<br>
Також на сторінку необхідно вставити наступний тег:
```html
<body>
  ...
  <kiddo-player></kiddo-player>
  ...
</body>
```
Після завантаження скрипту в цьому місці з'явиться плеєр.

Існує 2 варіанти передачі налаштування рівня у плеєр:

1. У тегу <strong>< kiddo-player ></strong> визначити атрибут <strong>kiddo-scene-config</strong>, який буде містити у собі посилання на YAML-файл із кодом рівня.<br> 
<i>Приклад HTML-сторінки:</i>
```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <base href="/">
      <title>Document</title>
      <script src="https://test.kiddo.academy/player/kiddo-player.js" defer></script>
      <script> const assetsPath = 'https://test.kiddo.academy/player/assets/'; </script>
    </head>
    <body>
      <kiddo-player kiddo-scene-config="https://test.kiddo.academy/tasks/src/en/raccoon/task1/task.yaml">
      </kiddo-player>
    </body>
    </html>
```

HTML-файл можна завантажити за цим <a href="/player/assets/files/kiddo-embedding-with-url(test).html" download>посиланням</a>.<br>

2. У тегу < script > визначити рядкову змінну та привласнити їй код налаштування рівня у форматі YAML. Потім вибрати елемент <strong>< kiddo-player ></strong> (наприклад, за допомогою функції document.querySelector) та його атрибуту <strong>kiddo-scene-config</strong> привласнити значення змінної з кодом рівня.<br>
<i>Приклад HTML-сторінки:</i>
```html
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <base href="/">
  <title>Document</title>
  <script src="https://test.kiddo.academy/player/kiddo-player.js" defer></script>
  <script> const assetsPath = 'https://test.kiddo.academy/player/assets/'; </script>
</head>
<body>
  <kiddo-player></kiddo-player>

  <script>
      // Щоб змінити рівень, впиши свій код у YAML-форматі між зворотними лапками:
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

      # Додати код тут
    taskDescription: Доведи Єнота до прапора
    `;

    const kiddoPlayerElement = document.querySelector('kiddo-player');
    kiddoPlayerElement.setAttribute('kiddo-scene-config', sceneConfig);

  </script>
</body>
</html>
```
HTML-файл можна завантажити за цим <a href="/player/assets/files/kiddo-embedding-with-variable(test).html" download>посиланням</a>.<br>
<br>
<p>Якщо ти хочеш, щоб на сайті з'явилися специфічні задачки-рівні або навіть цілі розділи, пиши на <a href='mailto:kiddo@dataart.com'>kiddo@dataart.com</a> — обговоримо.</p>
