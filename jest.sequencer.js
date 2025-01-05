// jest.sequencer.js

class CustomTestSequencer {
  sort(tests) {
    // Your custom logic to order the tests goes here
    return tests.sort((testA, testB) => {
      // You can compare test names, file paths, etc.
      return testA.path.localeCompare(testB.path);
    });
  }
}

module.exports = CustomTestSequencer;
