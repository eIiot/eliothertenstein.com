import { CodeBlock } from './CodeBlock'
import StyledLink from '../articles/StyledLink'
import deepmerge from 'deepmerge'
import Link from 'next/link'
import * as React from 'react'
import Markdown from 'react-markdown'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import linkifyRegex from 'remark-linkify-regex'

const LinkRenderer = ({ href, ...rest }: any) => {
  // auto-link headings
  if (href.startsWith('#')) {
    return <a href={href} {...rest} />
  }

  if (href.startsWith('@')) {
    // link to a mention
    return (
      <Link href={`/u/${href.slice(1)}`} {...rest}>
        <a {...rest} />
      </Link>
    )
  }
  try {
    const url = new URL(href)
    if (url.origin === 'https://eliothertenstein.com') {
      return (
        <Link href={href}>
          <a {...rest} />
        </Link>
      )
    }
    return <StyledLink href={href} {...rest} />
  } catch (e) {
    console.error(e)
    return <StyledLink href={href} {...rest} />
  }
}

const getComponentsForVariant = (variant) => {
  // Blog posts
  switch (variant) {
    case 'longform': {
      return {
        a: LinkRenderer,
        pre({ node, inline, className, children, ...props }) {
          const language = /language-(\w+)/.exec(className || '')?.[1]
          return !inline && language ? (
            <CodeBlock
              language={language}
              text={String(children).replace(/\n$/, '')}
              {...props}
            />
          ) : (
            <>{children}</>
          )
        },
        code({ node, inline, className, children, ...props }) {
          const language = /language-(\w+)/.exec(className || '')?.[1]
          return !inline && language ? (
            <CodeBlock
              language={language}
              text={String(children).replace(/\n$/, '')}
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
      }
    }
    // Questions, comments, descriptions on bookmarks, etc.
    case 'comment': {
      return {
        a: LinkRenderer,
        h1: 'p',
        h2: 'p',
        h3: 'p',
        h4: 'p',
        h5: 'p',
        h6: 'p',
        pre({ children }) {
          return <>{children}</>
        },
        code({ node, inline, className, children, ...props }) {
          const language = /language-(\w+)/.exec(className || '')?.[1]
          return !inline && language ? (
            <CodeBlock
              language={language}
              text={String(children).replace(/\n$/, '')}
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
      }
    }
  }
}

export const MarkdownRenderer = (props: any) => {
  // variant = 'longform' | 'comment'
  const { children, variant = 'longform', ...rest } = props

  const schema = deepmerge(defaultSchema, {
    tagNames: [...defaultSchema.tagNames, 'sup', 'sub', 'section'],
    attributes: {
      '*': ['className'],
    },
    clobberPrefix: '',
    clobber: ['name', 'id'],
  })

  const components = getComponentsForVariant(variant)

  return (
    <Markdown
      {...rest}
      components={components}
      rehypePlugins={[
        [rehypeSanitize, schema],
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      ]}
      remarkPlugins={[remarkGfm, linkifyRegex(/^(?!.*\bRT\b)(?:.+\s)?@\w+/i)]}
    >
      {children}
    </Markdown>
  )
}
