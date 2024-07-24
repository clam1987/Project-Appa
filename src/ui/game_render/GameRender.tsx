import { useState, useEffect, useRef } from "react";
import Senia_Config from "../../game/Senia/Senia.json";
import Game from "../../ecs/core/Game";

const GameRender = () => {
  const [game_config, setGameConfig] = useState<any>(null);
  const canvas_ref = useRef(null);

  useEffect(() => {
    setGameConfig(Senia_Config);
  }, []);

  useEffect(() => {
    if (!game_config) return;

    const game_cartridge = new Game(game_config, canvas_ref);

    return () => {
      if (game_cartridge) game_cartridge.destroy();
    };
  }, [game_config]);

  return (
    <div id="game-container" style={{ display: "block" }} ref={canvas_ref} />
  );
};

export default GameRender;
