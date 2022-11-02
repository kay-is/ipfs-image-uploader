import { AuthProvider } from "@w3ui/react-keyring"
import { UploaderProvider } from "@w3ui/react-uploader"
import { UploadsListProvider } from "@w3ui/react-uploads-list"

import Home from "./home"

const App = () => (
  <AuthProvider>
    <UploaderProvider>
      <UploadsListProvider>
        <div id="app">
          <Home />
        </div>
      </UploadsListProvider>
    </UploaderProvider>
  </AuthProvider>
)

export default App
