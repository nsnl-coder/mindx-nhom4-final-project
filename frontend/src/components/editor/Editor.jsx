import { EditorContent, useEditor } from '@tiptap/react'
import React from 'react'

import EditorToolbar from './EditorToolbar'
import './Editor.css'

export default ({ editor }) => {
  return (
    <div className="border rounded-lg shadow-md w-full">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
