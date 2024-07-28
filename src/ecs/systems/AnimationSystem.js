import System from "../core/System";
import { Animation } from "../components";

export class AnimationSystem extends System {
  constructor(game) {
    super(game);

    this.animation_data = this.game.config.data.assets.animations;
    this.idle_animation = this.game.config.data.assets.idle_animations;
    // order matters and must match animation data
    this.actions = [
      "left",
      "right",
      "front",
      "back",
      "attack_back",
      "attack_front",
      "attack_left",
      "attack_right",
    ];
    this.player = game.world.world.createQuery({
      any: [Animation],
    })._cache;
    this.animations_loaded = false;
  }

  loadAnimations() {
    const scene_manager = this.game.managers.get("sceneManager");
    const scene = scene_manager.getScene(scene_manager.current_scene);
    const anims = scene.anims;
    if (anims) {
      this.animation_data.forEach(
        ({ key, frameRate, sprite_key, frame, repeat }) => {
          anims.create({
            key,
            frameRate,
            frames: anims.generateFrameNames(sprite_key, frame),
            repeat,
          });
        }
      );
      console.log("Animations Loaded..");
      this.animations_loaded = true;
    }
  }

  animate() {
    const animation_keys = this.animation_data.reduce((map, { key }, i) => {
      map[this.actions[i]] = key;
      return map;
    }, {});

    this.player.forEach((player) => {
      const current_direction = player.position.previous_position;
      switch (player.animation.type) {
        case "movement":
          player.fireEvent("animation-movement-start", {
            key: animation_keys[player.position.previous_position],
          });
          break;
        case "stop_movement":
          player.fireEvent("animation-stop", {
            stop_key: this.idle_animation[current_direction],
          });
          break;
        case "sword_attack":
          player.fireEvent("animation-action-start", {
            key: animation_keys[`attack_${current_direction}`],
            stop_key: this.idle_animation[current_direction],
          });
          break;
        default:
          break;
      }
    });
  }

  update(dt) {
    if (this.phaser_assets_loaded) {
      if (!this.animations_loaded) {
        this.loadAnimations();
      }
      if (this.player.length > 0) {
        this.animate();
      }
    }
  }
}
