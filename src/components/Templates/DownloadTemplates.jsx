import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';
import { Html } from 'react-pdf-html';
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
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
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
        marginTop: 5,
        lineHeight: 1.2,
        position: 'relative',
        right: 10,
        left: 0,
        top: 0,
    },

    listItem: {
        flexDirection: 'row',
        marginBottom: 2,
    },
    bullet: {
        width: 10,
        fontSize: 10,
    },
    listItemContent: {
        flex: 1,
        fontSize: 10,
    },
});



// Main PDF Component
export const Template1Pdf = ({ resumeData }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.name}>{resumeData.personalInfo.name}</Text>
                    <View style={styles.contact}>
                        <Text style={styles.contactItem}>{resumeData.personalInfo.phone}</Text>
                        <Text style={styles.contactItem}>•</Text>
                        <Text style={styles.contactItem}>{resumeData.personalInfo.email}</Text>
                        <Text style={styles.contactItem}>•</Text>
                        <Text style={styles.contactItem}>linkedin.com</Text>
                        <Text style={styles.contactItem}>•</Text>
                        <Text style={styles.contactItem}>github.com</Text>
                        <Text style={styles.contactItem}>•</Text>
                        <Text style={styles.contactItem}>vanshchavda.me</Text>
                    </View>
                </View>

                {/* Work Experience */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Work Experience</Text>
                    {resumeData?.experience?.map((exp, index) => (
                        <View key={index} style={{ marginBottom: 10 }}>
                            <Text style={styles.companyTitle}>{exp.company} - {exp.title}</Text>
                            <Text style={styles.dateLocation}>{exp.location} ({exp.duration})</Text>
                            {/* Render description using Html component */}
                            <Html style={styles.htmlStyles}>{exp.description}</Html>
                        </View>
                    ))}
                </View>

                {/* Education */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Education</Text>
                    {resumeData?.education?.map((edu, index) => (
                        <View key={index} style={{ marginBottom: 10 }}>
                            <Text style={styles.companyTitle}>{edu.institution}</Text>
                            <Text style={styles.dateLocation}>{edu.duration}</Text>
                            <Text>{edu.degree}</Text>
                            <Text>{edu.location}</Text>
                        </View>
                    ))}
                </View>

                {/* Projects */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Projects</Text>
                    {resumeData?.projects?.map((proj, index) => (
                        <View key={index} style={{ marginBottom: 10 }}>
                            <Text style={styles.companyTitle}>{proj.name}</Text>
                            <Text style={styles.dateLocation}>{proj.link}</Text>
                            <Text>
                                <Text style={{ fontWeight: 'bold' }}>Tech Stack:</Text> {proj.technologies.join(', ')}
                            </Text>
                            <Html style={styles.htmlStyles}>{proj.description}</Html>
                        </View>
                    ))}
                </View>

                {/* Technical Skills */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Technical Skills</Text>
                    {Object.entries(resumeData.technicalSkills).map(([category, skills]) => (
                        <View key={category} style={{ marginBottom: 5 }}>
                            <Text style={{ fontWeight: 'bold' }}>{category}:</Text>
                            <Text>{skills.join(', ')}</Text>
                        </View>
                    ))}
                </View>

                {/* Achievements and Certifications */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Achievements and Certifications</Text>
                    {resumeData?.achievementsAndCertifications?.map((ach, index) => (
                        <View key={index} style={{ marginBottom: 5 }}>
                            <Text>
                                <Text style={{ fontWeight: 'bold' }}>{ach.title}</Text>
                                {ach.year && ` – ${ach.year}`}
                            </Text>
                            {ach.description && <Html style={styles.htmlStyles}>{ach.description}</Html>}
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );
};
