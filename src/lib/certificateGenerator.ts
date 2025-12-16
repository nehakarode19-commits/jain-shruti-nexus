import type { LMSCertificate } from "@/hooks/useLMSCertificates";

interface CertificateData {
  certificate: LMSCertificate;
  studentName: string;
  courseName: string;
}

export function generateCertificatePDF({ certificate, studentName, courseName }: CertificateData): void {
  const issuedDate = certificate.issued_at 
    ? new Date(certificate.issued_at).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });

  const certificateHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Certificate - ${certificate.certificate_number}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', sans-serif;
          background: #FAF7F2;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        .certificate {
          width: 800px;
          min-height: 600px;
          background: white;
          border: 3px solid #D2811D;
          border-radius: 8px;
          padding: 40px;
          position: relative;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        }
        
        .certificate::before {
          content: '';
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          bottom: 10px;
          border: 1px solid #D2811D;
          border-radius: 4px;
          pointer-events: none;
        }
        
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .logo {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #D2811D;
          margin-bottom: 10px;
        }
        
        .subtitle {
          color: #6B6764;
          font-size: 14px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        
        .title {
          text-align: center;
          margin: 40px 0;
        }
        
        .title h1 {
          font-family: 'Playfair Display', serif;
          font-size: 42px;
          font-weight: 700;
          color: #2D2A26;
          margin-bottom: 10px;
        }
        
        .title .ornament {
          color: #D2811D;
          font-size: 24px;
        }
        
        .content {
          text-align: center;
          margin: 30px 0;
        }
        
        .content p {
          color: #6B6764;
          font-size: 16px;
          margin-bottom: 15px;
        }
        
        .student-name {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          font-weight: 600;
          color: #2D2A26;
          margin: 20px 0;
          padding-bottom: 10px;
          border-bottom: 2px solid #D2811D;
          display: inline-block;
        }
        
        .course-name {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 600;
          color: #D2811D;
          margin: 15px 0;
        }
        
        .details {
          display: flex;
          justify-content: space-between;
          margin-top: 50px;
          padding-top: 30px;
          border-top: 1px solid #E8E4DD;
        }
        
        .detail-item {
          text-align: center;
        }
        
        .detail-label {
          font-size: 12px;
          color: #6B6764;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 5px;
        }
        
        .detail-value {
          font-size: 14px;
          color: #2D2A26;
          font-weight: 500;
        }
        
        .seal {
          position: absolute;
          bottom: 60px;
          right: 60px;
          width: 80px;
          height: 80px;
          border: 3px solid #D2811D;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 12px;
          font-weight: 700;
          color: #D2811D;
          text-align: center;
          line-height: 1.2;
        }
        
        @media print {
          body {
            background: white;
            padding: 0;
          }
          .certificate {
            box-shadow: none;
            border-width: 2px;
          }
        }
      </style>
    </head>
    <body>
      <div class="certificate">
        <div class="header">
          <div class="logo">Jambushrusti</div>
          <div class="subtitle">Muni Jambuvijayaji Research Center</div>
        </div>
        
        <div class="title">
          <div class="ornament">✦</div>
          <h1>Certificate of Completion</h1>
          <div class="ornament">✦</div>
        </div>
        
        <div class="content">
          <p>This is to certify that</p>
          <div class="student-name">${studentName}</div>
          <p>has successfully completed the course</p>
          <div class="course-name">${courseName}</div>
          <p>demonstrating dedication and commitment to Jain studies and research.</p>
        </div>
        
        <div class="details">
          <div class="detail-item">
            <div class="detail-label">Certificate Number</div>
            <div class="detail-value">${certificate.certificate_number}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Date of Issue</div>
            <div class="detail-value">${issuedDate}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Issued By</div>
            <div class="detail-value">MJRC Learning Center</div>
          </div>
        </div>
        
        <div class="seal">MJRC<br/>Verified</div>
      </div>
      
      <script>
        window.onload = function() {
          window.print();
        }
      </script>
    </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(certificateHTML);
    printWindow.document.close();
  }
}
