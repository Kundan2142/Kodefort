import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.7,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    marginBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 20,
    borderBottom: '3px solid #1e40af', // Kodefort blue
  },
  logoSection: {
    flex: 2,
  },
  companyName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e40af',
    letterSpacing: 2,
  },
  companyTagline: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 8,
  },
  dateSection: {
    textAlign: 'right',
  },
  dateLabel: {
    fontSize: 10,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  dateValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 2,
  },
  letterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 30,
    color: '#1e293b',
    letterSpacing: 3,
    textTransform: 'uppercase',
    backgroundColor: '#eff6ff',
    paddingVertical: 12,
    borderRadius: 4,
  },
  recipientSection: {
    marginBottom: 25,
  },
  recipientText: {
    color: '#475569',
    fontSize: 11,
    marginBottom: 3,
  },
  subjectSection: {
    marginBottom: 25,
  },
  subjectText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1e40af',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  bodyText: {
    marginBottom: 12,
    color: '#334155',
    textAlign: 'justify',
  },
  detailsBox: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    padding: 18,
    marginBottom: 10,
  },
  labelValueRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    width: 140,
    fontWeight: '600',
    color: '#64748b',
  },
  value: {
    flex: 1,
    color: '#1e293b',
  },
  termsBox: {
    backgroundColor: '#fef3c7',
    borderLeft: '4px solid #f59e0b',
    padding: 15,
    borderRadius: 4,
  },
  termItem: {
    marginBottom: 8,
    color: '#78350f',
  },
  signature: {
    marginTop: 70,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  signatureBlock: {
    width: 220,
  },
  signatureLine: {
    borderTop: '2px solid #334155',
    marginTop: 40,
    marginBottom: 8,
  },
  signatoryName: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1e293b',
  },
  signatoryTitle: {
    fontSize: 10,
    textAlign: 'center',
    color: '#64748b',
    marginTop: 2,
  },
  footer: {
    marginTop: 50,
    paddingTop: 20,
    borderTop: '1px solid #e2e8f0',
    textAlign: 'center',
  },
  footerText: {
    fontSize: 9,
    color: '#94a3b8',
    marginBottom: 3,
  },
});

interface OfferLetterPDFProps {
  date: string;
  studentName: string;
  collegeName: string;
  registrationNo: string;
  email: string;
  mobileNo: string;
  internshipName: string;
}

const OfferLetterPDF: React.FC<OfferLetterPDFProps> = ({
  date,
  studentName,
  collegeName,
  registrationNo,
  email,
  mobileNo,
  internshipName,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.logoSection}>
            <Text style={styles.companyName}>KODEFORT</Text>
            <Text style={styles.companyTagline}>Empowering the Next Generation of Tech Professionals</Text>
          </View>
          <View style={styles.dateSection}>
            <Text style={styles.dateLabel}>Date</Text>
            <Text style={styles.dateValue}>{date}</Text>
          </View>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.letterTitle}>Internship Offer Letter</Text>

      {/* Recipient */}
      <View style={styles.recipientSection}>
        <Text style={styles.recipientText}>To,</Text>
        <Text style={[styles.recipientText, { fontWeight: 'bold', fontSize: 12 }]}>{studentName}</Text>
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
        <Text style={styles.sectionTitle}>Internship Details</Text>
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
            <Text style={styles.label}>Registration No:</Text>
            <Text style={styles.value}>{registrationNo}</Text>
          </View>
        </View>
      </View>

      {/* Terms and Conditions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Terms and Conditions</Text>
        <View style={styles.termsBox}>
          <Text style={styles.termItem}>
            1. This internship is structured to provide hands-on learning experience (stipend as per company policy, if applicable).
          </Text>
          <Text style={styles.termItem}>
            2. You are required to complete all assigned tasks within the given timelines.
          </Text>
          <Text style={styles.termItem}>
            3. All learning materials provided during the internship are for your personal and educational use only.
          </Text>
          <Text style={styles.termItem}>
            4. Kodefort reserves the right to terminate the internship at any time in case of violation of company policies.
          </Text>
        </View>
      </View>

      {/* Closing */}
      <View style={styles.section}>
        <Text style={styles.bodyText}>
          We are excited about the possibility of you joining our team and look forward to your valuable contributions. 
          This will be a fantastic learning journey for you!
        </Text>
        <Text style={styles.bodyText}>
          Please confirm your acceptance by signing and returning a copy of this offer letter, or by contacting us via email.
        </Text>
      </View>

      {/* Signature */}
      <View style={styles.signature}>
        <View style={styles.signatureBlock}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatoryName}>Team Kodefort</Text>
          <Text style={styles.signatoryTitle}>Kodefort</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Email: contact@kodefort.com | Website: www.kodefort.com
        </Text>
        <Text style={styles.footerText}>
          © {new Date().getFullYear()} Kodefort. All rights reserved.
        </Text>
      </View>
    </Page>
  </Document>
);

export default OfferLetterPDF;
