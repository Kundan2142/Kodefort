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
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
    padding: 0,
    fontSize: 12,
    lineHeight: 1.4,
  },
  outerFrame: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
    border: 1,
    borderColor: "#e2e8f0",
    borderStyle: "solid",
    padding: 10,
  },
  innerFrame: {
    flex: 1,
    border: 1,
    borderColor: "#cbd5e1",
    borderStyle: "solid",
  },
  cornerMark: {
    position: "absolute",
    width: 22,
    height: 22,
    borderColor: "#cbd5e1",
    borderStyle: "solid",
  },
  cornerTL: {
    top: 32,
    left: 32,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  cornerTR: {
    top: 32,
    right: 32,
    borderTopWidth: 1.5,
    borderRightWidth: 1.5,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  cornerBL: {
    bottom: 32,
    left: 32,
    borderBottomWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  cornerBR: {
    bottom: 32,
    right: 32,
    borderBottomWidth: 1.5,
    borderRightWidth: 1.5,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  certId: {
    position: "absolute",
    top: 40,
    right: 64,
    alignItems: "flex-end",
  },
  certIdLabel: {
    fontSize: 8,
    color: "#cbd5e1",
    textTransform: "uppercase",
    letterSpacing: 2.5,
    marginBottom: 2,
  },
  certIdValue: {
    fontSize: 10,
    fontFamily: "Courier",
    fontWeight: "bold",
    color: "#94a3b8",
    letterSpacing: 1,
  },
  contentContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    paddingTop: 72,
    paddingLeft: 72,
    paddingRight: 72,
  },
  brand: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#0f172a",
    letterSpacing: 8,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  brandTagline: {
    fontSize: 8.5,
    textAlign: "center",
    color: "#94a3b8",
    letterSpacing: 4,
    textTransform: "uppercase",
    marginBottom: 18,
  },
  certTitle: {
    fontSize: 44,
    fontWeight: "light",
    textAlign: "center",
    color: "#0f172a",
    letterSpacing: 10,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  certSubtitle: {
    fontSize: 10,
    textAlign: "center",
    color: "#64748b",
    letterSpacing: 10,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  certDivider: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginBottom: 22,
  },
  dividerShort: {
    width: 40,
    height: 1,
    backgroundColor: "#cbd5e1",
  },
  dividerLong: {
    width: 80,
    height: 1,
    backgroundColor: "#cbd5e1",
  },
  dividerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#94a3b8",
  },
  presentedTo: {
    fontSize: 9.5,
    textAlign: "center",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 5,
    marginBottom: 12,
  },
  studentName: {
    fontSize: 38,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1e293b",
    letterSpacing: 1.5,
    marginBottom: 4,
    textTransform: "capitalize",
  },
  nameUnderline: {
    width: 420,
    height: 1.5,
    backgroundColor: "#94a3b8",
    marginHorizontal: "auto",
    marginBottom: 16,
  },
  collegeLabel: {
    fontSize: 9,
    textAlign: "center",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 3,
    marginBottom: 4,
  },
  collegeValue: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#334155",
    marginBottom: 20,
    letterSpacing: 0.3,
  },
  description: {
    fontSize: 11.5,
    textAlign: "center",
    color: "#475569",
    lineHeight: 1.7,
    marginBottom: 18,
    paddingHorizontal: 40,
  },
  topicBox: {
    alignSelf: "center",
    paddingHorizontal: 26,
    paddingVertical: 10,
    border: 1,
    borderColor: "#e2e8f0",
    borderStyle: "solid",
    borderRadius: 4,
    backgroundColor: "#f8fafc",
    marginBottom: 22,
  },
  topicLabel: {
    fontSize: 9,
    textAlign: "center",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 3,
    marginBottom: 4,
  },
  topicName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#0f172a",
    letterSpacing: 0.5,
  },
  detailsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
    paddingHorizontal: 24,
  },
  detailBlock: {
    alignItems: "flex-start",
  },
  detailLabel: {
    fontSize: 8.5,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 2.5,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#334155",
    letterSpacing: 0.3,
  },
  signaturesSection: {
    position: "absolute",
    left: 72,
    right: 72,
    bottom: 78,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  signatureBlock: {
    alignItems: "center",
    width: 200,
  },
  signatureLine: {
    width: "100%",
    height: 1,
    backgroundColor: "#334155",
    marginBottom: 8,
  },
  signatoryName: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#1e293b",
    fontSize: 12,
    letterSpacing: 0.3,
  },
  signatoryTitle: {
    fontSize: 8.5,
    textAlign: "center",
    color: "#94a3b8",
    marginTop: 2,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  footerBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
  },
  footerOrnament: {
    width: 100,
    height: 1,
    backgroundColor: "#e2e8f0",
  },
  footerText: {
    fontSize: 8,
    color: "#cbd5e1",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
});

