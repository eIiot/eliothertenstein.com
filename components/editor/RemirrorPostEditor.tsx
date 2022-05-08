import {
  useUpdatePostMutation,
  useGetPostQuery,
} from '../../graphql/types.generated'
import {
  ComponentItem,
  EditorComponent,
  Remirror,
  ThemeProvider,
  Toolbar,
  ToolbarItemUnion,
  useHelpers,
  useKeymap,
  useRemirror,
} from '@remirror/react'
import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import jsx from 'refractor/lang/jsx'
import typescript from 'refractor/lang/typescript'
import { ExtensionPriority } from 'remirror'
import {
  BlockquoteExtension,
  BoldExtension,
  BulletListExtension,
  CodeBlockExtension,
  CodeExtension,
  HardBreakExtension,
  HeadingExtension,
  ItalicExtension,
  LinkExtension,
  ListItemExtension,
  MarkdownExtension,
  OrderedListExtension,
  PlaceholderExtension,
  StrikeExtension,
  TableExtension,
  TrailingNodeExtension,
} from 'remirror/extensions'
import '@remirror/styles/all.css'

interface RemirrorPostEditorProps {
  text: string
  slug: string
}

const RemirrorPostEditor = (props: RemirrorPostEditorProps) => {
  const { text, slug } = props

  const [updatePost] = useUpdatePostMutation()

  const hooks = [
    () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { getMarkdown } = useHelpers()

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const handleSaveShortcut = useCallback(
        ({ state }) => {
          console.log(`Save to backend: ${getMarkdown(state)}`)

          updatePost({
            variables: {
              slug,
              text: getMarkdown(state),
            },
          })

          toast.success('Saved!')

          return true // Prevents any further key handlers from being run.
        },
        [getMarkdown]
      )

      // "Mod" means platform agnostic modifier key - i.e. Ctrl on Windows, or Cmd on MacOS
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useKeymap('Mod-s', handleSaveShortcut)
    },
  ]

  const toolbarItems: ToolbarItemUnion[] = [
    {
      type: ComponentItem.ToolbarGroup,
      label: 'Simple Formatting',
      items: [
        {
          type: ComponentItem.ToolbarCommandButton,
          commandName: 'toggleBold',
          display: 'icon',
        },
        {
          type: ComponentItem.ToolbarCommandButton,
          commandName: 'toggleItalic',
          display: 'icon',
        },
        {
          type: ComponentItem.ToolbarCommandButton,
          commandName: 'toggleStrike',
          display: 'icon',
        },
        {
          type: ComponentItem.ToolbarCommandButton,
          commandName: 'toggleCode',
          display: 'icon',
        },
      ],
      separator: 'end',
    },
    {
      type: ComponentItem.ToolbarGroup,
      label: 'Heading Formatting',
      items: [
        {
          type: ComponentItem.ToolbarCommandButton,
          commandName: 'toggleHeading',
          display: 'icon',
          attrs: { level: 1 },
        },
        {
          type: ComponentItem.ToolbarCommandButton,
          commandName: 'toggleHeading',
          display: 'icon',
          attrs: { level: 2 },
        },
        {
          type: ComponentItem.ToolbarMenu,

          items: [
            {
              type: ComponentItem.MenuGroup,
              role: 'radio',
              items: [
                {
                  type: ComponentItem.MenuCommandPane,
                  commandName: 'toggleHeading',
                  attrs: { level: 3 },
                },
                {
                  type: ComponentItem.MenuCommandPane,
                  commandName: 'toggleHeading',
                  attrs: { level: 4 },
                },
                {
                  type: ComponentItem.MenuCommandPane,
                  commandName: 'toggleHeading',
                  attrs: { level: 5 },
                },
                {
                  type: ComponentItem.MenuCommandPane,
                  commandName: 'toggleHeading',
                  attrs: { level: 6 },
                },
              ],
            },
          ],
        },
      ],
      separator: 'end',
    },
    {
      type: ComponentItem.ToolbarGroup,
      label: 'Simple Formatting',
      items: [
        {
          type: ComponentItem.ToolbarCommandButton,
          commandName: 'toggleBlockquote',
          display: 'icon',
        },
        {
          type: ComponentItem.ToolbarCommandButton,
          commandName: 'toggleCodeBlock',
          display: 'icon',
        },
      ],
      separator: 'end',
    },
    {
      type: ComponentItem.ToolbarGroup,
      label: 'History',
      items: [
        {
          type: ComponentItem.ToolbarCommandButton,
          commandName: 'undo',
          display: 'icon',
        },
        {
          type: ComponentItem.ToolbarCommandButton,
          commandName: 'redo',
          display: 'icon',
        },
        {
          type: ComponentItem.ToolbarCommandButton,
          commandName: 'toggleColumns',
          display: 'icon',
          attrs: { count: 2 },
        },
      ],
      separator: 'none',
    },
  ]

  const { manager, state } = useRemirror({
    extensions: () => [
      new LinkExtension({ autoLink: true }),
      new BoldExtension(),
      new StrikeExtension(),
      new ItalicExtension(),
      new HeadingExtension(),
      new LinkExtension(),
      new BlockquoteExtension(),
      new BulletListExtension({ enableSpine: true }),
      new OrderedListExtension(),
      new ListItemExtension({
        priority: ExtensionPriority.High,
        enableCollapsible: true,
      }),
      new CodeExtension(),
      new CodeBlockExtension({ supportedLanguages: [jsx, typescript] }),
      new TrailingNodeExtension(),
      new TableExtension(),
      new MarkdownExtension({ copyAsMarkdown: false }),
      /**
       * `HardBreakExtension` allows us to create a newline inside paragraphs.
       * e.g. in a list item
       */
      new HardBreakExtension(),
    ],

    // Set the initial content.
    content: text,

    // Place the cursor at the start of the document. This can also be set to
    // `end`, `all` or a numbered position.
    selection: 'start',

    // Set the string handler which means the content provided will be
    // automatically handled as html.
    // `markdown` is also available when the `MarkdownExtension`
    // is added to the editor.
    stringHandler: 'markdown',
  })

  return (
    <ThemeProvider>
      {/* the className is used to define css variables necessary for the editor */}
      <Remirror hooks={hooks} initialContent={state} manager={manager}>
        <Toolbar items={toolbarItems} label="Top Toolbar" refocusEditor />
        <EditorComponent />
      </Remirror>
    </ThemeProvider>
  )
}

export default RemirrorPostEditor
function useParams<T>(): [any] {
  throw new Error('Function not implemented.')
}
