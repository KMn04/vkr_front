import React from 'react';
import './styles.css'

interface WikiDirectoryProps {
  projectId: number
}

const WikiDirectory: React.FC<WikiDirectoryProps> = () => {
  return (
    <div className="WikiDirectory">
      <div className="WikiDirectory__title">База знаний</div>
    </div>
  );
}

export default WikiDirectory; 