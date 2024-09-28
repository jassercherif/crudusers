// src/components/Modal.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../components/Modal';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockAxios = new MockAdapter(axios);

describe('Modal Component', () => {
  it('updates a user', async () => {
    const user = { _id: '1', Firstname: 'John', Lastname: 'Doe', Email: 'john@example.com', Age: 30 };
    const handleUpdate = jest.fn();

    render(<Modal user={user} onUpdate={handleUpdate} />);

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Smith' } });

    mockAxios.onPut(`http://localhost:3700/api/users/${user._id}`).reply(200);

    fireEvent.click(screen.getByText(/Update User/i));

    expect(handleUpdate).toHaveBeenCalledWith({ ...user, Firstname: 'Jane', Lastname: 'Smith' });
  });
});
