export interface SceneConfiguration {
  sceneType: string;
  generatingFunc: string;
  taskDescription?: string;
  winButton?: WinButton;
  initialScript?: string;
}

interface WinButton {
  url: string;
  text: string;
}
