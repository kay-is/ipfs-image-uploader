import Auth from "./Auth"
import Uploader from "./Uploader"
import UploadList from "./UploadList"

const Home = (props) => {
  return (
    <div class="container">
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container">
          <a class="navbar-brand" href="#">
            Quick-Save
          </a>
          <button
            class="btn btn-secondary btn-sm"
            type="button"
            onClick={() => props.unloadAndRemoveIdentity()}
          >
            Logout
          </button>
        </div>
      </nav>
      <br />
      <Uploader />
      <br />
      <UploadList />
    </div>
  )
}
export default Auth(Home)
