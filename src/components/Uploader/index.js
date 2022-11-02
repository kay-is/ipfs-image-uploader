import { useState } from "preact/hooks"
import { useUploader } from "@w3ui/react-uploader"

export default function Uploader() {
  const [, uploader] = useUploader()
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState(null)
  const [, setCid] = useState("")

  const handleUploadSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const cid = await uploader.uploadFile(file)
    setCid(cid)
    setLoading(false)
  }

  return (
    <form onSubmit={handleUploadSubmit} class="row">
      <div class="col">
        <input
          type="file"
          accept="image/*"
          class="form-control"
          onChange={(e) => setFile(e.target.files[0])}
          required
          disabled={loading}
        />
      </div>
      <div class="col">
        <div class="d-grid gap-2">
          <button class="btn btn-primary" type="submit" disabled={loading}>
            Upload
          </button>
        </div>
      </div>
    </form>
  )
}
