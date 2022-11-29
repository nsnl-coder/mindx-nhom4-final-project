export default {
  control: {
    backgroundColor: '#fff',
    fontSize: 14,
    fontWeight: 'normal',
  },

  '&multiLine': {
    control: {
      fontFamily: 'monospace',
      minHeight: 63,
    },
    highlighter: {
      padding: 9,
      border: '1px solid transparent',
    },
    input: {
      padding: 9,
      border: '0',
      borderBottom: '2px solid #e5e7eb',
      outline: 'none',
    },
  },

  '&singleLine': {
    display: 'inline-block',
    width: 180,

    highlighter: {
      padding: '4px 10px',
      border: '2px inset transparent',
    },
    input: {
      padding: '4px 10px',
      border: '1px solid #dedede',
      outline: 'none',
    },
  },

  suggestions: {
    list: {
      backgroundColor: 'white',
      border: '1px solid rgba(0,0,0,0.15)',
      fontSize: 14,
    },
    item: {
      padding: '5px 15px',
      borderBottom: '1px solid #e5e7eb',
      '&focused': {
        backgroundColor: 'rgba(24, 119, 242, 0.2)',
      },
    },
  },
}
