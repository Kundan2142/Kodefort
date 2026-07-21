import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 8,
    lineHeight: 1.7,
    backgroundColor: "#ffffff",
    padding: 0,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 595, // A4 width in points
    height: 842, // A4 height in points
    objectFit: "fill",
  },
  contentContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    paddingTop: 150,
    paddingBottom: 45,
    paddingLeft: 45,
    paddingRight: 45,
  },
  headerContainer: {
    marginBottom: 7,
  },
  dateSection: {
    textAlign: 'right',
  },
  dateLabel: {
    fontSize: 8,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  dateValue: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 2,
  },
  letterTitle: {
    fontSize: 14,
    fontWeight: 'extrabold',
    textAlign: 'center',
    marginVertical: 7,
    color: '#1e293b',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  recipientSection: {
    marginBottom: 7,
  },
  recipientText: {
    color: '#475569',
    fontSize: 8,
    marginBottom: 1.5,
  },
  subjectSection: {
    marginBottom: 7,
  },
  subjectText: {
    fontSize: 10,
    fontWeight: 'extrabold',
    color: '#1e293b',
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'extrabold',
    marginBottom: 4,
    color: '#1e40af',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  bodyText: {
    marginBottom: 5,
    color: '#334155',
    textAlign: 'justify',
    fontSize: 8,
  },
  detailsBox: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    padding: 8,
    marginBottom: 5,
  },
  labelValueRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  label: {
    width: 120,
    fontWeight: '600',
    color: '#64748b',
    fontSize: 8,
  },
  value: {
    flex: 1,
    color: '#1e293b',
    fontSize: 8,
  },
  learningOutcomesBox: {
    backgroundColor: '#eff6ff',
    border: '1px solid #dbeafe',
    borderRadius: 6,
    padding: 8,
    marginBottom: 5,
  },
  outcomeItem: {
    marginBottom: 3,
    color: '#1e3a8a',
    fontSize: 7.5,
  },
  responsibilitiesBox: {
    backgroundColor: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: 6,
    padding: 8,
    marginBottom: 5,
  },
  responsibilityItem: {
    marginBottom: 3,
    color: '#166534',
    fontSize: 7.5,
  },
  termsBox: {
    backgroundColor: '#fef3c7',
    borderLeft: '4px solid #f59e0b',
    padding: 8,
    borderRadius: 4,
  },
  termItem: {
    marginBottom: 3,
    color: '#78350f',
    fontSize: 7.5,
  },
  signatureContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 15,
  },

  signature: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  signatureBlock: {
    width: 140,
  },
  signatureImage: {
    width: 90,
    height: 35,
  },
  signatureLine: {
    borderTop: '2px solid #334155',
    marginTop: 4,
    marginBottom: 4,
  },
  signatoryName: {
    fontWeight: 'extrabold',
    textAlign: 'center',
    color: '#1e293b',
    fontSize: 9,
  },
  signatoryTitle: {
    fontSize: 7,
    textAlign: 'center',
    color: '#64748b',
    marginTop: 1,
  },
});

interface OfferLetterPDFProps {
  studentName: string;
  collegeName: string;
  registrationNo: string;
  email: string;
  mobileNo: string;
  internshipName: string;
}

