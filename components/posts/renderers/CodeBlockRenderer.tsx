/* Disable a bunch of stuff because this isn't a react element, it's a function */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import { RenderFn } from 'editorjs-blocks-react-renderer'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import { useEffect } from 'react'

const CodeBlockRenderer: RenderFn<{}> = ({ data, className = '' }) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [])
  return (
    <>
      <div className="Code">
        <pre>
          <code className={`language-${data.language}`}>{data.code}</code>
        </pre>
      </div>
    </>
  )
}

export default CodeBlockRenderer
