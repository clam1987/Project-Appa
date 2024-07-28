import { Component } from "geotic";

export class Animation extends Component {
  static properties = {
    play: false,
    loop: false,
    finished: true,
  };

  constructor({ type }) {
    super();

    this.type = "" || type;
  }

  onAnimationMovementStart(evt) {
    if (!this.play) {
      const { key } = evt.data;
      const anims = this.entity.phaserData.phaser_ref.anims;

      if (anims) {
        this.play = true;
        this.finished = false;
        anims.play(key, true);
        evt.handle();
      }
    }
  }

  onAnimationActionStart(evt) {
    if (!this.play) {
      const { key } = evt.data;
      const anims = this.entity.phaserData.phaser_ref.anims;

      if (anims) {
        this.play = true;
        this.finished = false;
        anims.play(key, true).on("animationcomplete", () => {
          if (this?.entity) {
            if (evt.data?.stop_key) {
              this.entity.fireEvent("animation-stop", {
                stop_key: evt.data.stop_key,
              });
            } else {
              this.entity.fireEvent("animation-stop");
            }
          }
        });
        evt.handle();
      }
    }
  }

  onAnimationStop(evt) {
    const anims = this.entity.phaserData.phaser_ref.anims;
    if (anims) {
      anims.stop();
      this.play = false;
      if (evt.data?.stop_key) {
        const key = this.entity.phaserData.key;
        this.entity.phaserData.phaser_ref.setTexture(key, evt.data.stop_key);
      }
      this.entity.fireEvent("animation-complete");
      evt.handle();
    }
  }

  onAnimationComplete(evt) {
    this.finished = true;
    this.entity.fireEvent("action-complete");
    this.entity.remove(this);
    evt.handle();
  }
}