const OfferLetterPDF: React.FC<OfferLetterPDFProps> = ({
  studentName,
  collegeName,
  registrationNo,
  email,
  mobileNo,
  internshipName,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Background Letterhead FIRST, wrapped in zero-size View */}
      <View style={{ position: "absolute", top: 0, left: 0, width: 0, height: 0 }}>
        <Image src="/ofr.jpg" style={styles.backgroundImage} />
      </View>
      {/* Content Container */}
      <View style={styles.contentContainer}>
      {/* Title */}
      <Text style={styles.letterTitle}>INTERNSHIP OFFER LETTER</Text>

      {/* Recipient */}
      <View style={styles.recipientSection}>
        <Text style={styles.recipientText}>To,</Text>
        <Text style={[styles.recipientText, { fontWeight: 'extrabold', fontSize: 9 }]}>{studentName}</Text>
        <Text style={styles.recipientText}>{collegeName}</Text>
        <Text style={styles.recipientText}>Email: {email}</Text>
        <Text style={styles.recipientText}>Mobile: {mobileNo}</Text>
      </View>

      {/* Subject */}
      <View style={styles.subjectSection}>
        <Text style={styles.subjectText}>Subject: Offer of Internship for {internshipName}</Text>
      </View>

      {/* Body */}
      <View style={styles.section}>
        <Text style={styles.bodyText}>Dear {studentName},</Text>
        <Text style={styles.bodyText}>
          We are delighted to formally offer you an internship position at Kodefort for the {internshipName} program.
          This internship has been carefully designed to provide you with practical, hands-on experience
          and equip you with industry-relevant skills in your chosen field of technology.
        </Text>
      </View>



      {/* Internship Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>INTERNSHIP DETAILS</Text>
        <View style={styles.detailsBox}>
          <View style={styles.labelValueRow}>
            <Text style={styles.label}>Internship Title:</Text>
            <Text style={styles.value}>{internshipName}</Text>
          </View>
          <View style={styles.labelValueRow}>
            <Text style={styles.label}>Mode:</Text>
            <Text style={styles.value}>Hybrid (Online)</Text>
          </View>
          <View style={styles.labelValueRow}>
            <Text style={styles.label}>Duration:</Text>
            <Text style={styles.value}>120 Hours</Text>
          </View>
          <View style={styles.labelValueRow}>
            <Text style={styles.label}>Registration No:</Text>
            <Text style={styles.value}>{registrationNo}</Text>
          </View>
        </View>
      </View>

      {/* Learning Outcomes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>LEARNING OUTCOMES</Text>
        <View style={styles.learningOutcomesBox}>
          <Text style={styles.outcomeItem}>• Gain practical experience with industry-standard tools & technologies</Text>
          <Text style={styles.outcomeItem}>• Work on live projects and real-world use cases</Text>
          <Text style={styles.outcomeItem}>• Develop problem-solving and collaborative skills</Text>
          <Text style={styles.outcomeItem}>• Build a professional portfolio to showcase your work</Text>
        </View>
      </View>

      {/* Key Responsibilities */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>KEY RESPONSIBILITIES</Text>
        <View style={styles.responsibilitiesBox}>
          <Text style={styles.responsibilityItem}>• Attend all training sessions and complete assigned modules</Text>
          <Text style={styles.responsibilityItem}>• Collaborate with the team on project development tasks</Text>
          <Text style={styles.responsibilityItem}>• Submit weekly progress reports and project updates</Text>
          <Text style={styles.responsibilityItem}>• Participate in code reviews and team discussions</Text>
        </View>
      </View>

      {/* Terms and Conditions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TERMS AND CONDITIONS</Text>
        <View style={styles.termsBox}>
          <Text style={styles.termItem}>
            1. This internship provides a structured learning experience (stipend as per company policy, if applicable).
          </Text>
          <Text style={styles.termItem}>
            2. Complete all assigned tasks within specified timelines with quality standards.
          </Text>
          <Text style={styles.termItem}>
            3. All materials provided are for personal educational use only; confidential.
          </Text>
          <Text style={styles.termItem}>
            4. Kodefort reserves termination rights for policy violations or non-performance.
          </Text>
        </View>
      </View>

      {/* Closing */}
      <View style={styles.section}>
        <Text style={styles.bodyText}>
          We are excited about you joining our team and look forward to your valuable contributions.
          This will be an exceptional learning journey!
        </Text>
        <Text style={styles.bodyText}>
          Please confirm your acceptance by signing and returning a copy of this offer letter, or contacting us via email.
        </Text>
      </View>

      {/* Signature */}
      <View style={styles.signatureContainer}>
        <View style={styles.signature}>
          <View style={styles.signatureBlock}>
            <Image src="/sign.jpeg" style={styles.signatureImage} />
            <View style={styles.signatureLine} />
            <Text style={styles.signatoryName}>Kundan Kumar</Text>
            <Text style={styles.signatoryTitle}>Kodefort</Text>
          </View>
        </View>
      </View>

      </View>
    </Page>
  </Document>
);

export default OfferLetterPDF;
