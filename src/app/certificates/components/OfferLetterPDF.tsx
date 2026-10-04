import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';

const PAGE_W = 595;

const LEFT = 45;
const RIGHT = 45;

const CONTENT_W = PAGE_W - LEFT - RIGHT;

const NAVY = '#12294D';
const BLUE = '#2A5AA6';
const GREY_900 = '#1F2937';
const GREY_700 = '#374151';
const GREY_500 = '#6B7280';
const GREY_050 = '#F8FAFC';
const WHITE = '#FFFFFF';

const COMPANY = {
  name: 'KODEFORT',
  website: 'www.kodefort.com',
  phone: '+91 6207525287',
  email: 'kundan@kodefort.com',
  location: 'Gaya, Bihar, India',
  signatory: 'Kundan Kumar',
  tagline: 'Build. Learn. Deploy.',
};

const F = {
  TINY: 7.5,
  SMALL: 8.2,
  BASE: 9,
  MID: 9.4,
  BODY: 9.8,
  LABEL: 8.4,
  NAME: 11,
  TITLE: 16.5,
  LABEL_BOLD: 8.6,
  SECTION: 9.8,
  SIG: 9.8,
  META: 9,
  REGARDS: 9,
  NOTE: 8.6,
  SIG_TITLE: 8.4,
};

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: WHITE,
    padding: 0,
  },
  flow: {
    width: PAGE_W,
    paddingLeft: LEFT,
    paddingRight: RIGHT,
    paddingTop: 0,
    paddingBottom: 0,
  },

  topNavyStrip: {
    width: PAGE_W,
    marginLeft: -LEFT,
    height: 11,
    backgroundColor: NAVY,
  },

  header: {
    paddingTop: 14,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  logoWrap: {
    width: 37,
    height: 31,
    marginRight: 14,
  },
  logoImg: {
    width: 37,
    height: 31,
  },
  hdrText: { flex: 1 },
  hdrName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: NAVY,
    marginBottom: 3,
  },
  hdrTag: {
    fontSize: F.SMALL,
    color: BLUE,
    fontStyle: 'italic',
    marginBottom: 2.5,
  },
  hdrSub: {
    fontSize: F.SMALL,
    color: GREY_500,
  },

  divider: {
    width: CONTENT_W,
    height: 1,
    backgroundColor: NAVY,
    marginBottom: 18,
  },

  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  metaL: { fontSize: F.META, color: GREY_700 },
  metaR: { fontSize: F.META, color: BLUE, textAlign: 'right' },

  titleWrap: { alignItems: 'center', marginBottom: 20 },
  title: {
    fontSize: F.TITLE,
    fontWeight: 'bold',
    color: NAVY,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  titleAccent: {
    marginTop: 5,
    width: 80,
    height: 3,
    backgroundColor: BLUE,
  },

  recipBox: {
    backgroundColor: GREY_050,
    borderWidth: 1.1,
    borderColor: NAVY,
    borderLeftWidth: 2.6,
    borderLeftColor: BLUE,
    paddingVertical: 5,
    paddingHorizontal: 7,
    marginBottom: 18,
  },
  recipTo: {
    fontSize: F.SMALL,
    color: BLUE,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  recipName: {
    fontSize: F.NAME,
    color: NAVY,
    fontWeight: 'bold',
    marginBottom: 1.5,
  },
  recipRole: {
    fontSize: F.NOTE,
    color: GREY_500,
    fontStyle: 'italic',
    marginBottom: 2,
  },
  recipClg: {
    fontSize: F.MID,
    color: GREY_900,
    marginBottom: 1,
  },
  recipContact: {
    fontSize: F.NOTE,
    color: GREY_700,
    marginTop: 3,
  },

  subject: {
    fontSize: F.BODY,
    color: NAVY,
    marginBottom: 14,
  },

  salutation: {
    fontSize: 10,
    color: NAVY,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  bodyP: {
    fontSize: 9.2,
    lineHeight: 1.45,
    color: GREY_900,
    marginBottom: 11,
  },

  sectionTitle: {
    fontSize: F.SECTION,
    fontWeight: 'bold',
    color: NAVY,
    marginTop: 8,
    marginBottom: 6,
  },

  studTable: {
    borderWidth: 1.1,
    borderColor: NAVY,
    marginBottom: 8,
  },
  tHeadRow: {
    flexDirection: 'row',
    backgroundColor: NAVY,
    paddingVertical: 3.5,
    paddingHorizontal: 6,
  },
  tRowW: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderTopWidth: 0.5,
    borderTopColor: GREY_700,
  },
  tRowG: {
    flexDirection: 'row',
    backgroundColor: GREY_050,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderTopWidth: 0.5,
    borderTopColor: GREY_700,
  },
  tSep: { width: 0.5, backgroundColor: GREY_700 },

  cLab: { width: '17%', paddingRight: 3, justifyContent: 'center' },
  cVal: { width: '33%', paddingRight: 3, justifyContent: 'center' },

  hdrLab: { fontSize: F.LABEL_BOLD, color: WHITE, fontWeight: 'bold' },
  hdrVal: { fontSize: F.BASE, color: WHITE, fontWeight: 'bold' },
  cellLab: { fontSize: F.LABEL, color: GREY_700, fontWeight: 'bold' },
  cellVal: { fontSize: F.BODY, color: GREY_900 },

  addrBox: {
    borderWidth: 1.1,
    borderColor: NAVY,
    flexDirection: 'row',
    paddingVertical: 3.5,
    paddingHorizontal: 7,
    marginBottom: 18,
  },
  addrLabCell: {
    width: '14%',
    backgroundColor: GREY_050,
    paddingHorizontal: 0,
    justifyContent: 'center',
  },
  addrLab: {
    fontSize: F.SMALL,
    color: BLUE,
    fontWeight: 'bold',
  },
  addrValCell: { width: '86%', paddingLeft: 6 },
  addrVal: { fontSize: F.BASE, color: GREY_900 },

  termsTbl: {
    borderWidth: 1.1,
    borderColor: NAVY,
    marginBottom: 20,
  },
  trmHRow: {
    flexDirection: 'row',
    backgroundColor: NAVY,
    paddingVertical: 3.5,
    paddingHorizontal: 6,
  },
  trmHNo: {
    width: '8%',
    fontSize: F.LABEL_BOLD,
    color: WHITE,
    fontWeight: 'bold',
    paddingRight: 6,
  },
  trmHTx: {
    width: '92%',
    fontSize: F.BASE,
    color: WHITE,
    fontWeight: 'bold',
    paddingLeft: 6,
  },
  trmBRow: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: GREY_700,
    paddingVertical: 3.5,
    paddingHorizontal: 6,
  },
  trmNoCell: {
    width: '8%',
    backgroundColor: GREY_050,
    borderRightWidth: 1.6,
    borderRightColor: BLUE,
    paddingRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trmNo: { fontSize: 10.8, fontWeight: 'bold', color: BLUE },
  trmTxCell: { width: '92%', paddingLeft: 6 },
  trmTx: { fontSize: F.BODY, color: GREY_900 },

  sigOuter: { flexDirection: 'row', alignItems: 'flex-end' },
  sigNoteCol: {
    width: '55%',
    paddingRight: 10,
    borderRightWidth: 0.9,
    borderRightColor: NAVY,
    justifyContent: 'flex-end',
  },
  sigNote: {
    fontSize: F.NOTE,
    color: GREY_500,
    fontStyle: 'italic',
    lineHeight: 1.4,
  },
  sigRCol: { width: '45%', paddingLeft: 10, justifyContent: 'flex-end' },
  regards: { fontSize: F.REGARDS, color: GREY_700, marginBottom: 6 },
  sigImgWrap: { width: 165, height: 50 },
  sigImg: { width: 165, height: 50 },
  sigLine: { width: 175, height: 1, backgroundColor: NAVY, marginTop: 8 },
  sigName: {
    fontSize: F.SIG,
    fontWeight: 'bold',
    color: NAVY,
    marginTop: 8,
  },
  sigTitle: { fontSize: F.SIG_TITLE, color: GREY_500, marginTop: 3 },
  sigOrg: {
    fontSize: F.SIG_TITLE,
    fontWeight: 'bold',
    color: GREY_700,
    marginTop: 3,
  },

  fSpacer: { height: 30 },
  fDivider: {
    width: CONTENT_W,
    height: 0.8,
    backgroundColor: GREY_700,
    marginTop: 15,
  },
  fRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  fL: { fontSize: F.TINY, color: GREY_500 },
  fR: { fontSize: F.TINY, color: GREY_500, textAlign: 'right' },
});

