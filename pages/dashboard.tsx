import React, { useState } from 'react';

interface Chore {
  id: number;
  name: string;
  rating: number;
  assignedTo: string | null;
}

interface User {
  id: number;
  name: string;
}

const ChoresManager: React.FC = () => {
  const [chores, setChores] = useState<Chore[]>([]);
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ]);
  const [choreName, setChoreName] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  // Add a new chore
  const handleAddChore = () => {
    if (!choreName.trim()) return alert('Chore name cannot be empty');
    const newChore: Chore = {
      id: Date.now(),
      name: choreName.trim(),
      rating: 0,
      assignedTo: selectedUser,
    };
    setChores([...chores, newChore]);
    setChoreName('');
    setSelectedUser(null);
  };

  // Rate a chore
  const handleRateChore = (id: number, rating: number) => {
    setChores((prevChores) =>
      prevChores.map((chore) =>
        chore.id === id ? { ...chore, rating } : chore
      )
    );
  };

  // Delete a chore
  const handleDeleteChore = (id: number) => {
    setChores((prevChores) => prevChores.filter((chore) => chore.id !== id));
  };

  // Assign a user to a chore
  const handleAssignUser = (id: number, userId: string) => {
    setChores((prevChores) =>
      prevChores.map((chore) =>
        chore.id === id ? { ...chore, assignedTo: userId } : chore
      )
    );
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Chores Manager</h1>

      {/* Add Chore */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter chore name"
          value={choreName}
          onChange={(e) => setChoreName(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        />
        <select
          value={selectedUser || ''}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >
          <option value="">Assign to...</option>
          {users.map((user) => (
            <option key={user.id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddChore}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Add Chore
        </button>
      </div>

      {/* Chores List */}
      <div className="w-full max-w-xl">
        {chores.length === 0 ? (
          <p className="text-gray-600">No chores yet. Add one above!</p>
        ) : (
          <ul className="space-y-4">
            {chores.map((chore) => (
              <li
                key={chore.id}
                className="flex justify-between items-center border p-4 rounded-lg"
              >
                <div>
                  <h3 className="font-bold">{chore.name}</h3>
                  <p className="text-sm text-gray-600">
                    Assigned to: {chore.assignedTo || 'Unassigned'}
                  </p>
                  <p className="text-sm text-gray-600">Rating: {chore.rating}</p>
                </div>
                <div className="flex items-center gap-4">
                  {/* Rate chore */}
                  <select
                    value={chore.rating}
                    onChange={(e) =>
                      handleRateChore(chore.id, parseInt(e.target.value))
                    }
                    className="border px-2 py-1 rounded-lg"
                  >
                    <option value="0">Rate</option>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <option key={rating} value={rating}>
                        {rating}
                      </option>
                    ))}
                  </select>

                  {/* Assign user */}
                  <select
                    value={chore.assignedTo || ''}
                    onChange={(e) => handleAssignUser(chore.id, e.target.value)}
                    className="border px-2 py-1 rounded-lg"
                  >
                    <option value="">Assign</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.name}>
                        {user.name}
                      </option>
                    ))}
                  </select>

                  {/* Delete chore */}
                  <button
                    onClick={() => handleDeleteChore(chore.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ChoresManager;
