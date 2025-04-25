import { useState, useEffect } from "react";

function GameLab() {
  const [data] = useState([
    ["Egypt", "Cairo"],
    ["France", "Paris"],
    ["UK", "London"],
  ]);

  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);

  // Initialize and shuffle cards
  useEffect(() => {
    const flatData = data.flat();
    const shuffled = [...flatData].sort(() => Math.random() - 0.5);

    // Create card objects with values and their original pairs
    const cardObjects = shuffled.map((value) => {
      // Find which pair this card belongs to
      const pairIndex = data.findIndex((pair) => pair.includes(value));
      return {
        value,
        pairId: pairIndex,
      };
    });

    setCards(cardObjects);
  }, [data]);

  function handleCardClick(card, index) {
    // Prevent clicking on already matched or selected cards
    if (
      matchedPairs.includes(card.pairId) ||
      selectedCards.find((c) => c.index === index)
    ) {
      return;
    }

    // Allow selecting up to 2 cards
    if (selectedCards.length < 2) {
      const newSelectedCards = [...selectedCards, { ...card, index }];
      setSelectedCards(newSelectedCards);

      // Check for a match when 2 cards are selected
      if (newSelectedCards.length === 2) {
        const [firstCard, secondCard] = newSelectedCards;

        // If the pair IDs match and the cards are different (not the same card clicked twice)
        if (
          firstCard.pairId === secondCard.pairId &&
          firstCard.index !== secondCard.index
        ) {
          // Found a match! Add to matched pairs
          setMatchedPairs([...matchedPairs, firstCard.pairId]);
          setTimeout(() => setSelectedCards([]), 500);
        } else {
          // No match, clear selection after a delay
          setTimeout(() => setSelectedCards([]), 1000);
        }
      }
    }
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {cards.map((card, index) => {
        if (matchedPairs.includes(card.pairId)) {
          return (
            <div
              key={index}
              className="p-4 rounded-md text-center bg-transparent"
            />
          );
        }
        return (
          <button
            key={index}
            className={`p-4 rounded-md text-center
                ${
                  selectedCards.find((c) => c.index === index)
                    ? "bg-blue-900"
                    : "bg-red-700"
                }
              `}
            onClick={() => handleCardClick(card, index)}
          >
            {card.value}
          </button>
        );
      })}
    </div>
  );
}

export default GameLab;
