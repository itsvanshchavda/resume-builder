import React from 'react'
import resume from '../../assets/resume-1.jpg'
import { PlusIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Templates = () => {
    const navigate = useNavigate();
    return (
        <div className='flex md:px-[160px] px-14 pt-10 justify-start items-center'>
            <div>
                <h1 className='text-xl font-semibold'>Sample Resumes</h1>



                <div className='grid gap-14 grid-cols-2 lg:grid-cols-3 max-sm:grid-cols-1'>

                    <div onClick={() => navigate('/editor')} className='my-8 p-3 border rounded-xl shadow-lg'>
                        <div className="block">
                            <div className="h-72 "> <div className='flex justify-center flex-col relative top-40 items-center'>
                                <PlusIcon />

                                <h1 className=''>Create From Scratch</h1>
                            </div> </div>




                        </div>
                    </div>

                    <div className='my-8 p-3 border rounded-xl shadow-lg'>
                        <a href="#" className="block">
                            <img
                                alt=""
                                src={resume}
                                className="h-72"
                            />

                            <h3 className="mt-4 mb-2 text-md font-bold text-gray-900">Software Developer</h3>

                            <div className="flex items-center -space-x-2 overflow-hidden">
                                <img
                                    alt=""
                                    src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    className="inline-block h-5 w-5 rounded-full ring-2 ring-white"
                                />
                                <img
                                    alt=""
                                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    className="inline-block h-5 w-5 rounded-full ring-2 ring-white"
                                />
                                <img
                                    alt=""
                                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                                    className="inline-block h-5 w-5 rounded-full ring-2 ring-white"
                                />
                                <img
                                    alt=""
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    className="inline-block h-5 w-5 rounded-full ring-2 ring-white"
                                />
                                <span className='text-[13px] text-gray-500 font-[500] pl-3.5'>Used By 3275 users</span>
                            </div>
                        </a>
                    </div>

                    <div className='my-8 p-3 border rounded-xl shadow-lg'>
                        <a href="#" className="block">
                            <img
                                alt=""
                                src={resume}
                                className="h-72"
                            />

                            <h3 className="mt-4 mb-2 text-md font-bold text-gray-900">Software Developer</h3>

                            <div className="flex items-center -space-x-2 overflow-hidden">
                                <img
                                    alt=""
                                    src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    className="inline-block h-5 w-5 rounded-full ring-2 ring-white"
                                />
                                <img
                                    alt=""
                                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    className="inline-block h-5 w-5 rounded-full ring-2 ring-white"
                                />
                                <img
                                    alt=""
                                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                                    className="inline-block h-5 w-5 rounded-full ring-2 ring-white"
                                />
                                <img
                                    alt=""
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    className="inline-block h-5 w-5 rounded-full ring-2 ring-white"
                                />
                                <span className='text-[13px] text-gray-500 font-[500] pl-3.5'>Used By 3275 users</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Templates