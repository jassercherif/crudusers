/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"  // Use babel-jest to transform files
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['/home/ss/work/dev/devweb/react/prj1/tailo/haaa/cryou/mt/client/setupTests.ts'],

};

module.exports = config;