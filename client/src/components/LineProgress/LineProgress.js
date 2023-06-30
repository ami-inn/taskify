import React from 'react';

function LineProgress({ project }) {
  const completedTasks = project.tasks.filter((task) => task.completed);
  const completionPercentage = (completedTasks.length / project.tasks.length) * 100;
  console.log(completionPercentage,'complere jfadsfjdpop-j peprj');

  // Define color ranges and corresponding class names
  let colorClass;
  if (completionPercentage <= 25) {
    colorClass = 'bg-danger';
  } else if (completionPercentage <= 50) {
    colorClass = 'bg-warning';
  } else if (completionPercentage <= 75) {
    colorClass = 'bg-info';
  } else {
    colorClass = 'bg-success';
  }

  const progressStyle = {
    transition: 'width 2s ease 0s',
    width: `${completionPercentage}%`,
  };

  return (
    <div className={`iq-progress-bar ${colorClass}-light mb-4`}>
      <span className={`iq-progress progress-1 ${colorClass}`} data-percent={completionPercentage} style={progressStyle} />
    </div>
  );
}

export default LineProgress;