interface CertificatePDFProps {
  studentName: string;
  collegeName: string;
  registrationNo: string;
  internshipTopic: string;
  degree: string;
  session: string;
  issueDate: string;
}

const padId = (n: string) => n.padStart(8, "0").slice(-8);

const CertificatePDF: React.FC<CertificatePDFProps> = ({
  studentName,
  collegeName,
  registrationNo,
  internshipTopic,
  degree,
  session,
  issueDate,
}) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.outerFrame}>
        <View style={styles.innerFrame} />
      </View>

      <View style={[styles.cornerMark, styles.cornerTL]} />
      <View style={[styles.cornerMark, styles.cornerTR]} />
      <View style={[styles.cornerMark, styles.cornerBL]} />
      <View style={[styles.cornerMark, styles.cornerBR]} />

      <View style={styles.certId}>
        <Text style={styles.certIdLabel}>Certificate ID</Text>
        <Text style={styles.certIdValue}>KDF-{padId(registrationNo)}</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.brand}>Kodefort</Text>
        <Text style={styles.brandTagline}>Software · Cybersecurity · Excellence</Text>

        <Text style={styles.certTitle}>Certificate</Text>
        <Text style={styles.certSubtitle}>Of Completion</Text>

        <View style={styles.certDivider}>
          <View style={styles.dividerShort} />
          <View style={styles.dividerDot} />
          <View style={styles.dividerLong} />
          <View style={styles.dividerDot} />
          <View style={styles.dividerShort} />
        </View>

        <Text style={styles.presentedTo}>This Certificate Is Proudly Presented To</Text>
        <Text style={styles.studentName}>{studentName}</Text>
        <View style={styles.nameUnderline} />

        <Text style={styles.collegeLabel}>Affiliated College / University</Text>
        <Text style={styles.collegeValue}>{collegeName}</Text>

        <Text style={styles.description}>
          In recognition of the successful completion of the structured Internship Program in
          the area of study listed below, demonstrating diligence and mastery of core concepts.
        </Text>

        <View style={styles.topicBox}>
          <Text style={styles.topicLabel}>Internship Discipline</Text>
          <Text style={styles.topicName}>{internshipTopic}</Text>
        </View>

        <View style={styles.detailsWrapper}>
          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Registration No.</Text>
            <Text style={styles.detailValue}>{registrationNo}</Text>
          </View>
          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Degree Pursued</Text>
            <Text style={styles.detailValue}>{degree}</Text>
          </View>
          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Academic Session</Text>
            <Text style={styles.detailValue}>{session}</Text>
          </View>
          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Date Issued</Text>
            <Text style={styles.detailValue}>{issueDate}</Text>
          </View>
        </View>
      </View>

      <View style={styles.signaturesSection}>
        <View style={styles.signatureBlock}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatoryName}>Program Coordinator</Text>
          <Text style={styles.signatoryTitle}>Internship Division · Kodefort</Text>
        </View>

        <View style={styles.signatureBlock}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatoryName}>Kundan Kumar</Text>
          <Text style={styles.signatoryTitle}>Director · Kodefort</Text>
        </View>
      </View>

      <View style={styles.footerBar}>
        <View style={styles.footerOrnament} />
        <Text style={styles.footerText}>Awarded by Kodefort · Valid for Official Use</Text>
        <View style={styles.footerOrnament} />
      </View>
    </Page>
  </Document>
);

export default CertificatePDF;
