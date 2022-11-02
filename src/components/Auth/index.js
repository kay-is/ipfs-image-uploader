import { useEffect, useReducer } from "preact/hooks"
import { useAuth, AuthStatus } from "@w3ui/react-keyring"

export default (WrappedComponent) =>
  function AuthWrapper(props) {
    const { authStatus, loadDefaultIdentity, unloadAndRemoveIdentity } =
      useAuth()

    useEffect(() => {
      loadDefaultIdentity()
    }, [])

    if (authStatus === AuthStatus.SignedIn) {
      const authProps = { ...props, unloadAndRemoveIdentity }
      return <WrappedComponent {...authProps} />
    }

    return <Register />
  }

function Register() {
  const { authStatus, identity, registerAndStoreIdentity } = useAuth()

  const startState = { email: "", loading: false }
  const [state, setState] = useReducer(
    (state, update) => ({ ...state, ...update }),
    startState
  )

  const waitingForVerification = authStatus === AuthStatus.EmailVerification

  return (
    <div class="container" style={{ marginTop: "20%" }}>
      <form
        class="row align-items-center justify-content-center"
        onSubmit={(e) => {
          e.preventDefault()
          setState({ loading: true })
          registerAndStoreIdentity(state.email)
        }}
      >
        <div class="col-4">
          <h1 class="display-1 text-end">
            Quick
            <br />
            Save
          </h1>
          <p class="lead text-end">Distribute your files via IPFS!</p>
        </div>
        <div class="col-3">
          <label htmlFor="exampleFormControlInput1" class="form-label">
            Email Address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleFormControlInput1"
            disabled={state.loading}
            value={state.email}
            onChange={(e) => setState({ email: e.target.value })}
          />
          <br />
          <div class="d-grid gap-2">
            <button
              type="submit"
              class="btn btn-primary"
              disabled={state.loading}
            >
              Register
            </button>
            {waitingForVerification && (
              <p>
                <div class="spinner-border spinner-border-sm" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>{" "}
                Waiting for verification of "{identity.email}" address...
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
