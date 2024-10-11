import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [title, setTitle] = useState('');

  // Load notes from local storage when the component mounts
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    console.log("Loaded notes from local storage:", storedNotes); // Debug log
    setNotes(storedNotes);
  }, []);

  // Save notes to local storage whenever they change, but avoid saving an empty array on the first load
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('notes', JSON.stringify(notes));
      console.log("Notes saved to local storage:", notes); // Debug log
    }
  }, [notes]);

  // Add a new note
  const handleAddNote = () => {
    if (title.trim() && newNote.trim()) {
      const updatedNotes = [...notes, { title, content: newNote }];
      setNotes(updatedNotes);

      // Clear input fields
      setNewNote('');
      setTitle('');
    } else {
      alert("Title and note content cannot be empty!");
    }
  };

  // Delete a note
  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <Card className='p-1 mb-6'>
      <h2 className='text-xl font-bold mb-4 text-center rounded-md border-[3px] border-[#41767c]'>Add Your Notes</h2>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter note title"
        className='mb-2'
      />
      <Textarea
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="Write your note here..."
        className={`mb-4 ${notes.length === 0 ? 'h-[260px]' : 'h-[120px]'}`}
      />
      <div className='text-center'>
        <Button variant='blue' onClick={handleAddNote} className='mb-4'>
          Add Note
        </Button>
      </div>
      <div className='max-h-[180px] overflow-y-auto'>
        {notes.map((note, index) => (
          <Card key={index} className='mb-3 p-3'>
            <h3 className='text-lg font-semibold text-center'>{note.title}</h3>
            <p>{note.content}</p>
            <div className='text-center'>
              <Button variant="destructive" onClick={() => handleDeleteNote(index)}>
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default Notes;
