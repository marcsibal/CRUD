// src/mocks/note.model.mock.ts
export const mockNoteModel = {
    // Define mock methods here
    find: jest.fn().mockResolvedValue([]), // Mock for find method
    findOne: jest.fn().mockResolvedValue({ title: 'Test Note', content: 'Content', userEmail: 'test@example.com' }),
    create: jest.fn().mockResolvedValue({ title: 'Test Note', content: 'Content', userEmail: 'test@example.com' }),
    findOneAndUpdate: jest.fn().mockResolvedValue({ title: 'Updated Note', content: 'Updated Content', userEmail: 'test@example.com' }),
    findOneAndDelete: jest.fn().mockResolvedValue({ title: 'Deleted Note', content: 'Deleted Content', userEmail: 'test@example.com' }),
  };
  