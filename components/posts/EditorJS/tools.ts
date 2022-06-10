// ? Editor JS Does not provide typings for their tools :/

// @ts-expect-error
import editorjsCodeflask from '@calumk/editorjs-codeflask'
// @ts-expect-error
import CheckList from '@editorjs/checklist'
// @ts-expect-error
import Delimiter from '@editorjs/delimiter'
// @ts-expect-error
import Embed from '@editorjs/embed'
import Header from '@editorjs/header'
// @ts-expect-error
import Image from '@editorjs/image'
// @ts-expect-error
import InlineCode from '@editorjs/inline-code'
// @ts-expect-error
import List from '@editorjs/list'
// @ts-expect-error
import Marker from '@editorjs/marker'
// @ts-expect-error
import Quote from '@editorjs/quote'
// @ts-expect-error
import SimpleImage from '@editorjs/simple-image'
// @ts-expect-error
import Table from '@editorjs/table'

async function getSignedUrl() {
  const data = await fetch('/api/images/sign').then((res) => res.json())
  return data?.uploadURL
}

async function uploadFile({
  file,
  signedUrl,
}: {
  file: File
  signedUrl: string
}) {
  const data = new FormData()
  data.append('file', file)
  const upload = await fetch(signedUrl, {
    method: 'POST',
    body: data,
  }).then((res) => res.json())
  return upload?.result?.id
}

async function uploadUrl({
  url,
  signedUrl,
}: {
  url: string
  signedUrl: string
}) {
  const data = new FormData()
  data.append('url', url)
  const upload = await fetch(signedUrl, {
    method: 'POST',
    body: data,
  }).then((res) => res.json())
  return upload?.result?.id
}

export const EDITOR_JS_TOOLS = {
  // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
  // paragraph: Paragraph,
  embed: Embed,
  table: Table,
  list: List,
  code: editorjsCodeflask,

  image: {
    class: Image,
    config: {
      /**
       * Custom uploader
       */
      uploader: {
        /**
         * Upload file to the server and return an uploaded image data
         * @param {File} file - file selected from the device or pasted by drag-n-drop
         * @return {Promise.<{success, file: {url}}>}
         */
        uploadByFile(
          file: File
        ): Promise<{ success: boolean; file: { url: string } }> {
          // your own uploading logic here
          return new Promise((resolve) => {
            getSignedUrl().then((signedUrl) => {
              uploadFile({ file, signedUrl }).then((id) => {
                resolve({
                  success: true,
                  file: {
                    url: `https://imagedelivery.net/xUFYKyrYJ8VwR259YgmweA/${id}/public`,
                  },
                })
              })
            })
          })
        },

        /**
         * Send URL-string to the server. Backend should load image by this URL and return an uploaded image data
         * @param {string} url - pasted image URL
         * @return {Promise.<{success, file: {url}}>}
         */
        uploadByUrl(
          url: string
        ): Promise<{ success: boolean; file: { url: string } }> {
          // your ajax request for uploading
          return new Promise((resolve) => {
            getSignedUrl().then((signedUrl) => {
              uploadUrl({ url, signedUrl }).then((id) => {
                resolve({
                  success: true,
                  file: {
                    url: `https://imagedelivery.net/xUFYKyrYJ8VwR259YgmweA/${id}/public`,
                  },
                })
              })
            })
          })
        },
      },
    },
  },
  // raw: Raw,
  header: Header,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
}
