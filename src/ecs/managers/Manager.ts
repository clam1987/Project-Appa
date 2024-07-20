export default class Manager {
  private _game: any;

  get game(): any {
    return this._game;
  }

  constructor(game: any) {
    this._game = game;
  }
}
