export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRunner: "jest-circus/runner",
    globals: { "__DEV__": true },
    transform: {},
    extensionsToTreatAsEsm: [".ts"],
    
    
  };