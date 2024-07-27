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
      "down",
      "up",
      "attack_up",
      "attack_down",
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
    // const input_manager = this.game.managers.get("inputManager");
    const animation_keys = this.animation_data.reduce((map, { key }, i) => {
      map[this.actions[i]] = key;
      return map;
    }, {});
    this.player.forEach((player) => {
      switch (player.animation.type) {
        case "movement":
          player.fireEvent("animation-start", {
            key: animation_keys[player.position.previous_position],
          });
          break;
        case "stop_movement":
          const current_direction = player.position.previous_position;
          player.fireEvent("animation-stop", {
            stop_key: this.idle_animation[current_direction],
          });
          break;
        default:
          break;
      }
    });
    // this.player.forEach((player) => {
    //   const phaser_ref = player.phaserData.phaser_ref;
    //   if (phaser_ref) {
    //     if (input_manager.keys.move_left.isDown) {
    //       player.phaserData.phaser_ref.anims.play("lufia-left-walk", true);
    //     } else if (input_manager.keys.move_down.isDown) {
    //       player.phaserData.phaser_ref.anims.play("lufia-front-walk", true);
    //     } else if (input_manager.keys.move_right.isDown) {
    //       player.phaserData.phaser_ref.anims.play("lufia-right-walk", true);
    //     } else if (input_manager.keys.move_up.isDown) {
    //       player.phaserData.phaser_ref.anims.play("lufia-back-walk", true);
    //     } else if (input_manager.keys.attack.isDown) {
    //       const direction = player.position.previous_position;
    //       switch (direction) {
    //         case "up":
    //           player.fireEvent("animation-start", { key: "lufia-back-slash" });
    //           break;
    //         case "down":
    //           player.fireEvent("animation-start", { key: "lufia-front-slash" });
    //           break;
    //         case "left":
    //           player.fireEvent("animation-start", { key: "lufia-left-slash" });
    //           break;
    //         case "right":
    //           player.fireEvent("animation-start", { key: "lufia-right-slash" });
    //           break;
    //         default:
    //           console.log("no valid direction");
    //           break;
    //       }
    //     } else {
    //       player.phaserData.phaser_ref.anims.stop();
    //     }
    //   }
    // });
  }

  getStopFrameKey(direction) {
    return;
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
