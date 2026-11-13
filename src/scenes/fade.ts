import Phaser from "phaser";

export function fadeTo(scene: Phaser.Scene, key: string, data?: object): void {
  scene.cameras.main.fadeOut(450, 4, 2, 12);
  scene.cameras.main.once("camerafadeoutcomplete", () => {
    scene.scene.start(key, data);
  });
}
