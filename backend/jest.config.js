export default {
    preset: 'ts-jest',
    testEnvironment: 'node',

    globals: { 'ts-jest': { "__DEV__": true } },
    transform: {},
    extensionsToTreatAsEsm: [".ts"]
  };