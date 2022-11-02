import { useEffect } from "preact/hooks"
import { useUploadsList } from "@w3ui/react-uploads-list"

export default function UploadList() {
  const { data, error, reload } = useUploadsList()

  useEffect(() => {
    const intervalId = setInterval(() => reload(), 2000)
    return () => clearInterval(intervalId)
  }, [])

  if (error) return <p>{error.message}</p>

  if (!data || !data.results.length) return <p>No uploads</p>

  return (
    <div class="container">
      {data.results.map(({ dataCid, carCids, uploadedAt }) => (
        <div class="card">
          <img
            class="card-img-top"
            src={`https://w3s.link/ipfs/${dataCid}`}
            alt={`Image CID: ${dataCid}`}
          />
          <div class="card-body">
            <p class="card-text">Uploaded: {uploadedAt.toString()}</p>
            <p>
              Image URL
              <code>
                <textarearea class="form-control text-break">
                  https://w3s.link/ipfs/{dataCid}
                </textarearea>
              </code>
            </p>
            <p>
              Data CID
              <code>
                <textarearea class="form-control text-break">
                  {dataCid}
                </textarearea>
              </code>
            </p>
            <p>
              CAR CID
              <code>
                <textarearea class="form-control text-break">
                  {carCids}
                </textarearea>
              </code>
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
