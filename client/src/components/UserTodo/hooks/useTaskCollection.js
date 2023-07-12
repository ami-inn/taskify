import { useLocalStorage } from 'usehooks-ts';
import { v4 as uuidv4 } from 'uuid';


function useTaskCollection(workspaceId) {

  const storageKey = `tasks_${workspaceId}`;
  
  return useLocalStorage(storageKey, {
    ['Todo']: [
      {
        id: uuidv4(),
        column: 'Todo',
        title: 'Task 1',
        color: 'blue.300',
      },
    ],
    ['In Progress']: [
      {
        id: uuidv4(),
        column: 'In Progress',
        title: 'Task 2',
        color: 'yellow.300',
      },
    ],
    ['Blocked']: [
      {
        id: uuidv4(),
        column: 'Blocked',
        title: 'Task 3',
        color: 'red.300',
      },
    ],
    ['Completed']: [
      {
        id: uuidv4(),
        column: 'Completed',
        title: 'Task 4',
        color: 'green.300',
      },
    ],
  });
}

export default useTaskCollection;
