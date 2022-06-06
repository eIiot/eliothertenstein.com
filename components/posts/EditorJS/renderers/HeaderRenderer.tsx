/* Disable a bunch of stuff because this isn't a react element, it's a function */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */

import { RenderFn } from 'editorjs-blocks-react-renderer'
import { createElement } from 'react'

const HeaderRenderer: RenderFn<{
  text: string
  level: number
}> = ({ data, className = '' }) => {
  const { text, level } = data
  const anchor =
    level <= 2
      ? text
          .toLowerCase()
          .replace(/\s/g, '-')
          .replace(/[^a-z0-9-]/g, '')
      : null
  return createElement(
    `h${level}`,
    {
      className: className,
      id: anchor,
    },
    anchor ? (
      <a href={`#${anchor}`} rel-type="header-link">
        {text}
      </a>
    ) : (
      text
    )
  )
}

export default HeaderRenderer
