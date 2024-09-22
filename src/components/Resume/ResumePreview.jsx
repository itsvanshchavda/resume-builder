import React, { useEffect, useRef, useState } from 'react';
import { Button, Spin, Select } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Template1, Template2, Template3 } from '../Templates/AllTemplates';
import { Template1Pdf } from '../Templates/DownloadTemplates';
import { PDFDownloadLink } from '@react-pdf/renderer';

const { Option } = Select;

export const ResumeSection = ({ title, children }) => (
  <section className="mb-6">
    <h2 className="text-xl font-semibold uppercase tracking-wider mb-3 border-b-2 border-gray-300 pb-1">{title}</h2>
    {children}
  </section>
);

const ResumePreview = () => {
  const resumeRef = useRef(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const { formData } = useSelector((state) => state.resume);


  const resume = {
    personalInfo: { ...data?.personalInfo, ...formData?.personalInfo },
    experience: formData?.experience || data?.experience || [],
    education: formData?.education || data?.education || [],
    projects: formData?.projects || data?.projects || [],
    technicalSkills: { ...data?.technicalSkills, ...formData?.technicalSkills },
    achievementsAndCertifications: formData?.achievementsAndCertifications || data?.achievementsAndCertifications || []
  };

  const {description} = useSelector((state) => state.resume);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://resume-builder-json.vercel.app/resume');
      setData(res.data[0]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'template1':
        return <Template1 data={data} formData={formData} />;
      case 'template2':
        return <Template2 data={data} formData={formData} />;
      case 'template3':
        return <Template3 data={data} formData={formData} />;
      default:
        return <Template1 data={data} formData={formData} />;
    }
  };

  return (
    <>
      {loading && (
        <div className='max-w-3xl p-6 flex justify-center items-center h-screen'>
          <Spin />
        </div>
      )}
      {!loading && data && (
        <div className="max-w-3xl mx-auto p-6">
          <div className="mb-4 flex justify-between items-center">
            <Select
              value={selectedTemplate}
              onChange={setSelectedTemplate}
              className="w-48"
            >
              <Option value="template1">Template 1</Option>
              <Option value="template2">Template 2</Option>
              <Option value="template3">Template 3</Option>
            </Select>
            <PDFDownloadLink document={<Template1Pdf description={description} resumeData={resume} />} fileName="resume-template-2.pdf">
              {({ blob, url, loading, error }) =>
                loading ? <Button>Download PDF</Button>: <Button>Download PDF</Button>
              }
            </PDFDownloadLink>
          </div>
          <div
            ref={resumeRef}
            className="overflow-y-auto max-h-screen"
          >
            {renderTemplate()}
          </div>
        </div>
      )}
    </>
  );
};

export default ResumePreview;
