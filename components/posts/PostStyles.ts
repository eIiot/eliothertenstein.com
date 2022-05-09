// .post-text {
//   @apply text-gray-700 dark:text-gray-400;
// }

// .post-text > * {
//   @apply my-3;
// }

// .post-text > * + * {
//   @apply mt-0;
// }

// .post-text blockquote {
//   @apply border-l-2 border-gray-200 font-normal dark:border-gray-800 dark:text-gray-400;
// }

// .post-text blockquote p:first-child {
//   @apply ml-2;
// }

// .post-text blockquote footer {
//   @apply ml-2 text-sm italic;
// }

// .post-text figure {
//   @apply md:-mx-6;
// }

// .post-text img {
//   @apply w-full rounded-md;
// }

// .post-text a {
//   @apply relative break-words font-normal text-blue-500 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:translate-y-1 after:bg-blue-300 after:opacity-0 after:transition after:duration-200 after:ease-in-out hover:after:translate-y-0 hover:after:opacity-100;
// }

// .post-text a code {
//   @apply text-blue-600 dark:text-blue-500;
// }

// .post-text table {
//   @apply my-2 rounded-md border border-gray-200 dark:border-gray-800 dark:text-gray-50;
// }

// .post-text.comment table {
//   @apply my-2;
// }

// .post-text thead {
//   @apply text-gray-800 dark:text-gray-200;
// }

// .post-text thead th {
//   @apply p-2;
// }

// .post-text thead th,
// .post-text tbody th,
// .post-text tbody td {
//   @apply border-r border-gray-200 p-2 dark:border-gray-800;
// }

// .post-text tbody tr {
//   @apply border-b border-gray-200 dark:border-gray-800;
// }

// .post-text thead tr {
//   @apply border-b-2 border-gray-200 dark:border-gray-800;
// }

// .post-text tbody tr:nth-child(2n) {
//   @apply bg-gray-50 dark:bg-gray-900;
// }

// .post-text b,
// .post-text strong {
//   @apply font-bold text-gray-900 dark:text-gray-300;
// }

// .post-text hr {
//   @apply border-gray-200 dark:border-gray-800;
// }

// /* the kg-embed-card gets applied to iframes sent from Ghost. this preserves a good video aspect ratio */
// .post-text .kg-embed-card {
//   @apply my-4;
//   position: relative;
//   padding-top: 56.25%;
// }

// .post-text .kg-embed-card iframe {
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0;
//   left: 0;
// }

// .post-text h1,
// .post-text h2,
// .post-text h3,
// .post-text h4,
// .post-text h5,
// .post-text h6 {
//   @apply font-sans font-bold text-gray-900 dark:text-gray-100;
//   scroll-margin-top: 4rem;
// }

// .post-text h1 a,
// .post-text h2 a,
// .post-text h3 a,
// .post-text h4 a,
// .post-text h5 a,
// .post-text h6 a {
//   @apply font-sans font-bold text-gray-100 no-underline dark:text-gray-100;
// }

// .post-text pre {
//   @apply space-y-4 rounded-md border-gray-300 bg-gray-400 bg-opacity-5 px-8 py-6 text-sm text-gray-800 dark:border-gray-800 dark:text-gray-200;
// }

// .post-text.comment {
//   @apply max-w-none;
// }

// .post-text.comment pre {
//   @apply my-2 px-3 py-2;
// }

// .post-text.comment p,
// .post-text.comment ul,
// .post-text.comment ol {
//   @apply my-3 list-decimal;
// }

// .post-text.comment p:first-of-type {
//   margin-top: 0 !important;
// }

// .post-text.comment p + p {
//   margin-top: 0;
// }

// .post-text.comment pre {
//   @apply my-3;
// }

// .post-text.comment a {
//   @apply break-all;
// }

// .post-text p + p {
//   margin-top: 0;
// }

// .post-text code {
//   @apply rounded-md border-gray-100 bg-gray-100 px-1 py-0.5 text-gray-800 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200;
// }

// .post-text code,
// .post-text pre {
//   @apply whitespace-pre-wrap text-sm font-medium;
//   word-break: break-word;
// }

// .post-text pre > code {
//   @apply bg-gray-800 text-gray-200;
// }

// .post-text pre {
//   @apply bg-gray-800 text-gray-100;
// }

// .post-text sup {
//   @apply text-sm text-blue-500 dark:text-gray-400;
//   vertical-align: super;
//   top: 0px;
//   position: relative;
//   scroll-margin-top: 4rem;
// }

const postStyles = {
  code: {
    className:
      'rounded-md border-gray-100 bg-gray-100 px-1 py-0.5 text-gray-800 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200',
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
    className: 'list-decimal list-inside',
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
