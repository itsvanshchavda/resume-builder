import { Document, Font, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';
import fontRegular from '../../fonts/Tinos-Regular.ttf';
import fontBold from '../../fonts/Tinos-Bold.ttf';
import fontItalic from '../../fonts/Tinos-Italic.ttf';

// Font Registration
Font.register({
    family: 'Tinos',
    fonts: [
        { src: fontRegular, fontWeight: 'normal' },
        { src: fontBold, fontWeight: 'bold' },
        { src: fontItalic, fontStyle: 'italic' },
    ],
});

// Styles for the document
const styles = StyleSheet.create({
    page: {
        fontFamily: 'Tinos',
        fontSize: 12,
        padding: 30,
        lineHeight: 1.2,
    },
    section: {
        marginBottom: 10,
    },
    header: {
        marginBottom: 10,
        textAlign: 'center',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 3,
    },
    contact: {
        fontSize: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    contactItem: {
        marginHorizontal: 5,
        color: 'black',
        textDecoration: 'none',
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'normal',
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#dedbda',
        paddingBottom: 2,
        textTransform: 'uppercase',
    },
    companyTitle: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    dateLocation: {
        fontSize: 10,
        fontStyle: 'italic',
        marginBottom: 2,
    },

    htmlStyles: {
        fontSize: 12,
        marginTop: 1,
        lineHeight: 1.2,
    },
    listItem: {
        flexDirection: 'row',
        marginBottom: 4,
        textAlign: 'justify',
    },
    bullet: {
        width: 10,
        fontSize: 12,
    },
    listItemContent: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});



// SafeHtml Component
const parseHtml = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.body.childNodes;
};

const renderNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
        const children = Array.from(node.childNodes).map(renderNode);

        switch (node.tagName.toLowerCase()) {
            case 'p':
                return <Text>{children}</Text>;
            case 'ul':
                return <View>{children}</View>;
            case 'li':
                return (
                    <View style={styles.listItem}>
                        <Text style={styles.bullet}>• </Text>
                        <View style={styles.listItemContent}>
                            {children.map((child, index) => (
                                <Text key={index}>{child}</Text>
                            ))}
                        </View>
                    </View>
                );
            case 'strong':
                return <Text style={{ fontWeight: 'bold' }}>{children}</Text>;
            case 'u':
                return <Text style={{ textDecoration: 'underline' }}>{children}</Text>;
            default:
                return <Text>{children}</Text>;
        }
    }

    return null;
};

const SafeHtml = ({ content }) => {
    if (!content || typeof content !== 'string') {
        return null;
    }

    const nodes = parseHtml(content);
    return (
        <>
            {Array.from(nodes).map((node, index) => (
                <React.Fragment key={index}>
                    {renderNode(node)}
                </React.Fragment>
            ))}
        </>
    );
};





// Main PDF Component
export const Template1Pdf = ({ resumeData }) => {
    if (!resumeData) {
        return <Document><Page size="A4"><Text>No resume data available</Text></Page></Document>;
    }


    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.name}>{resumeData.personalInfo?.name || "Test Name"}</Text>
                    <View style={styles.contact}>
                        <Text style={styles.contactItem}>{resumeData.personalInfo?.phone || "8764657890"}</Text>
                        <Text style={styles.contactItem}>•</Text>
                        <Text style={styles.contactItem}>{resumeData.personalInfo?.email || "example@gmail.com"}</Text>
                        <Text style={styles.contactItem}>•</Text>
                        <Link href={`${resumeData?.personalInfo?.linkedin}`} style={styles.contactItem} >linkedin.com</Link>
                        <Text style={styles.contactItem}>•</Text>
                        <Link href={`${resumeData?.personalInfo?.github}`} style={styles.contactItem}>github.com</Link>
                        <Text style={styles.contactItem}>•</Text>
                        <Link href={`${resumeData?.personalInfo?.website}`} style={styles.contactItem}>vanshchavda.me</Link>
                    </View>
                </View>

                {/* Work Experience */}
                {resumeData?.experience && resumeData.experience.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Work Experience</Text>
                        {resumeData.experience.map((exp, index) => (
                            <View key={index} >
                                <Text style={styles.companyTitle}>{exp?.company || 'Company'} - {exp?.title || 'Title'}</Text>
                                <Text style={styles.dateLocation}>{exp?.location || 'Location'} ({exp?.duration || 'Duration'})</Text>
                                {exp?.description ? <SafeHtml content={exp?.description} /> : exp?.description}
                            </View>
                        ))}
                    </View>
                )}

                {/* Education */}
                {resumeData?.education && resumeData?.education.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {resumeData?.education.map((edu, index) => (
                            <View key={index} >
                                <Text style={styles.companyTitle}>{edu?.institution || 'Institution'}</Text>
                                <Text style={styles.dateLocation}>{edu?.duration || 'Duration'}</Text>
                                <Text>{edu?.degree || 'Degree'}</Text>
                                <Text>{edu?.location || 'Location'}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Projects */}
                {resumeData?.projects && resumeData?.projects.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Projects</Text>
                        {resumeData.projects.map((proj, index) => (
                            <View key={index} >
                                <Text style={styles.companyTitle}>{proj?.name || 'Project Name'}</Text>
                                <Text style={styles.dateLocation}>{proj?.link || 'Project Link'}</Text>
                                <Text>
                                    <Text style={{ fontWeight: 'bold' }}>Tech Stack:</Text> {proj?.technologies ? proj?.technologies?.join(', ') : 'Not specified'}
                                </Text>
                                {proj?.description ? <SafeHtml content={proj?.description} /> : proj?.description}
                            </View>
                        ))}
                    </View>
                )}
                {/* Technical Skills */}
                {resumeData?.technicalSkills && Object.keys(resumeData?.technicalSkills).length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Technical Skills</Text>
                        {Object.entries(resumeData?.technicalSkills).map(([category, skills]) => (
                            <View key={category}>
                                <Text style={{ fontWeight: 'bold' }}>{category}:</Text>
                                <Text>{Array.isArray(skills) ? skills.join(', ') : 'Not specified'}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Achievements and Certifications */}
                {resumeData?.achievementsAndCertifications && resumeData?.achievementsAndCertifications.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Achievements and Certifications</Text>
                        {resumeData?.achievementsAndCertifications.map((ach, index) => (
                            <View key={index}>
                                <Text>
                                    <Text style={{ fontWeight: 'bold' }}>{ach?.title || 'Achievement'}</Text>
                                    {ach?.year && ` – ${ach?.year}`}
                                </Text>
                                {ach?.description ? <SafeHtml content={ach?.description} /> : ach?.description}
                            </View>
                        ))}
                    </View>
                )}
            </Page>
        </Document>
    );
};