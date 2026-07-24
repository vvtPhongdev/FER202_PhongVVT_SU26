export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': './__mocks__/styleMock.js',
    '\\.(png|jpg|jpeg|gif|svg|webp)$': './__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
}




