const postStyles = {
  code: {
    // className:
    //   'rounded-md border-gray-100 bg-gray-100 px-1 py-0.5 text-gray-800 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200',
  },
  delimiter: {
    className: '',
  },
  embed: {
    className: '',
    rel: 'noreferer nofollower external', // Generates an <a> if not able to receive an "embed" property
    sandbox: undefined,
  },
  header: {
    className: '',
  },
  image: {
    className: '',
    actionsClassNames: {
      stretched: 'image-block--stretched',
      withBorder: 'image-block--with-border',
      withBackground: 'image-block--with-background',
    },
  },
  list: {
    className: 'list-inside',
  },
  paragraph: {
    className: '',
  },
  quote: {
    className: '',
    actionsClassNames: {
      alignment: 'text-align-{alignment}', // This is a substitution placeholder: left or center.
    },
  },
  table: {
    className: '',
  },
  checklist: {
    className: '',
  },
}

export default postStyles
