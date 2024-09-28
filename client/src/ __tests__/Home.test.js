// src/pages/Home.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../pages/Home';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockAxios = new MockAdapter(axios);

describe('Home Component', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('fetches and displays users', async () => {
    mockAxios.onGet('http://localhost:3700/api/users').reply(200, [
      { _id: '1', Firstname: 'John', Lastname: 'Doe', Email: 'john@example.com', Age: 30, createdAt: new Date(), updatedAt: new Date() },
    ]);

    render(<Home />);

    expect(await screen.findByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
  });

  it('deletes a user', async () => {
    mockAxios.onGet('http://localhost:3700/api/users').reply(200, [
      { _id: '1', Firstname: 'John', Lastname: 'Doe', Email: 'john@example.com', Age: 30, createdAt: new Date(), updatedAt: new Date() },
    ]);
    mockAxios.onDelete('http://localhost:3700/api/users/1').reply(200);

    render(<Home />);
    
    const deleteButton = await screen.findByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    await waitFor(() => expect(screen.queryByText('John')).not.toBeInTheDocument());
  });
});
