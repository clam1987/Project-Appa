import { useState, useEffect, useRef } from "react";
import Phaser from "phaser";
import ECS from "../../ecs";
import config from "../../utils/configs";
import Senia_Config from "../../game/Senia/Senia.json";
import World from "../../ecs/core/World";

const GameRender = () => {
  const game_ref = useRef(null);
  const [game_config, setGameConfig] = useState<any>(null);

  useEffect(() => {
    setGameConfig(Senia_Config);
  }, []);

  useEffect(() => {
    if (!game_config) return;

    const world = new World(game_config);

    const scenes = game_config.data.scenes.map(
      (scene: { name: string; prefabs: [] }) => scene.name
    );
    console.log(scenes);
  }, [game_config]);

  if (!game_config) return <h1>Loading game config</h1>;
  console.log(game_config);
  return <></>;
};

export default GameRender;