interface Props {
  studentName: string;
  collegeName: string;
  registrationNo: string;
  degree: string;
  session: string;
  subject: string;
  internshipTopic: string;
  email: string;
  mobileNo: string;
  address: string;
  issueDate: string;
  referenceNo?: string;
  rowNumber?: number;
}

const pad0 = (n: number, w: number) => String(n).padStart(w, '0');

const OfferLetterPDF: React.FC<Props> = ({
  studentName,
  collegeName,
  registrationNo,
  degree,
  session,
  subject,
  internshipTopic,
  email,
  mobileNo,
  address,
  issueDate,
  referenceNo,
  rowNumber = 1,
}) => {
  const ref = referenceNo || `KDF/INT/202607/${pad0(rowNumber, 5)}`;

  const terms = [
    'This internship provides a structured learning experience (stipend as per company policy, if applicable).',
    'Complete all assigned tasks within the specified timelines and in line with Kodefort quality standards.',
    'All study materials, credentials and project access provided remain for personal educational use only and are strictly confidential.',
    'Kodefort reserves the right to terminate the internship at any time for non-performance or breach of company policy.',
  ];

  const rows: Array<[string, string, string, string]> = [
    ['Registration No.', registrationNo, 'Degree', degree],
    ['Session', session, 'Subject', subject],
    ['Internship Topic', internshipTopic, 'Internship Period', '20 July 2026 – 10 August 2026'],
    ['Mode', 'Hybrid (Online)', 'Duration', '22 Days'],
  ];

  const B = (children: string) => (
    <Text style={{ fontWeight: 'bold' }}>{children}</Text>
  );

  return (
    <Document
      title={`Internship Offer Letter - ${studentName}`}
      author="KODEFORT"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.flow} wrap={false}>
          {/* Top navy strip */}
          <View style={styles.topNavyStrip} />

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoWrap}>
              <Image src="/logo.png" style={styles.logoImg} />
            </View>
            <View style={styles.hdrText}>
              <Text style={styles.hdrName}>{COMPANY.name}</Text>
              <Text style={styles.hdrTag}>{COMPANY.tagline}</Text>
              <Text style={styles.hdrSub}>
                {COMPANY.location}   |   {COMPANY.email}   |   {COMPANY.website}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Meta */}
          <View style={styles.metaRow}>
            <Text style={styles.metaL}>
              {B('Date of Issue:')} {issueDate}
            </Text>
            <Text style={styles.metaR}>
              {B('Reference No:')} {ref}
            </Text>
          </View>

          {/* Title */}
          <View style={styles.titleWrap}>
            <Text style={styles.title}>INTERNSHIP OFFER LETTER</Text>
            <View style={styles.titleAccent} />
          </View>

          {/* Recipient */}
          <View style={styles.recipBox}>
            <Text style={styles.recipTo}>TO,</Text>
            <Text style={styles.recipName}>{studentName}</Text>
            <Text style={styles.recipRole}>Internship Candidate</Text>
            <Text style={styles.recipClg}>{collegeName}</Text>
            <Text style={styles.recipContact}>
              {B('Email:')} {email}
              {'   |   '}
              {B('Mobile:')} {mobileNo}
            </Text>
          </View>

          {/* Subject */}
          <Text style={styles.subject}>
            {B('Subject:')} Offer of Internship for {internshipTopic}
          </Text>

          {/* Body */}
          <Text style={styles.salutation}>Dear {studentName},</Text>

          <Text style={styles.bodyP}>
            We are delighted to formally offer you an internship position at{' '}
            <Text style={{ fontWeight: 'bold' }}>{COMPANY.name}</Text> for the{' '}
            <Text style={{ fontWeight: 'bold' }}>{internshipTopic}</Text> program.
            This internship has been carefully designed to provide you with practical,
            hands-on experience and equip you with industry-relevant skills in your
            chosen field of study.
          </Text>

          <Text style={styles.bodyP}>
            Your registration details have been verified against the records submitted:{' '}
            <Text style={{ fontWeight: 'bold' }}>
              {degree} — {session}
            </Text>{' '}
            in <Text style={{ fontWeight: 'bold' }}>{subject}</Text> at{' '}
            <Text style={{ fontWeight: 'bold' }}>{collegeName}</Text>. Your
            Registration No. is{' '}
            <Text style={{ fontWeight: 'bold' }}>{registrationNo}</Text>. The
            internship will be conducted in a{' '}
            <Text style={{ fontWeight: 'bold' }}>Hybrid (Online)</Text> mode and
            includes access to live projects, mentorship, and weekly progress reviews.
          </Text>

          <Text style={styles.bodyP}>
            Upon successful completion of the internship, you will receive a course
            completion certificate and a performance-based letter of recommendation.
            Please review the Terms &amp; Conditions below and respond with your
            acceptance at your earliest convenience.
          </Text>

          {/* Student details table */}
          <Text style={styles.sectionTitle}>STUDENT / INTERN DETAILS</Text>
          <View style={styles.studTable}>
            <View style={styles.tHeadRow}>
              <View style={styles.cLab}>
                <Text style={styles.hdrLab}>FIELD</Text>
              </View>
              <View style={styles.cVal}>
                <Text style={styles.hdrVal}>VALUE</Text>
              </View>
              <View style={styles.tSep} />
              <View style={styles.cLab}>
                <Text style={styles.hdrLab}>FIELD</Text>
              </View>
              <View style={styles.cVal}>
                <Text style={styles.hdrVal}>VALUE</Text>
              </View>
            </View>
            {rows.map((r, i) => (
              <View key={i} style={i % 2 === 0 ? styles.tRowW : styles.tRowG}>
                <View style={styles.cLab}>
                  <Text style={styles.cellLab}>{r[0].toUpperCase()}</Text>
                </View>
                <View style={styles.cVal}>
                  <Text style={styles.cellVal}>{r[1]}</Text>
                </View>
                <View style={styles.tSep} />
                <View style={styles.cLab}>
                  <Text style={styles.cellLab}>{r[2].toUpperCase()}</Text>
                </View>
                <View style={styles.cVal}>
                  <Text style={styles.cellVal}>{r[3]}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Address box */}
          <View style={styles.addrBox}>
            <View style={styles.addrLabCell}>
              <Text style={styles.addrLab}>ADDRESS</Text>
            </View>
            <View style={styles.addrValCell}>
              <Text style={styles.addrVal}>{address}</Text>
            </View>
          </View>

          {/* Terms & Conditions */}
          <Text style={styles.sectionTitle}>TERMS &amp; CONDITIONS</Text>
          <View style={styles.termsTbl}>
            <View style={styles.trmHRow}>
              <Text style={styles.trmHNo}>#</Text>
              <Text style={styles.trmHTx}>TERMS &amp; CONDITIONS</Text>
            </View>
            {terms.map((t, i) => (
              <View key={i} style={styles.trmBRow}>
                <View style={styles.trmNoCell}>
                  <Text style={styles.trmNo}>{pad0(i + 1, 2)}</Text>
                </View>
                <View style={styles.trmTxCell}>
                  <Text style={styles.trmTx}>{t}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Signature */}
          <View style={styles.sigOuter}>
            <View style={styles.sigNoteCol}>
              <Text style={styles.sigNote}>
                Please confirm your acceptance by signing and returning a copy of
                this offer letter, or contacting us via email.
              </Text>
            </View>
            <View style={styles.sigRCol}>
              <Text style={styles.regards}>With best regards,</Text>
              <View style={styles.sigImgWrap}>
                <Image src="/sign.jpeg" style={styles.sigImg} />
              </View>
              <View style={styles.sigLine} />
              <Text style={styles.sigName}>{COMPANY.signatory}</Text>
              <Text style={styles.sigTitle}>Authorized Signatory</Text>
              <Text style={styles.sigOrg}>{COMPANY.name}</Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.fSpacer} />
          <View style={styles.fDivider} />
          <View style={styles.fRow}>
            <Text style={styles.fL}>
              {COMPANY.name}   |   {COMPANY.location}
            </Text>
            <Text style={styles.fR}>
              {COMPANY.email}   |   {COMPANY.website}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default OfferLetterPDF;
