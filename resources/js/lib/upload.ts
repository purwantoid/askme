import axiosRequest from "axios"
import { axios } from "@/lib/axios"
import { assetUrl } from "@/lib/urls"

type BucketId = "uploads/images" | "logo"

function createImageUploader({
  unique = true,
  bucketId = "uploads/images",
  onUploadProgress,
}: any = {}) {
  return async (file: File): Promise<string> => {
    let path: string | undefined
    let url: string | undefined
    let headers: any

    try {
      const response = await axios.request({
        method: "POST",
        url: "/dashboard/generate-presigned-url",
        data: {
          unique,
          bucketId,
          filename: file.name,
          mimeType: file.type,
          contentLength: file.size,
        },
      })

      url = response?.data?.url
      headers = response?.data?.headers
    } catch (e: any) {
      throw e
    }

    await axiosRequest.request({
      method: "PUT",
      url: url!,
      data: file,
      onUploadProgress,
      headers: {
        "Content-Type": file.type,
        "Content-Disposition": `inline; filename="${file.name}"`,
        ...headers,
      },
    })

    return assetUrl(path!)
  }
}

export { createImageUploader }
