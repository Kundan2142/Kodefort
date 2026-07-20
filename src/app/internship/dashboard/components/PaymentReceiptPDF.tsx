import React from 'react';
import {
  Document,
  Page,
  Text,
  Image,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import logo from '../../../logo.png';
const styles = StyleSheet.create({
  page: {
    padding: 45,
    fontFamily: 'Helvetica',
    fontSize: 11,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 35,
    paddingBottom: 20,
    borderBottom: '3px solid #1e40af',
  },
  companyInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  companyText: {
    flex: 1,
  },
  companyName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e40af',
    letterSpacing: 2,
  },
  companyTagline: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 4,
  },
  receiptInfo: {
    textAlign: 'right',
  },
  receiptLabel: {
    fontSize: 10,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  receiptId: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 2,
  },
  receiptTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 35,
    color: '#1e293b',
    letterSpacing: 3,
    textTransform: 'uppercase',
    backgroundColor: '#f0fdf4',
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1e40af',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  detailsCard: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: 10,
    padding: 22,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
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
  amountBadge: {
    backgroundColor: '#10b981',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    marginTop: 18,
  },
  amountLabel: {
    fontSize: 10,
    color: '#d1fae5',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 5,
  },
  amountValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statusBadge: {
    backgroundColor: '#dcfce7',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#166534',
  },
  footer: {
    marginTop: 55,
    paddingTop: 20,
    borderTop: '1px solid #e2e8f0',
    textAlign: 'center',
  },
  footerText: {
    fontSize: 9,
    color: '#94a3b8',
    marginBottom: 3,
  },
  logoContainer: {
    alignItems: 'center',
  },

  logo: {
    width: 75,
    height: 75,
    objectFit: 'contain',
  },
});

interface PaymentReceiptPDFProps {
  receiptId: string;
  receiptNo?: string;
  orderId?: string;
  paymentId?: string;
  date: string;
  studentName: string;
  collegeName: string;
  registrationNo: string;
  email: string;
  mobileNo: string;
  internshipName: string;
  amountPaid: string;
}


const PaymentReceiptPDF: React.FC<PaymentReceiptPDFProps> = ({
  receiptId,
  receiptNo,
  orderId,
  paymentId,
  date,
  studentName,
  collegeName,
  registrationNo,
  email,
  mobileNo,
  internshipName,
  amountPaid,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.companyInfo}>
          <View style={styles.logoContainer}>
            <Image src={logo.src} style={styles.logo} />
          </View>

          <View style={styles.companyText}>
            <Text style={styles.companyName}>KODEFORT</Text>

            <Text style={styles.companyTagline}>
              Empowering the Next Generation of Tech Professionals
            </Text>
          </View>
        </View>
        <View style={styles.receiptInfo}>
          <Text style={styles.receiptLabel}>Receipt No</Text>
          <Text style={styles.receiptId}>{receiptNo || receiptId}</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.receiptTitle}>Payment Receipt</Text>

      {/* Student Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Student Details</Text>
        <View style={styles.detailsCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Full Name:</Text>
            <Text style={styles.value}>{studentName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>College Name:</Text>
            <Text style={styles.value}>{collegeName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Registration No:</Text>
            <Text style={styles.value}>{registrationNo}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email Address:</Text>
            <Text style={styles.value}>{email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Mobile Number:</Text>
            <Text style={styles.value}>{mobileNo}</Text>
          </View>
        </View>
      </View>

      {/* Internship Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Internship Details</Text>
        <View style={styles.detailsCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Internship Program:</Text>
            <Text style={styles.value}>{internshipName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Mode:</Text>
            <Text style={styles.value}>Hybrid (Online)</Text>
          </View>
        </View>
      </View>

      {/* Payment Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Details</Text>
        <View style={styles.detailsCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Payment Date:</Text>
            <Text style={styles.value}>{date}</Text>
          </View>
          {orderId && (
            <View style={styles.row}>
              <Text style={styles.label}>Order ID:</Text>
              <Text style={styles.value}>{orderId}</Text>
            </View>
          )}
          {paymentId && (
            <View style={styles.row}>
              <Text style={styles.label}>Payment ID:</Text>
              <Text style={styles.value}>{paymentId}</Text>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>Payment Status:</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Completed</Text>
            </View>
          </View>
          <View style={styles.amountBadge}>
            <Text style={styles.amountLabel}>Total Amount Paid</Text>
            <Text style={styles.amountValue}>{amountPaid}</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          This is a system generated receipt and does not require any physical signature.
        </Text>
        <Text style={styles.footerText}>
          For any queries, please contact us at contact@kodefort.com
        </Text>
        <Text style={styles.footerText}>
          © {new Date().getFullYear()} Kodefort. All rights reserved.
        </Text>
      </View>
    </Page>
  </Document>
);

export default PaymentReceiptPDF;
