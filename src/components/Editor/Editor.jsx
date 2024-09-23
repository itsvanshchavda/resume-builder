import React from 'react'
import ResumePreview from '../Resume/ResumePreview'
import EditorForm from './EditorForm'

const Editor = () => {
  return (
    <div className="flex  flex-col lg:flex-row bg-gray-100 min-h-screen">
        <EditorForm />
        <ResumePreview  />
    </div>
  )
}

export default Editor