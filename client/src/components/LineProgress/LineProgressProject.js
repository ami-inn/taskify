import React from 'react';

function LineProgressProject({ projects }) {
  // Calculate the completion percentage
  const totalProjects = projects.length;
  const completedProjects = projects.filter(project => project.status === 'completed').length;
  const completionPercentage = (completedProjects / totalProjects) * 100;

  // Determine the color class based on the completion percentage
  let colorClass = '';
  if (completionPercentage < 50) {
    colorClass = 'low-progress';
  } else if (completionPercentage < 80) {
    colorClass = 'medium-progress';
  } else {
    colorClass = 'high-progress';
  }

  // Style for the progress bar
  const progressStyle = {
    width: `${completionPercentage}%`,
  };

  return (
  <>

<div className="d-flex align-items-center justify-content-between mt-1">
                <p className="mb-0">in progress</p>
                <span className="text-primary">{completionPercentage}%</span>
              </div>
 
    <div className={`iq-progress-bar ${colorClass}-light mb-4`}>
      <span className={`iq-progress progress-1 ${colorClass}`} data-percent={completionPercentage} style={progressStyle} />
    </div>

    </>
  );
}

export default LineProgressProject;
