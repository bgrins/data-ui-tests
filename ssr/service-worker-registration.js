// https://searchfox.org/mozilla-central/rev/4d6a262deed98ddb4d609de94048e7f97b6e85d3/testing/web-platform/tests/service-workers/service-worker/resources/test-helpers.sub.js#3-23

// This unregisters the registration that precisely matches scope. Use this
// when unregistering by scope. If no registration is found, it just resolves.
function service_worker_unregister(scope) {
  var absoluteScope = new URL(scope, window.location).href;
  return navigator.serviceWorker
    .getRegistration(scope)
    .then(function (registration) {
      if (registration && registration.scope === absoluteScope)
        return registration.unregister();
    });
}

// Return true if |state_a| is more advanced than |state_b|.
function is_state_advanced(state_a, state_b) {
  if (state_b === "installing") {
    switch (state_a) {
      case "installed":
      case "activating":
      case "activated":
      case "redundant":
        return true;
    }
  }

  if (state_b === "installed") {
    switch (state_a) {
      case "activating":
      case "activated":
      case "redundant":
        return true;
    }
  }

  if (state_b === "activating") {
    switch (state_a) {
      case "activated":
      case "redundant":
        return true;
    }
  }

  if (state_b === "activated") {
    switch (state_a) {
      case "redundant":
        return true;
    }
  }
  return false;
}

/**
 * @param options an object that represents RegistrationOptions except for scope.
 * @param options.type a WorkerType.
 * @param options.updateViaCache a ServiceWorkerUpdateViaCache.
 * @see https://w3c.github.io/ServiceWorker/#dictdef-registrationoptions
 */
export function service_worker_unregister_and_register(url, scope, options) {
  if (!scope || scope.length == 0)
    return Promise.reject(new Error("tests must define a scope"));

  if (options && options.scope)
    return Promise.reject(new Error("scope must not be passed in options"));

  options = Object.assign({ scope: scope }, options);
  return service_worker_unregister(scope).then(function () {
    return navigator.serviceWorker.register(url, options);
  });
}

export function wait_for_state(worker, state) {
  if (!worker || worker.state == undefined) {
    return Promise.reject(
      new Error("wait_for_state needs a ServiceWorker object to be passed.")
    );
  }
  if (worker.state === state) return Promise.resolve(state);

  if (is_state_advanced(worker.state, state)) {
    return Promise.reject(
      new Error(
        `Waiting for ${state} but the worker is already ${worker.state}.`
      )
    );
  }
  return new Promise(function (resolve, reject) {
    worker.addEventListener("statechange", function () {
      if (worker.state === state) resolve(state);

      if (is_state_advanced(worker.state, state)) {
        reject(
          new Error(
            `The state of the worker becomes ${worker.state} while waiting` +
              `for ${state}.`
          )
        );
      }
    });
  });
}
