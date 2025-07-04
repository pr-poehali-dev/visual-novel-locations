import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Character {
  id: number;
  name: string;
  description: string;
  friendship: number;
  avatar: string;
  traits: string[];
}

const Index = () => {
  const [currentView, setCurrentView] = useState<
    "home" | "characters" | "game"
  >("home");
  const [characters, setCharacters] = useState<Character[]>([
    {
      id: 1,
      name: "Зара",
      description: "Хакер и исследователь виртуальных миров",
      friendship: 75,
      avatar: "🦾",
      traits: ["Смелая", "Умная", "Загадочная"],
    },
    {
      id: 2,
      name: "Киберкот",
      description: "ИИ-компаньон с кошачьими повадками",
      friendship: 60,
      avatar: "🐱",
      traits: ["Игривый", "Хитрый", "Верный"],
    },
    {
      id: 3,
      name: "Нео",
      description: "Программист-rebel против системы",
      friendship: 40,
      avatar: "👨‍💻",
      traits: ["Серьезный", "Принципиальный", "Мудрый"],
    },
  ]);

  const [puzzle, setPuzzle] = useState({
    sequence: [1, 2, 3, 4],
    userInput: [] as number[],
    completed: false,
  });

  const handleSequenceClick = (num: number) => {
    const newInput = [...puzzle.userInput, num];
    if (newInput.length <= puzzle.sequence.length) {
      setPuzzle({
        ...puzzle,
        userInput: newInput,
        completed:
          newInput.length === puzzle.sequence.length &&
          newInput.every((val, idx) => val === puzzle.sequence[idx]),
      });
    }
  };

  const resetPuzzle = () => {
    setPuzzle({
      ...puzzle,
      userInput: [],
      completed: false,
    });
  };

  const increaseFriendship = (characterId: number) => {
    setCharacters((prev) =>
      prev.map((char) =>
        char.id === characterId
          ? { ...char, friendship: Math.min(100, char.friendship + 10) }
          : char,
      ),
    );
  };

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-novel-dark via-novel-purple to-novel-pink relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url('/img/97d6b1b0-3b61-4bc1-baee-3289ffa5dd03.jpg')`,
        }}
      />

      {/* Glitch effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-novel-pink/10 to-transparent animate-pulse" />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="text-center space-y-8 max-w-2xl">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-novel-light font-mono tracking-wider">
              ViRuS
              <span className="text-novel-pink animate-pulse">_</span>
            </h1>
            <p className="text-xl text-novel-light/80 font-light">
              Интерактивная визуальная новелла
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setCurrentView("game")}
              className="bg-novel-pink hover:bg-novel-pink/80 text-white px-8 py-6 text-lg font-semibold tracking-wide transition-all duration-300 hover:scale-105"
            >
              <Icon name="Play" className="mr-2" />
              Играть
            </Button>

            <Button
              onClick={() => setCurrentView("characters")}
              variant="outline"
              className="border-novel-light text-novel-light hover:bg-novel-light hover:text-novel-dark px-8 py-6 text-lg font-semibold tracking-wide transition-all duration-300 hover:scale-105"
            >
              <Icon name="Users" className="mr-2" />
              Персонажи
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCharacters = () => (
    <div className="min-h-screen bg-novel-dark p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => setCurrentView("home")}
            variant="ghost"
            className="text-novel-light hover:text-novel-pink"
          >
            <Icon name="ArrowLeft" className="mr-2" />
            Назад
          </Button>
          <h1 className="text-4xl font-bold text-novel-light font-mono">
            Галерея персонажей
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((character) => (
            <Card
              key={character.id}
              className="bg-novel-dark/50 border-novel-purple hover:border-novel-pink transition-all duration-300 hover:scale-105"
            >
              <CardHeader className="text-center">
                <div className="text-6xl mb-4">{character.avatar}</div>
                <CardTitle className="text-novel-light text-xl">
                  {character.name}
                </CardTitle>
                <CardDescription className="text-novel-light/70">
                  {character.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-novel-light/80 text-sm">Дружба</span>
                    <span className="text-novel-pink font-semibold">
                      {character.friendship}%
                    </span>
                  </div>
                  <Progress value={character.friendship} className="h-2" />
                </div>

                <div className="flex flex-wrap gap-2">
                  {character.traits.map((trait, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-novel-purple/20 text-novel-light"
                    >
                      {trait}
                    </Badge>
                  ))}
                </div>

                <Button
                  onClick={() => increaseFriendship(character.id)}
                  className="w-full bg-novel-emerald hover:bg-novel-emerald/80 text-white"
                  disabled={character.friendship >= 100}
                >
                  <Icon name="Heart" className="mr-2" />
                  Взаимодействовать
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGame = () => (
    <div className="min-h-screen bg-novel-dark p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => setCurrentView("home")}
            variant="ghost"
            className="text-novel-light hover:text-novel-pink"
          >
            <Icon name="ArrowLeft" className="mr-2" />
            Назад
          </Button>
          <h1 className="text-4xl font-bold text-novel-light font-mono">
            Головоломка
          </h1>
        </div>

        <Card className="bg-novel-dark/50 border-novel-purple">
          <CardHeader>
            <CardTitle className="text-novel-light text-2xl">
              Взломай код последовательности
            </CardTitle>
            <CardDescription className="text-novel-light/70">
              Повтори последовательность: {puzzle.sequence.join(" → ")}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((num) => (
                <Button
                  key={num}
                  onClick={() => handleSequenceClick(num)}
                  className="h-16 text-2xl bg-novel-purple hover:bg-novel-pink transition-all duration-300"
                  disabled={puzzle.completed}
                >
                  {num}
                </Button>
              ))}
            </div>

            <div className="space-y-4">
              <div className="text-novel-light">
                <strong>Ваш ввод:</strong> {puzzle.userInput.join(" → ")}
              </div>

              {puzzle.completed && (
                <div className="text-novel-emerald text-xl font-semibold animate-pulse">
                  <Icon name="CheckCircle" className="inline mr-2" />
                  Головоломка решена! +10 очков дружбы с Зарой
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  onClick={resetPuzzle}
                  variant="outline"
                  className="border-novel-light text-novel-light hover:bg-novel-light hover:text-novel-dark"
                >
                  <Icon name="RotateCcw" className="mr-2" />
                  Сброс
                </Button>

                {puzzle.completed && (
                  <Button
                    onClick={() => increaseFriendship(1)}
                    className="bg-novel-emerald hover:bg-novel-emerald/80 text-white"
                  >
                    <Icon name="Gift" className="mr-2" />
                    Получить награду
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="font-mono">
      {currentView === "home" && renderHome()}
      {currentView === "characters" && renderCharacters()}
      {currentView === "game" && renderGame()}
    </div>
  );
};

export default Index;
