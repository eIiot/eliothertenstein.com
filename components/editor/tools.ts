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
  image: Image,
  raw: Raw,
  header: Header,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
}
