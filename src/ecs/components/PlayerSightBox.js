import { Component } from "geotic";

export class PlayerSightBox extends Component {
  constructor() {
    super();

    this.player_sight_box = null;
    this.attached = false;
  }

  onAttachSightBox(evt) {
    const { rect } = evt.data;
    this.player_sight_box = rect;
    this.attached = true;
    evt.handle();
  }

  onUpdateSightBoxPosition(evt) {
    const { x, y } = evt.data;
    if (this.player_sight_box) {
      this.player_sight_box.setPosition(
        x - this.player_sight_box.width,
        y - this.player_sight_box.height
      );
    }
  }
}
