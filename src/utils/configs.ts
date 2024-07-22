export default {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#ffffff",
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
};
