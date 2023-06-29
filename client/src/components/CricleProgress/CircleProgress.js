import React from 'react'

function CircleProgress({project}) {
  console.log('projextt',project);
  const { tasks } = project;
  const totalTasks = tasks.length;
  console.log('tasklengthhh' , totalTasks);
  const completedTasks = tasks.filter(task => task.approvalStatus).length;
  console.log(completedTasks,'completede tasksks');
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  // Calculate the stroke dash offset based on the progress value
  const radius = 47;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress / 100);

  // Calculate the end angle of the arc based on the progress value
const endAngle = (progress / 100) * 2 * Math.PI;

// Calculate the coordinates of the end point of the arc
const endX = 50 + radius * Math.sin(endAngle);
const endY = 50 - radius * Math.cos(endAngle);

  return (
  //   <svg width="100" height="100" viewBox="0 0 100 100" className="circle-progress">
  //   <circle className="circle-progress-circle" cx="50" cy="50" r="47" fill="none" stroke="#ddd" strokeWidth="8"></circle>
  //   <path d="M 50 3 A 47 47 0 0 1 97 50" className="circle-progress-value" fill="none" stroke="#00E699" strokeWidth="8"></path>
  //   <text className="circle-progress-text" x="50" y="50" font="16px Arial, sans-serif" textAnchor="middle" fill="#999" dy="0.4em">25%</text>
  // </svg>
<svg version="1.1" width="100" height="100" viewBox="0 0 100 100" className="circle-progress">
  <circle className= {`circle-progress-circle ${progress <= 25 ? 'color-red-circle' : (progress <= 50 ? 'color-blue-circle' : (progress <= 75 ? 'color-yellow-circle' : 'color-green-circle'))}`} cx="50" cy="50" r={radius} fill="none" stroke="#ddd" strokeWidth="8" />
  <path
    d={`M 50 3 A ${radius} ${radius} 0 ${progress <= 50 ? '0' : '1'} 1 ${50 + radius * Math.sin(endAngle)} ${50 - radius * Math.cos(endAngle)}`}

    className={`circle-progress-value ${progress <= 25 ? 'color-red' : (progress <= 50 ? 'color-blue' : (progress <= 75 ? 'color-yellow' : 'color-green'))}`}

    fill="none"
    stroke="#00E699"
    strokeWidth="8"
    strokeDasharray={circumference}
    strokeDashoffset={strokeDashoffset}
  />
  <text
     className={`circle-progress-text ${progress <= 25 ? 'color-red-text' : (progress <= 50 ? 'color-yellow-text' : 'color-green-text')}`}
    x="50"
    y="50"
    fontFamily="Arial, sans-serif"
    fontSize="16px"
    textAnchor="middle"
    fill="#999"
    dy="0.4em"
  >
     {Math.round(progress)}%
  </text>
</svg>

  )
}

export default CircleProgress


