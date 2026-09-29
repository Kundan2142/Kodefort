import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';

// ---- LAYOUT CONSTANTS (A4 LANDSCAPE: 842 x 595 pt) ----
const PAGE_W = 842;
const PAGE_H = 595;
const FRAME = 22;             // outer frame inset
const INNER_PAD = 56;         // side padding for content
const CONTENT_W = PAGE_W - 2 * INNER_PAD; // 730

const V_START = 48;           // reduced top padding so content fits on one page

const FONT = {
  BRAND: 13,
  BRAND_TAG: 8,
  TITLE: 34,                  // slightly reduced
  SUBTITLE: 9.5,
  PRESENTED: 9,
  NAME: 28,                   // slightly reduced
  LABEL: 8,
  COLLEGE: 12,
  DESC: 10.5,
  TOPIC_LABEL: 8,
  TOPIC_VAL: 16,
  GRID_LABEL: 8,
  GRID_VAL: 11,
  SIG_NAME: 11,
  SIG_TITLE: 8,
  FOOTER: 7.5,
  ID_LABEL: 7.5,
  ID_VAL: 9.5,
};

const TRACK = {
  BRAND: 7,
  BRAND_TAG: 3.5,
  TITLE: 8,
  SUBTITLE: 8,
  PRESENTED: 4.5,
  LABEL: 2.5,
  GRID_LABEL: 2,
  SIG_TITLE: 1.5,
  FOOTER: 2.5,
  ID_LABEL: 2,
};

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFEFC',
    padding: 0,
    lineHeight: 1.2,
    position: 'relative',
  },
  outerFrame: {
    position: 'absolute',
    top: FRAME,
    left: FRAME,
    right: FRAME,
    bottom: FRAME,
    border: 1,
    borderColor: '#E8E1D5',
    borderStyle: 'solid',
    padding: 10,
  },
  innerFrame: {
    flex: 1,
    border: 1,
    borderColor: '#D8C8A8',
    borderStyle: 'solid',
  },
  cornerMark: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderColor: '#D8C8A8',
    borderStyle: 'solid',
  },
  cornerTL: {
    top: FRAME + 10,
    left: FRAME + 10,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  cornerTR: {
    top: FRAME + 10,
    right: FRAME + 10,
    borderTopWidth: 1.5,
    borderRightWidth: 1.5,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  cornerBL: {
    bottom: FRAME + 10,
    left: FRAME + 10,
    borderBottomWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  cornerBR: {
    bottom: FRAME + 10,
    right: FRAME + 10,
    borderBottomWidth: 1.5,
    borderRightWidth: 1.5,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  certId: {
    position: 'absolute',
    top: 36,
    right: INNER_PAD,
    alignItems: 'flex-end',
  },
  certIdLabel: {
    fontSize: FONT.ID_LABEL,
    color: '#D8C8A8',
    textTransform: 'uppercase',
    letterSpacing: TRACK.ID_LABEL,
    marginBottom: 2,
  },
  certIdValue: {
    fontSize: FONT.ID_VAL,
    fontFamily: 'Courier',
    fontWeight: 'bold',
    color: '#82939B',
    letterSpacing: 1,
  },

  // ===================== FLOW CONTENT =====================
  flow: {
    width: CONTENT_W,
    marginLeft: INNER_PAD,
    marginRight: INNER_PAD,
    paddingTop: V_START,
    paddingBottom: 20,
  },
  brand: {
    fontSize: FONT.BRAND,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#173B4A',
    letterSpacing: TRACK.BRAND,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  brandTag: {
    fontSize: FONT.BRAND_TAG,
    textAlign: 'center',
    color: '#82939B',
    letterSpacing: TRACK.BRAND_TAG,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  title: {
    fontSize: FONT.TITLE,
    fontWeight: 'light',
    textAlign: 'center',
    color: '#173B4A',
    letterSpacing: TRACK.TITLE,
    textTransform: 'uppercase',
    // Give the large heading enough vertical room so the subtitle cannot overlap it.
    lineHeight: 1.2,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: FONT.SUBTITLE,
    textAlign: 'center',
    color: '#607781',
    letterSpacing: TRACK.SUBTITLE,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 12,
  },
  divS: { width: 36, height: 1, backgroundColor: '#D8C8A8' },
  divL: { width: 70, height: 1, backgroundColor: '#D8C8A8' },
  divDot: {
    width: 3.5,
    height: 3.5,
    borderRadius: 2,
    backgroundColor: '#B89A5A',
  },
  presented: {
    fontSize: FONT.PRESENTED,
    textAlign: 'center',
    color: '#82939B',
    textTransform: 'uppercase',
    letterSpacing: TRACK.PRESENTED,
    marginBottom: 10,
  },
  name: {
    fontSize: FONT.NAME,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#173B4A',
    letterSpacing: 1,
    textTransform: 'capitalize',
    lineHeight: 1.1,
  },
  nameWrap: {
    height: FONT.NAME * 1.1 + 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  underline: {
    width: 380,
    height: 1.5,
    backgroundColor: '#B89A5A',
    marginTop: 6,
    marginHorizontal: (CONTENT_W - 380) / 2,
  },
  collegeLabel: {
    marginTop: 10,
    fontSize: FONT.LABEL,
    textAlign: 'center',
    color: '#82939B',
    textTransform: 'uppercase',
    letterSpacing: TRACK.LABEL,
    marginBottom: 3,
  },
  collegeValue: {
    fontSize: FONT.COLLEGE,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#35515C',
    letterSpacing: 0.3,
    marginBottom: 0,
  },
  description: {
    marginTop: 10,
    fontSize: FONT.DESC,
    textAlign: 'center',
    color: '#52666E',
    lineHeight: 1.5,
    paddingHorizontal: 40,
  },
  topicWrap: {
    marginTop: 10,
    alignSelf: 'center',
    paddingHorizontal: 22,
    paddingVertical: 7,
    border: 1,
    borderColor: '#E8E1D5',
    borderStyle: 'solid',
    borderRadius: 4,
    backgroundColor: '#F4F8F8',
  },
  topicLabel: {
    fontSize: FONT.TOPIC_LABEL,
    textAlign: 'center',
    color: '#82939B',
    textTransform: 'uppercase',
    letterSpacing: TRACK.LABEL,
    marginBottom: 3,
  },
  topicValue: {
    fontSize: FONT.TOPIC_VAL,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#173B4A',
    letterSpacing: 0.3,
  },

  // ===================== 2-COLUMN INFO GRID =====================
  grid: {
    marginTop: 14,
    flexDirection: 'column',
    width: CONTENT_W - 80,
    marginHorizontal: 40,
    border: 1,
    borderColor: '#E8E1D5',
    borderStyle: 'solid',
    borderRadius: 4,
    backgroundColor: '#FBF9F4',
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  // Each grid row explicitly contains two side-by-side cells. This keeps all
  // values inside the shaded box instead of relying on flex-wrap calculations.
  gridRow: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 12,
  },
  gridRowBottom: {
    width: '100%',
    flexDirection: 'row',
  },
  gridCell: {
    width: '50%',
    minWidth: 0,
  },
  gridLabel: {
    fontSize: FONT.GRID_LABEL,
    color: '#82939B',
    textTransform: 'uppercase',
    letterSpacing: TRACK.GRID_LABEL,
    marginBottom: 3,
  },
  gridValue: {
    fontSize: FONT.GRID_VAL,
    fontWeight: 'bold',
    color: '#35515C',
    letterSpacing: 0.2,
  },

  // ===================== SIGNATURE SECTION (IN FLOW) =====================
  sigRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  sigBlock: {
    width: CONTENT_W * 0.38,
  },
  sigArea: {
    height: 48,                 // compact signing space
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#AABBC0',
    borderBottomStyle: 'solid',
  },
  sigMeta: {
    paddingTop: 6,
  },
  sigName: {
    fontSize: FONT.SIG_NAME,
    fontWeight: 'bold',
    color: '#173B4A',
    letterSpacing: 0.2,
  },
  sigTitle: {
    fontSize: FONT.SIG_TITLE,
    color: '#82939B',
    textTransform: 'uppercase',
    letterSpacing: TRACK.SIG_TITLE,
    marginTop: 2,
  },

  // ===================== FOOTER (IN FLOW) =====================
  footer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  footerLine: {
    width: 80,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  footerText: {
    fontSize: FONT.FOOTER,
    color: '#D8C8A8',
    letterSpacing: TRACK.FOOTER,
    textTransform: 'uppercase',
  },
});

interface Props {
  studentName: string;
  collegeName: string;
  registrationNo: string;
  internshipTopic: string;
  degree: string;
  session: string;
  issueDate: string;
}

// Preserve the full registration number – do not truncate
const padId = (n: string) => n.padStart(8, '0');

const CertificatePDF: React.FC<Props> = ({
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
      {/* ---- decorative frame ---- */}
      <View style={styles.outerFrame}>
        <View style={styles.innerFrame} />
      </View>
      <View style={[styles.cornerMark, styles.cornerTL]} />
      <View style={[styles.cornerMark, styles.cornerTR]} />
      <View style={[styles.cornerMark, styles.cornerBL]} />
      <View style={[styles.cornerMark, styles.cornerBR]} />

      {/* ---- cert id ---- */}
      <View style={styles.certId}>
        <Text style={styles.certIdLabel}>Certificate ID</Text>
        <Text style={styles.certIdValue}>KDF-{padId(registrationNo)}</Text>
      </View>

      {/* ===================== MAIN FLOW (everything in document order) ===================== */}
      <View style={styles.flow} wrap={false}>
        <Text style={styles.brand}>Kodefort</Text>
        <Text style={styles.brandTag}>Software · Cybersecurity · Excellence</Text>

        <Text style={styles.title}>Certificate</Text>
        <Text style={styles.subtitle}>Of Completion</Text>

        <View style={styles.divider}>
          <View style={styles.divS} />
          <View style={styles.divDot} />
          <View style={styles.divL} />
          <View style={styles.divDot} />
          <View style={styles.divS} />
        </View>

        <Text style={styles.presented}>This Certificate Is Proudly Presented To</Text>

        <View style={styles.nameWrap}>
          <Text style={styles.name}>{studentName}</Text>
        </View>
        <View style={styles.underline} />

        <Text style={styles.collegeLabel}>Affiliated College / University</Text>
        <Text style={styles.collegeValue}>{collegeName}</Text>

        <Text style={styles.description}>
          In recognition of the successful completion of the structured Internship Program,
          demonstrating diligence, mastery of core concepts, and commitment to professional growth.
        </Text>

        <View style={styles.topicWrap}>
          <Text style={styles.topicLabel}>Internship Discipline</Text>
          <Text style={styles.topicValue}>{internshipTopic}</Text>
        </View>

        {/* ---- 2-COLUMN INFO GRID ---- */}
        <View style={styles.grid}>
          <View style={styles.gridRow}>
            <View style={styles.gridCell}>
              <Text style={styles.gridLabel}>Registration No.</Text>
              <Text style={styles.gridValue}>{registrationNo}</Text>
            </View>
            <View style={styles.gridCell}>
              <Text style={styles.gridLabel}>Degree Pursued</Text>
              <Text style={styles.gridValue}>{degree}</Text>
            </View>
          </View>
          <View style={styles.gridRowBottom}>
            <View style={styles.gridCell}>
              <Text style={styles.gridLabel}>Academic Session</Text>
              <Text style={styles.gridValue}>{session}</Text>
            </View>
            <View style={styles.gridCell}>
              <Text style={styles.gridLabel}>Date Issued</Text>
              <Text style={styles.gridValue}>{issueDate}</Text>
            </View>
          </View>
        </View>

        {/* ---- SIGNATURE ROW (now in normal flow) ---- */}
        <View style={styles.sigRow}>
          <View style={styles.sigBlock}>
            <View style={styles.sigArea} />
            <View style={styles.sigMeta}>
              <Text style={styles.sigName}>Program Coordinator</Text>
              <Text style={styles.sigTitle}>Internship Division · Kodefort</Text>
            </View>
          </View>

          <View style={styles.sigBlock}>
            <View style={styles.sigArea} />
            <View style={styles.sigMeta}>
              <Text style={styles.sigName}>Kundan Kumar</Text>
              <Text style={styles.sigTitle}>Director · Kodefort</Text>
            </View>
          </View>
        </View>

        {/* ---- FOOTER (now in normal flow) ---- */}
        <View style={styles.footer}>
          <View style={styles.footerLine} />
          <Text style={styles.footerText}>Awarded by Kodefort · Valid for Official Use</Text>
          <View style={styles.footerLine} />
        </View>
      </View>
    </Page>
  </Document>
);

export default CertificatePDF;