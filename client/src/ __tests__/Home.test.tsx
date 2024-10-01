import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../pages/Home'; // Assurez-vous que le chemin d'importation est correct
import axios from 'axios';

// Mock Axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Home Component', () => {
  const mockUsers = [
    {
      _id: '1',
      Firstname: 'John',
      Lastname: 'Doe',
      Email: 'john@example.com',
      Age: 30,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: '2',
      Firstname: 'Jane',
      Lastname: 'Doe',
      Email: 'jane@example.com',
      Age: 25,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    mockedAxios.get.mockReset();
    mockedAxios.delete.mockReset();
  });

  it('fetches and displays users', async () => {
    // Mock the GET request
    mockedAxios.get.mockResolvedValueOnce({ data: mockUsers });

    render(<Home />);

    // Vérifiez que les utilisateurs sont affichés
    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Jane')).toBeInTheDocument();
    });
  });

  it('deletes a user', async () => {
    // Mock the GET request
    mockedAxios.get.mockResolvedValueOnce({ data: mockUsers });

    render(<Home />);

    // Attendre que les utilisateurs soient affichés
    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
    });

    // Mock the DELETE request
    mockedAxios.delete.mockResolvedValueOnce({});

    // Simuler le clic sur le bouton de suppression
    const deleteButton = screen.getByTitle('Delete John'); // Assurez-vous que le bouton de suppression a un title approprié
    fireEvent.click(deleteButton);

    // Vérifiez que l'utilisateur est supprimé de l'affichage
    await waitFor(() => {
      expect(screen.queryByText('John')).not.toBeInTheDocument();
    });
  });
});
