const express = require('express');
const cors = require('cors');
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = '10.3.104.75'; // Use your local network IP

// Middleware
app.use(cors({
    origin: ['http://localhost:8080', 'http://10.3.104.75:8080', 'http://127.0.0.1:8080'],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.static('public'));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Generate PDF with item details
app.post('/api/generate-pdf', async (req, res) => {
    try {
        const {
            vendorName,
            lotNumber,
            itemType,
            manufactureDate,
            supplyDate,
            warrantyPeriod
        } = req.body;

        // Create PDF document
        const doc = new PDFDocument({
            size: 'A4',
            margins: {
                top: 50,
                bottom: 50,
                left: 50,
                right: 50
            }
        });

        // Generate unique filename
        const timestamp = Date.now();
        const filename = `railway-item-${timestamp}.pdf`;
        const filepath = path.join(uploadsDir, filename);

        // Pipe PDF to file
        const stream = fs.createWriteStream(filepath);
        doc.pipe(stream);

        // Add content to PDF
        doc.fontSize(24).text('Railway Track Fitting Certificate', { align: 'center' });
        doc.moveDown();

        // Add company logo or header
        doc.fontSize(16).text('Item Details', { underline: true });
        doc.moveDown();

        doc.fontSize(12).text(`Vendor Name: ${vendorName}`);
        doc.moveDown(0.5);
        doc.text(`Lot Number: ${lotNumber}`);
        doc.moveDown(0.5);
        doc.text(`Item Type: ${itemType}`);
        doc.moveDown(0.5);

        if (manufactureDate) {
            doc.text(`Manufacture Date: ${new Date(manufactureDate).toLocaleDateString()}`);
            doc.moveDown(0.5);
        }

        if (supplyDate) {
            doc.text(`Supply Date: ${new Date(supplyDate).toLocaleDateString()}`);
            doc.moveDown(0.5);
        }

        if (warrantyPeriod) {
            doc.text(`Warranty Period: ${warrantyPeriod}`);
            doc.moveDown(0.5);
        }

        doc.moveDown();
        doc.fontSize(10).text(`Generated on: ${new Date().toLocaleString()}`);
        doc.moveDown();
        doc.text(`Document ID: ${timestamp}`);

        // Finalize PDF
        doc.end();

        // Wait for file to be written
        stream.on('finish', () => {
            res.json({
                success: true,
                filename: filename,
                filepath: `/uploads/${filename}`,
                timestamp: timestamp,
                fullUrl: `http://${HOST}:${PORT}/uploads/${filename}`
            });
        });

    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Generate QR code that links to the PDF
app.post('/api/generate-qr', async (req, res) => {
    try {
        const { pdfUrl } = req.body;

        // Generate QR code as data URL
        const qrDataUrl = await QRCode.toDataURL(pdfUrl, {
            width: 300,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        });

        res.json({
            success: true,
            qrCode: qrDataUrl,
            pdfUrl: pdfUrl
        });

    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Serve uploaded files
app.use('/uploads', express.static(uploadsDir));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, HOST, () => {
    console.log(`Backend server running on ${HOST}:${PORT}`);
    console.log(`Uploads directory: ${uploadsDir}`);
}); 