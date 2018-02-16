import assert from 'assert';
import bluebird from 'bluebird';
import MachineDefinition from '../MachineDefinition';

const { Promise } = global;

describe('machine definition: findAvailableTransitions', function() {
  it("throws an error if 'from' is not specified", function() {
    return new MachineDefinition().findAvailableTransitions().then(() => {
      assert.equal("then method is called", "error is thrown", "it is expected that error is thrown")
    }).catch((e) => {
      assert(e, 'Error is thrown as expected')
    });
  });

  it("returns empty list if transition are not defined in machine schema", function() {
    // 0 transitions
    return new MachineDefinition().findAvailableTransitions({ from: 'anyState' }).then(({ transitions }) => {
      assert(transitions);
      assert.equal(transitions.length, 0);
    });
  });

  it("finds appropriate transitions for specified 'from' and 'event'", function() {
    const machineDefinition = new MachineDefinition(
      {
        schema: {
          transitions: [
            {
              from: 'a',
              to: 'b',
              event: 'a->b'
            },
            {
              from: 'b',
              to: 'c',
              event: 'b->c'
            },
            {
              from: 'a',
              to: 'c',
              event: 'a->c'
            }
          ]
        }
      }
    );
    return bluebird.Promise.all([
      machineDefinition.findAvailableTransitions({ from: 'a' }).then(({ transitions }) => {
        assert(transitions);
        assert.equal(transitions.length, 2);
      }),
      machineDefinition.findAvailableTransitions({
        from: 'a',
        event: 'a->b'
      }).then(({ transitions }) => {
        assert(transitions);
        assert.equal(transitions.length, 1);
      }),
      machineDefinition.findAvailableTransitions({
        from: 'a',
        event: 'a->c'
      }).then(({ transitions }) => {
        assert(transitions);
        assert.equal(transitions.length, 1);
      }),
      machineDefinition.findAvailableTransitions({
        from: 'a',
        event: 'a->a'
      }).then(({ transitions }) => {
        assert(transitions);
        assert.equal(transitions.length, 0);
      }),
      machineDefinition.findAvailableTransitions({ from: 'b' }).then(({ transitions }) => {
        assert(transitions);
        assert.equal(transitions.length, 1);
      }),
      machineDefinition.findAvailableTransitions({
        from: 'b',
        event: 'b->c'
      }).then(({ transitions }) => {
        assert(transitions);
        assert.equal(transitions.length, 1);
      }),
      machineDefinition.findAvailableTransitions({
        from: 'b',
        event: 'b->a'
      }).then(({ transitions }) => {
        assert(transitions);
        assert.equal(transitions.length, 0);
      })
    ]);
  });

  describe("'guarded' transitions", function() {
    const machineDefinition = new MachineDefinition(
      {
        schema: {
          transitions: [
            {
              from: 'a',
              to: 'b',
              event: 'a->b',
              guards: [
                {
                  name: 'a-to-b',
                  params: [
                    {
                      name: 'one',
                      value: 1
                    },
                    {
                      name: 'two',
                      value: 2
                    }
                  ]
                }
              ]
            },
            {
              from: 'b',
              to: 'c',
              event: 'b->c',
              guards: [
                {
                  name: 'unavailable'
                }
              ]
            },
            {
              from: 'c',
              to: 'd',
              event: 'c->d',
              guards: [
                {
                  name: 'less-than-max',
                  params: [
                    {
                      name: 'max',
                      value: 10
                    }
                  ]
                }
              ]
            },
            {
              from: 'd',
              to: 'e',
              event: 'd->e',
              guards: [
                {
                  name: 'less-than-max',
                  params: [
                    {
                      name: 'max',
                      value: 10
                    }
                  ],
                  negate: true
                }
              ]
            }
          ]
        },
        conditions: {
          'a-to-b': ({ object }) => {
            return object.enabled;
          },
          'less-than-max': ({ max, request }) => {
            const { value } = request;
            return value < max;
          }
        }
      });

    // todo: check exact transitions, not only array length
    it("guard forbids transition", function() {
      return machineDefinition.findAvailableTransitions({
        from: 'a',
        object: {
          enabled: false
        }
      }).then((result) => {
        return assert.equal(result.transitions.length, 0)
      });
    });

    it("guard permits transition", function() {
      return machineDefinition.findAvailableTransitions({
        from: 'a',
        object: {
          enabled: true
        }
      }).then((result) => {
        return assert.equal(result.transitions.length, 1)
      });
    });

    it("transition has reference to non declared guard(condition)", function() {
      return machineDefinition.findAvailableTransitions({
        from: 'b',
        object: {}
      }).catch((e) => {
        assert(e, 'Error is thrown as expected')
      });
    });

    it('check passing guard with passing request', (done) => {
      machineDefinition.findAvailableTransitions({
        from: 'c',
        object: {},
        request: {
          value: 1
        }
      }).then(({ transitions }) => {
        assert.equal(transitions.length, 1);
        assert.equal(transitions[0].event, 'c->d');
        assert.equal(transitions[0].from, 'c');
        assert.equal(transitions[0].to, 'd');
        done();
      })
    });

    it('check rejecting guard with passing request', (done) => {
      machineDefinition.findAvailableTransitions({
        from: 'c',
        object: {},
        request: {
          value: 11
        }
      }).then(({ transitions }) => {
        assert.equal(transitions.length, 0);
        done();
      })
    });

    it('negate guard permits transition', (done) => {
      machineDefinition.findAvailableTransitions({
        from: 'd',
        object: {},
        request: {
          value: 11
        }
      }).then(({ transitions }) => {
        assert.equal(transitions.length, 1);
        done();
      })
    });
  });

  describe("transitions with async 'guards'", () => {
    const machineDefinition = new MachineDefinition(
      {
        schema: {
          transitions: [
            {
              from: 'a',
              to: 'b',
              event: 'a->b',
              guards: [
                {
                  name: 'isEnabled'
                }
              ]
            },
            {
              from: 'b',
              to: 'c',
              event: 'b->c',
              guards: [
                {
                  name: 'undefined'
                }
              ]
            },
            {
              from: 'c',
              to: 'd',
              event: 'c->d',
              guards: [
                {
                  name: 'isEnabled',
                  negate: true
                }
              ]
            }
          ]
        },
        conditions: {
          'isEnabled': ({ object }) => {
            return new Promise((resolve, reject) => {
              if (object.enabled === undefined) {
                throw new Error("Invalid object");
              }

              if (object.shouldFail) {
                return reject(new Error("Invalid object"));
              }
              return object.enabled ? resolve(true) : resolve(false);
            })
          }
        }
      });

    it('find transition with async resolved guard', (done) => {
      machineDefinition.findAvailableTransitions({
        from: 'a',
        object: { enabled: true }
      }).then(({ transitions }) => {
        assert.equal(transitions.length, 1);
        done();
      })
    });

    it('find 0 transition with rejected guard', (done) => {
      machineDefinition.findAvailableTransitions({
        from: 'a',
        object: { enabled: false }
      }).then(({ transitions }) => {
        assert.equal(transitions.length, 0);
        done();
      })
    });

    it('find 0 transition with failing guard', (done) => {
      machineDefinition.findAvailableTransitions({
        from: 'a',
        object: {}
      }).catch((e) => {
        assert(e, 'Error is thrown as expected');
        done();
      })
    });

    it('find transition with negated not passing guard', (done) => {
      machineDefinition.findAvailableTransitions({
        from: 'c',
        object: { enabled: false }
      }).then(({ transitions }) => {
        assert.equal(transitions.length, 1);
        done();
      })
    });

    it('find transition with negated failing guard', (done) => {
      machineDefinition.findAvailableTransitions({
        from: 'c',
        object: {}
      }).catch((e) => {
        assert(e, 'Error is thrown as expected');
        done();
      });
    });

    it('find 0 transition when guard is rejected with error', (done) => {
      machineDefinition.findAvailableTransitions({
        from: 'a',
        object: { shouldFail: true }
      }).catch((e) => {
        assert(e, 'Error is thrown as expected');
        done();
      });
    });

    it('is rejected with error in case of undefined guard ', (done) => {
      machineDefinition.findAvailableTransitions({
        from: 'b',
      }).catch((e) => {
        assert(e, 'Error is thrown as expected');
        done();
      });
    });
  });

  describe("'automatic' transitions", () => {
    const machineDefinition = new MachineDefinition(
      {
        schema: {
          transitions: [
            {
              from: 'a',
              to: 'b',
              event: 'a2b',
              guards: [
                {
                  name: 'a2b-guard',
                  params: [
                    {
                      name: 'one',
                      value: 1
                    },
                    {
                      name: 'two',
                      value: 2
                    }
                  ]
                }
              ],
              automatic: [
                {
                  name: 'a2b-auto-guard',
                  params: [
                    {
                      name: 'one',
                      value: 1
                    },
                    {
                      name: 'two',
                      value: 2
                    }
                  ]
                }
              ]
            },
            {
              from: 'b',
              to: 'c',
              event: 'b2c',
              guards: [
                {
                  name: 'b2c-guard',
                  params: [
                    {
                      name: 'one',
                      value: 1
                    },
                    {
                      name: 'two',
                      value: 2
                    }
                  ]
                }
              ],
              automatic: [
                {
                  name: 'b2c-auto-guard',
                  params: [
                    {
                      name: 'one',
                      value: 1
                    },
                    {
                      name: 'two',
                      value: 2
                    }
                  ]
                }
              ]
            },
            {
              from: 'c',
              to: 'd',
              event: 'b2c',
              automatic: true
            },
            {
              from: 'd',
              to: 'f',
              event: 'd2f'
            },
            {
              from: 'f',
              to: 'g',
              event: 'f2g',
              automatic: [
                {
                  name: 'unavailable'
                }
              ]
            },
            {
              from: 'g',
              to: 'h',
              event: 'g2h',
              automatic: [
                {
                  name: 'g2h-auto-guard',
                  params: [
                    {
                      name: 'one',
                      value: 1
                    },
                    {
                      name: 'two',
                      value: 2
                    }
                  ],
                  negate: true
                }
              ]
            },
            {
              from: 'h',
              to: 'i',
              event: 'h2i',
              automatic: [
                {
                  name: 'h2i-auto-async-guard',
                  params: [
                    {
                      name: 'one',
                      value: 1
                    },
                    {
                      name: 'two',
                      value: 2
                    }
                  ]
                }
              ]
            }
          ]
        },
        conditions: {
          'a2b-guard': ({ object }) => {
            return true;
          },
          'a2b-auto-guard': ({ object }) => {
            return true
          },
          'b2c-guard': ({ object }) => {
            return true;
          },
          'b2c-auto-guard': ({ object }) => {
            return false
          },
          'g2h-auto-guard': ({ object }) => {
            return false
          },
          'h2i-auto-async-guard': ({ object }) => {
            return new Promise((resolve, reject) => typeof object.enabled === 'boolean' ?
              resolve(object.enabled) : reject(new Error()));
          }
        }
      });

    it("auto-guard permits transition", function() {
      return machineDefinition.findAvailableTransitions({
        from: 'a',
        object: {},
        isAutomatic: true
      }).then((result) => {
        return assert.equal(result.transitions.length, 1)
      });
    });

    it("guard-free check", function() {
      return machineDefinition.findAvailableTransitions({
        from: 'c',
        object: {},
        isAutomatic: true
      }).then((result) => {
        return assert.equal(result.transitions.length, 1)
      });
    });

    it("auto-guard forbids transition", function() {
      return machineDefinition.findAvailableTransitions({
        from: 'b',
        object: {},
        isAutomatic: true
      }).then((result) => {
        return assert.equal(result.transitions.length, 0)
      });
    });

    it("no transition is defined as automatic", function() {
      return machineDefinition.findAvailableTransitions({
        from: 'd',
        object: {},
        isAutomatic: true
      }).then((result) => {
        return assert.equal(result.transitions.length, 0)
      });
    });

    it("transition has reference to non declared automatic conditions", function() {
      return machineDefinition.findAvailableTransitions({
        from: 'f',
        object: {},
        isAutomatic: true
      }).catch((e) => {
        assert(e, 'Error is thrown as expected')
      });
    });

    it("negate auto-guard permits transition", function() {
      return machineDefinition.findAvailableTransitions({
        from: 'g',
        object: {},
        isAutomatic: true
      }).then((result) => {
        return assert.equal(result.transitions.length, 1)
      });
    });

    it("async auto-guard permits transition", () => {
      return machineDefinition.findAvailableTransitions({
        from: 'h',
        object: { enabled: true },
        isAutomatic: true
      }).then((result) => {
        return assert.equal(result.transitions.length, 1)
      });
    });

    it("async auto-guard rejects transition", () => {
      return machineDefinition.findAvailableTransitions({
        from: 'h',
        object: { enabled: false },
        isAutomatic: true
      }).then((result) => {
        return assert.equal(result.transitions.length, 0)
      });
    });

    it("is rejected with error in case async auto-guard throws exceptions", () => {
      return machineDefinition.findAvailableTransitions({
        from: 'h',
        object: {},
        isAutomatic: true
      }).catch((e) => {
        assert(e, 'Error is thrown as expected')
      });
    });
  });
});
