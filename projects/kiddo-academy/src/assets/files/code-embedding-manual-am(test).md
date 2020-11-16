Դու կարող ես տեղադրել Kiddo խաղը քո կայքում, ճիշտ այնպես, ինչպես YouTube փլեյերը: Դա անելու համար պատճենիր ներքևի կոդը և տեղադրիր այն կայքի կոդի մեջ, ևս, ինչպես YouTube փլեյերի դեպքում:
```html
<script src="https://test.kiddo.academy/player/kiddo-player.js" defer></script>
<script> const assetsPath = 'https://test.kiddo.academy/player/assets/'; </script>
```
Այն ամենը, ինչ գտնվում է Kiddo կայքում, սեւ ֆոնի վրա, կհայտնվի քո կայքի էջում ՝ առաջադրանքներ, պայմաններ, օգնություն, տերմինալ, պատասխանների խմբագիր և այլն: Այն ամենն, ինչ գտնվում է սև ուղղանկյան տակը և վերևը չի պատճենվի ձեր կայքում:
<br>
<br>
Էջում պետք է տեղադրվի նաև հետևյալ թեգը.
```html
<body>
  ...
  <kiddo-player></kiddo-player>
  ...
</body>
```
Սկրիպտը ներբեռնելուց հետո այստեղ կհայտնվի փլեյերը:

Մակարդակի կարգավորումը փլեյերին փոխանցելու համար կա 2 տարբերակ.

1. <strong>< kiddo-player ></strong> թեգում սահմանել <strong>kiddo-scene-config</strong>
 հատկանիշը, որը պարունակում է հղում դեպի YAML ֆայլ մակարդակի կոդով:<br>
<i>Օրրինակ՝ HTML էջեր՝ </i>
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

HTML ֆայլը կարելի է ներբեռնել <a href="/player/assets/files/kiddo-embedding-with-url(test).html" download>այս հղումով</a>:<br>

2. < script > թեգում սահմանել տողի փոփոխականը և նրան կցել մակարդակի կարգավորման կոդը ՝ YAML ձևաչափով: Դրանից հետո ընտրել <strong>< kiddo-player ></strong>-ը (օրինակ, օգտագործելով document.querySelector գործառույթը) և մակարդակի կոդով փոփոխականի արժեքը կցել նրա <strong>kiddo-scene-config</strong> հատկանիշին:<br>
<i>Օրրինակ՝ HTML էջեր՝</i>
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
      // Մակարդակը փոխելու համար մուտքագրիր քո կոդը YAML ձևաչափով  հակառակ մեջբերումների միջև (backticks)
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

      # Ավելացրեք կոդ այստեղ
    taskDescription: օգնիր Ջրարջին հասնել դրոշին:
    `;

    const kiddoPlayerElement = document.querySelector('kiddo-player');
    kiddoPlayerElement.setAttribute('kiddo-scene-config', sceneConfig);

  </script>
</body>
</html>
```
HTML ֆայլը կարելի է ներբեռնել <a href="/player/assets/files/kiddo-embedding-with-variable(test).html" download>այս հղումով</a>:<br>
<br>
<p>Եթե ցանկանում ես, որ կայքում հայտնվեն հատուկ մակարդակներ և գլուխկոտրուկներ, կամ նույնիսկ ամբողջական բաժիններ գրիր <a href='mailto:kiddo@dataart.com'>kiddo@dataart.com</a> էլ. հասցեին, կքննարկենք:</p>
