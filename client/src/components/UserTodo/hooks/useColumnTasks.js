import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

// import { debug } from '../utils/logging';

import useTaskCollection from './useTaskCollection';
import {swap} from '../hooks/helpers'

const MAX_TASK_PER_COLUMN = 100;

function useColumnTasks(column) {
  const [tasks, setTasks] = useTaskCollection();

  const colors = [
    '#coecf7',
    '#f4ccda',
    '#d7bdcd',
    '#fbf393',
    '#fcdcdf',
    '#feffbf',
    '#83d9dc',
    '#c997c6',
    '#bfd8d1',
  ];
  
  

  function pickRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }


  const columnTasks = tasks[column];
  console.log(columnTasks,'column tasks');

  const addEmptyTask = useCallback(() => {
    // debug(`Adding new empty task to ${column} column`);
    setTasks((allTasks) => {
      const columnTasks = allTasks[column];

      if (columnTasks.length > MAX_TASK_PER_COLUMN) {
        // debug('Too many task!');
        return allTasks;
      }

      const newColumnTask = {
        id: uuidv4(),
        title: `New ${column} task`,
        color: pickRandomColor(),
        column,
      };

      return {
        ...allTasks,
        [column]: [newColumnTask, ...columnTasks],
      };
    });
  }, [column, setTasks]);

  const deleteTask = useCallback(
    (id) => {
    //   debug(`Removing task ${id}..`);
      setTasks((allTasks) => {
        const columnTasks = allTasks[column];
        return {
          ...allTasks,
          [column]: columnTasks.filter((task) => task.id !== id),
        };
      });
    },
    [column, setTasks],
  );

  const updateTask = useCallback(
    (id, updatedTask) => {
    //   debug(`Updating task ${id} with ${JSON.stringify(updateTask)}`);
      setTasks((allTasks) => {
        const columnTasks = allTasks[column];
        return {
          ...allTasks,
          [column]: columnTasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task,
          ),
        };
      });
    },
    [column, setTasks],
  );

  const dropTaskFrom = useCallback(
    (from, id) => {
      setTasks((allTasks) => {
        const fromColumnTasks = allTasks[from];
        const toColumnTasks = allTasks[column];
        const movingTask = fromColumnTasks.find((task) => task.id === id);

        console.log(`Moving task ${movingTask?.id} from ${from} to ${column}`);

        if (!movingTask) {
          return allTasks;
        }

        // remove the task from the original column and copy it within the destination column
        return {
          ...allTasks,
          [from]: fromColumnTasks.filter((task) => task.id !== id),
          [column]: [{ ...movingTask, column }, ...toColumnTasks],
        };
      });
    },
    [column, setTasks],
  );

  const swapTasks = useCallback(
    (i, j) => {
    //   debug(`Swapping task ${i} with ${j} in ${column} column`);
      setTasks((allTasks) => {
        const columnTasks = allTasks[column];
        return {
          ...allTasks,
          [column]: swap(columnTasks, i, j),
        };
      });
    },
    [column, setTasks],
  );

  return {
    tasks: columnTasks,
    addEmptyTask,
    updateTask,
    dropTaskFrom,
    deleteTask,
    swapTasks,
  };
}

export default useColumnTasks;
