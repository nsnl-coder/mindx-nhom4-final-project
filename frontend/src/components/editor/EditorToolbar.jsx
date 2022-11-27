import { CiUndo, CiRedo } from 'react-icons/ci'
import {
  MdOutlineFormatListBulleted,
  MdFormatListNumbered,
  MdTitle,
} from 'react-icons/md'
import {
  BsTypeBold,
  BsTypeItalic,
  BsTypeUnderline,
  BsLink,
  BsParagraph,
  BsList,
  BsChatRightQuote,
  BsTypeStrikethrough,
} from 'react-icons/bs'

const EditorToolbar = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="w-full">
      <div className="flex py-2 gap-x-2 border-b px-4 items-center [&>*]:px-2 [&>*]:h-10 [&>*:hover]:hover:bg-gray-100 [&>*]:rounded-lg overflow-x-auto">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="cursor-pointer"
        >
          <CiUndo size={22} className="h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="cursor-pointer"
        >
          <CiRedo size={22} className="h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-gray-100' : ''}
        >
          <BsTypeBold size={22} className="h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-gray-100' : ''}
        >
          <BsTypeItalic size={22} className="h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'bg-gray-100' : ''}
        >
          <BsTypeStrikethrough size={22} className="h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-gray-100' : ''}
        >
          <MdOutlineFormatListBulleted size={22} className="h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-gray-100' : ''}
        >
          <MdFormatListNumbered size={22} className="h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'bg-gray-100' : ''}
        >
          <BsChatRightQuote size={20} className="h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'bg-gray-100' : ''}
        >
          <span className="h-5">Text</span>
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive('heading', { level: 3 }) ? 'bg-gray-100' : ''
          }
        >
          <span className="h-5">Heading</span>
        </button>
      </div>
    </div>
  )
}

export default EditorToolbar
