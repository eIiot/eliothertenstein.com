// ? Editor JS Does not provide typings for their tools :/
// @ts-ignore
import CheckList from '@editorjs/checklist'
// @ts-ignore
import Code from '@editorjs/code'
// @ts-ignore
import Delimiter from '@editorjs/delimiter'
// @ts-ignore
import Embed from '@editorjs/embed'
// @ts-ignore
import Header from '@editorjs/header'
// @ts-ignore
import Image from '@editorjs/image'
// @ts-ignore
import InlineCode from '@editorjs/inline-code'
// @ts-ignore
import Link from '@editorjs/link'
// @ts-ignore
import List from '@editorjs/list'
// @ts-ignore
import Marker from '@editorjs/marker'
// @ts-ignore
import Quote from '@editorjs/quote'
// @ts-ignore
import Raw from '@editorjs/raw'
// @ts-ignore
import SimpleImage from '@editorjs/simple-image'
// @ts-ignore
import Table from '@editorjs/table'
// @ts-ignore
import Warning from '@editorjs/warning'
// @ts-ignore
import Hyperlink from 'editorjs-hyperlink'

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

export const EDITOR_JS_TOOLS = {
  // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
  // paragraph: Paragraph,
  embed: Embed,
  table: Table,
  list: List,
  warning: Warning,
  code: Code,
  link: {
    class: Link,
    config: {
      endpoint: '/api/editorJS/fetchUrl', // Your backend endpoint for url data fetching
    },
  },
  hyperlink: {
    class: Hyperlink,
    config: {
      shortcut: 'CMD+K',
      target: '_blank',
      rel: 'nofollow',
      availableTargets: ['_blank', '_self'],
      availableRels: ['author', 'noreferrer'],
      validate: false,
    },
  },
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

        //       /**
        //        * Send URL-string to the server. Backend should load image by this URL and return an uploaded image data
        //        * @param {string} url - pasted image URL
        //        * @return {Promise.<{success, file: {url}}>}
        //        */
        //       uploadByUrl(url){
        //         // your ajax request for uploading
        //         return MyAjax.upload(file).then(() => {
        //           return {
        //             success: 1,
        //             file: {
        //               url: 'https://codex.so/upload/redactor_images/o_e48549d1855c7fc1807308dd14990126.jpg',,
        //               // any other image data you want to store, such as width, height, color, extension, etc
        //             }
        //           }
        //         })
      },
    },
  },
  raw: Raw,
  header: Header,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
}
