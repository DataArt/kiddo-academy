You can install Kiddo game on you site as YouTube player. You just need to copy the code below and to embed it in the website code just as YouTube player.
```html
<script src="https://test.kiddo.academy/player/kiddo-player.js" defer></script>
<script> const assetsPath = 'https://test.kiddo.academy/player/assets/'; </script>
```
Everything visible on Kiddo site against the black background (tasks, conditions, help, terminal, answers editor) will be seen on your website. Everything placed above and under the black rectangle will not be copied onto your site.
<br>
<br>
You need to embed the following tag onto the page:
```html
<body>
  ...
  <kiddo-player></kiddo-player>
  ...
</body>
```
The player will appear in this place after the script is loaded.

There are two ways of passing the level setting to the player:

1. To define the attribute <strong>kiddo-scene-config</strong> containing a link to a YAML-file with the level code in the tag <strong>< kiddo-player ></strong>.<br>
<i>HTML-page example:</i>
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

HTML-file is downloadable via <a href="/player/assets/files/kiddo-embedding-with-url(test).html" download>this link</a>.<br>

2. To define the string variable and to assign it YAML-format level setting code in the tag < script >. Then, to choose the element <strong>< kiddo-player ></strong> (for example, with the help of the function document.querySelector) and to assign its attribute <strong>kiddo-scene-config</strong> a variable value with  the level code.<br>
<i>HTML-page example:</i>
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
      // To change the level embed your code in Yaml-format in inverted commas:
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
    taskDescription: Take Raccoon to the flag
    `;

    const kiddoPlayerElement = document.querySelector('kiddo-player');
    kiddoPlayerElement.setAttribute('kiddo-scene-config', sceneConfig);

  </script>
</body>
</html>
```
HTML-file is downloadable via <a href="/player/assets/files/kiddo-embedding-with-variable(test).html" download>this link</a>.<br>
<br>
<p>If you want to get special tasks-levels or entire chapters, write to <a href='mailto:kiddo@dataart.com'>kiddo@dataart.com</a> to discuss possible options.</p>
