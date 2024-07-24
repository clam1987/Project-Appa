import { useState, useEffect } from "react";
import Senia_Config from "../../game/Senia/Senia.json";
import Game from "../../ecs/core/Game";

const GameRender = () => {
  const [game_config, setGameConfig] = useState<any>(null);

  useEffect(() => {
    setGameConfig(Senia_Config);
  }, []);

  useEffect(() => {
    if (!game_config) return;

    const game_cartridge = new Game(game_config);

    return () => {
      if (game_cartridge) game_cartridge.destroy();
    };
  }, [game_config]);

  return <div id="game-container" style={{ border: "1px solid black" }} />;
};

export default GameRender;
