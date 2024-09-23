import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Collapse, DatePicker, Divider, Form, Input, InputNumber, Select } from 'antd';
import axios from 'axios';
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';
import { addDescription, addFormData, addName } from '../../store/slice/Form';
import { PlusCircle, Save, XCircle } from 'lucide-react';
import 'react-quill/dist/quill.snow.css';

const { Panel } = Collapse;

const EditorForm = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [data, setData] = useState(null);
  const { description, descName } = useSelector((state) => state.resume);

  const modules = {
    toolbar: [
      ['bold', 'underline'],
      [{ 'list': 'bullet' }],
      ['clean']
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'align'
  ];

  const updateData = (changedValues, allValues) => {
    dispatch(addFormData(allValues));
  };

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://resume-builder-json.vercel.app/resume');
      const formData = res.data[0];
      setData(formData);
      const transformedData = {
        ...formData,
        experience: formData.experience?.map(exp => ({
          ...exp,
          description: exp.description,
        })) || [],


        projects: formData.projects?.map(project => ({
          ...project,
          description: project.description
        })) || [],
        education: formData.education || [],
        achievementsAndCertifications: formData.achievementsAndCertifications || [],
      };



      form.setFieldsValue(transformedData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleEditorChange = (value, name) => {
    dispatch(addDescription(value));
    dispatch(addName(name));
  };

  const saveData = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();

      const sanitizedValues = {
        ...values,
        experience: values.experience?.filter(exp =>
          exp.title && exp.company && exp.description.trim() !== ''
        ).map(exp => ({
          ...exp,
          description: DOMPurify.sanitize(exp.description)
        })) || [],
        projects: values.projects?.filter(project =>
          project.name && project.description.trim() !== ''
        ).map(project => ({
          ...project,
          description: DOMPurify.sanitize(project.description)
        })) || [],
        education: values.education?.filter(edu =>
          edu.degree && edu.institution
        ) || [],
        achievementsAndCertifications: values.achievementsAndCertifications?.filter(achievement =>
          achievement.title && achievement.description.trim() !== ''
        ).map(achievement => ({
          ...achievement,
          description: DOMPurify.sanitize(achievement.description)
        })) || [],

        technicalSkills: values.technicalSkills?.filter(item => item?.languages && item?.frameworks && item?.tools && item?.backend) || [],

      };

      // Remove empty sections
      Object.keys(sanitizedValues).forEach(key => {
        if (Array.isArray(sanitizedValues[key]) && sanitizedValues[key].length === 0) {
          delete sanitizedValues[key];
        }
      });

      await axios.post('https://resume-builder-json.vercel.app/resume', sanitizedValues);
      alert('Data saved successfully');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[90vw] lg:max-w-[80vw] xl:max-w-[50vw] mx-auto pt-10 overflow-auto p-6 space-y-6 z-30 lg:sticky static top-0 left-0 right-0 h-screen bg-white shadow-lg">
      <h1 className="text-3xl font-sans mb-8 font-bold text-gray-900 text-center">
        Resume Builder
      </h1>

      <Form
        form={form}
        onValuesChange={updateData}
        layout="vertical"
        name="resume-builder-form"
      >
        {/* Personal Information Section */}
        <Collapse expandIconPosition="end" defaultActiveKey={[]} className="rounded-lg border">
          <Panel header={<span className='font-semibold'>Personal Information</span>} key="1" className="font-[490] text-lg">
            <Form.Item name={['personalInfo', 'name']} label="Full Name" required>
              <Input placeholder="Enter your full name" />
            </Form.Item>
            <Form.Item name={['personalInfo', 'phone']} label="Phone Number" required>
              <InputNumber placeholder="Enter your phone number" className="w-full" />
            </Form.Item>
            <Form.Item name={['personalInfo', 'github']} label="Github URL">
              <Input placeholder="Github URL" />
            </Form.Item>
            <Form.Item name={['personalInfo', 'linkedin']} label="LinkedIn URL">
              <Input placeholder="LinkedIn URL" />
            </Form.Item>
            <Form.Item name={['personalInfo', 'title']} label="Target Title">
              <Input placeholder="Enter your target title (e.g., Software Engineer)" />
            </Form.Item>
          </Panel>
        </Collapse>

        {/* Work Experience Section */}
        <Collapse expandIconPosition="end" className="my-4 rounded-lg border" defaultActiveKey={[]}>
          <Panel header={<span className='font-semibold'>Work Experience</span>} key="2" className="font-[490] text-lg">
            <Form.List name="experience">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key}>
                      <Divider />
                      <Form.Item {...restField} name={[name, 'title']} label="Job Title" required>
                        <Input placeholder="Enter your job title" />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'company']} label="Company Name" required>
                        <Input placeholder="Enter company name" />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'description']} label="Job Description">
                        <ReactQuill
                          theme="snow"
                          modules={modules}
                          formats={formats}
                          value={form.getFieldValue(['experience', name, 'description']) || ''}
                          onChange={(value) => handleEditorChange(value, "experience")}
                        />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'duration']} label="Employment Dates">
                      <Input placeholder="Enter Dates" />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'location']} label="Enter Location">
                        <Input placeholder="Enter location" />
                      </Form.Item>
                      <Button type="link" onClick={() => remove(name)} icon={<XCircle size={17} />}>
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button type="dashed" onClick={() => add()} block icon={<PlusCircle size={17} />}>
                    Add Work Experience
                  </Button>
                </>
              )}
            </Form.List>
          </Panel>
        </Collapse>

        {/* Education Section */}
        <Collapse expandIconPosition="end" className="my-4 rounded-lg border" defaultActiveKey={[]}>
          <Panel header={<span className='font-semibold'>Education</span>} key="3" className="font-[490] text-lg">
            <Form.List name="education">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key}>
                      <Divider />
                      <Form.Item {...restField} name={[name, 'degree']} label="Course Name" required>
                        <Input placeholder="Enter course name" />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'institution']} label="University Name" required>
                        <Input placeholder="Enter university name" />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'location']} label="Address">
                        <Input placeholder="Enter university address" />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'duration']} label="Dates Attended">
                        <Input placeholder="Enter dates attended" />
                      </Form.Item>
                      <Button type="link" onClick={() => remove(name)} icon={<XCircle size={17} />}>
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button type="dashed" onClick={() => add()} block icon={<PlusCircle size={17} />}>
                    Add Education
                  </Button>
                </>
              )}
            </Form.List>
          </Panel>
        </Collapse>

        {/* Projects Section */}
        <Collapse expandIconPosition="end" className="my-4 rounded-lg border" defaultActiveKey={[]}>
          <Panel header={<span className='font-semibold'>Projects</span>} key="4" className="font-[490] text-lg">
            <Form.List name="projects">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key}>
                      <Divider />
                      <Form.Item {...restField} name={[name, 'name']} label="Project Title" required>
                        <Input placeholder="Enter project title" />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'description']} label="Project Description">
                        <ReactQuill
                          theme="snow"
                          modules={modules}
                          formats={formats}
                          value={form.getFieldValue(['projects', name, 'description']) || ''}
                          onChange={(value) => handleEditorChange(value, "projects")}
                        />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'link']} label="Project URL">
                        <Input placeholder="Enter project URL" />
                      </Form.Item>
                      <Button type="link" onClick={() => remove(name)} icon={<XCircle size={17} />}>
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button type="dashed" onClick={() => add()} block icon={<PlusCircle size={17} />}>
                    Add Project
                  </Button>
                </>
              )}
            </Form.List>
          </Panel>
        </Collapse>


        {/* Technical Skills Section */}
        <Collapse expandIconPosition="end" className="my-4 rounded-lg border" defaultActiveKey={[]}>
          <Panel header={
            <div className="flex justify-between  items-center">
              <span className='font-semibold'>Technical Skills</span>

            </div>
          } key="5" className="font-[490] text-lg">
            <Form.Item name={['technicalSkills', 'languages']} label="Languages">
              <Select mode="tags" style={{ width: '100%' }} placeholder="Select languages" />
            </Form.Item>
            <Form.Item name={['technicalSkills', 'frameworks']} label="Frameworks">
              <Select mode="tags" style={{ width: '100%' }} placeholder="Select frameworks" />
            </Form.Item>
            <Form.Item name={['technicalSkills', 'backend']} label="Backend">
              <Select mode="tags" style={{ width: '100%' }} placeholder="Select backend technologies" />
            </Form.Item>
            <Form.Item name={['technicalSkills', 'tools']} label="Tools">
              <Select mode="tags" style={{ width: '100%' }} placeholder="Select tools" />
            </Form.Item>
          </Panel>
        </Collapse>


        {/* Achievements and Certifications Section */}
        <Collapse expandIconPosition="end" className="my-4 rounded-lg border" defaultActiveKey={[]}>
          <Panel header={<span className='font-semibold'>Achievements and Certifications</span>} key="5" className="font-[490] text-lg">
            <Form.List name="achievementsAndCertifications">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key}>
                      <Divider />
                      <Form.Item {...restField} name={[name, 'title']} label="Title" required>
                        <Input placeholder="Enter title" />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'description']} label="Description">
                        <ReactQuill
                          theme="snow"
                          modules={modules}
                          formats={formats}
                          value={form.getFieldValue(['achievementsAndCertifications', name, 'description']) || ''}
                          onChange={(value) => handleEditorChange(value, "achievementsAndCertifications")}
                        />
                      </Form.Item>

                      <Form.Item {...restField} name={[name, 'year']} label="Date">
                        <Input placeholder="Enter date" />
                      </Form.Item>
                      <Button type="link" onClick={() => remove(name)} icon={<XCircle size={17} />}>
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button type="dashed" onClick={() => add()} block icon={<PlusCircle size={17} />}>
                    Add Achievement/Certification
                  </Button>
                </>
              )}
            </Form.List>
          </Panel>
        </Collapse>

        <Button
          type="primary"
          className="bg-blue-600 hover:bg-blue-700"
          onClick={saveData}
          loading={loading}
        >
          Save <Save className="ml-2" />
        </Button>
      </Form>
    </div>
  );
};

export default EditorForm;