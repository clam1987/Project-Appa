import Phaser from "phaser";

export default {
  type: Phaser.AUTO,
  backgroundColor: "#ffffff",
  width: window.innerWidth - 5,
  height: window.innerHeight - 5,
  parent: "game-renderer",
  autoFocus: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
};
