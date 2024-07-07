import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";

export function SimpleRegistrationForm() {
  const [user, setUser] = useState({
    Firstname: '',
    Lastname: '',
    Email: '',
    Age: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3700/api/users`, user);
      // Reset form fields after successful submission
      setUser({
        Firstname: '',
        Lastname: '',
        Email: '',
        Age: ''
      });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" className="text-blue-600">
          ADD USER
        </Typography>
        <br />
        <Typography className="mt-1 font-normal">
          Nice to meet you! Enter the user's details.
        </Typography>
        <br />
        <form className="mt-8 mb-2 w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <Typography variant="h6" color="gray">
              FirstName
            </Typography>
            <Input
              size="lg"
              placeholder="Enter your first name"
              className="mt-2"
              name="Firstname"
              value={user.Firstname}
              onChange={handleChange}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div className="mb-4">
            <Typography variant="h6" color="gray">
              LastName
            </Typography>
            <Input
              size="lg"
              placeholder="Enter your last name"
              className="mt-2"
              name="Lastname"
              value={user.Lastname}
              onChange={handleChange}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div className="mb-4">
            <Typography variant="h6" color="gray">
              Email
            </Typography>
            <Input
              size="lg"
              type="email"
              placeholder="Enter your email"
              className="mt-2"
              name="Email"
              value={user.Email}
              onChange={handleChange}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div className="mb-4">
            <Typography variant="h6" color="gray">
              Age
            </Typography>
            <Input
              size="lg"
              type="number"
              placeholder="Enter your age"
              className="mt-2"
              name="Age"
              value={user.Age}
              onChange={handleChange}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <br />
          <Button className="mt-6 bg-blue-500 hover:bg-blue-700 text-white" fullWidth type="submit">
            Submit
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Return to home page{" "}
            <a href="/" className="font-medium text-gray-900">
              Home
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
