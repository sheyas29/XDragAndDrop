import { useState } from 'react';
import './App.css';

function App() {
  const [digits, setDigits] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index));
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = (e, index) => {
    if (dragOverIndex === index) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    setDigits((prevDigits) => {
      const updatedDigits = [...prevDigits];
      const [movedItem] = updatedDigits.splice(draggedIndex, 1);
      updatedDigits.splice(targetIndex, 0, movedItem);
      return updatedDigits;
    });

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <main className="app-card">
      <header className="card-header">
        <h1 className="card-title">Drag & Drop Digits</h1>
        <p className="card-description">Drag the boxes to reorder the digits 0–9.</p>
      </header>

      <section className="digits-grid" aria-label="Digits grid">
        {digits.map((digit, index) => {
          const isDragging = draggedIndex === index;
          const isDragOver = dragOverIndex === index && draggedIndex !== index;

          let boxClassName = 'digit-box';
          if (isDragging) boxClassName += ' is-dragging';
          if (isDragOver) boxClassName += ' is-drag-over';

          return (
            <div
              key={digit}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={(e) => handleDragLeave(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={boxClassName}
              data-index={index}
              aria-label={`Digit ${digit}`}
            >
              <span className="digit-value">{digit}</span>
            </div>
          );
        })}
      </section>

      <footer className="card-footer">
        <p className="tip-text">
          Tip: Try reordering to make <span className="code-pill">0123456789</span> or reverse it!
        </p>
      </footer>
    </main>
  );
}

export default App;
