import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface BookingPdfData {
    bookingRef: string;
    passengers: number;
    durationDays: number;
    makkahHotel: string;
    madinahHotel: string;
    sharingType: string;
    flightType: string;
    pricePerPerson: number;
    grandTotal: number;
    hotelSubtotal: number;
    flightCost: number;
    visaCost: number;
    groupDiscount: number;
    couponCode?: string;
    couponDiscount: number;
    customerName?: string;
    customerPhone?: string;
    customerEmail?: string;
}

export function generateBookingPdf(data: BookingPdfData) {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const marginX = 40;

    // ─────────────────────────────────────────
    // Header Banner
    // ─────────────────────────────────────────
    doc.setFillColor(16, 122, 87); // emerald-700
    doc.rect(0, 0, pageWidth, 90, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Hajj & Umrah Package Quotation', marginX, 45);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('Your personalized Umrah package summary', marginX, 65);

    // Booking ref (right aligned)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(`Ref: ${data.bookingRef}`, pageWidth - marginX, 45, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(
        `Issued: ${new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })}`,
        pageWidth - marginX,
        62,
        { align: 'right' }
    );

    // ─────────────────────────────────────────
    // Customer / Package Info
    // ─────────────────────────────────────────
    let cursorY = 120;

    doc.setTextColor(30, 41, 59); // slate-800
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Package Overview', marginX, cursorY);
    cursorY += 8;

    autoTable(doc, {
        startY: cursorY,
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 6, textColor: [30, 41, 59] },
        headStyles: { fillColor: [241, 245, 249], textColor: [15, 23, 42], fontStyle: 'bold' },
        bodyStyles: { fillColor: [255, 255, 255] },
        head: [['Field', 'Details']],
        body: [
            ['Booking Reference', data.bookingRef],
            ['Passengers', `${data.passengers} Person(s)`],
            ['Duration', `${data.durationDays} Days`],
            ['Makkah Hotel', data.makkahHotel],
            ['Madinah Hotel', data.madinahHotel],
            ['Room Sharing', `${data.sharingType} Sharing`],
            ['Flight', data.flightType],
            ...(data.customerName ? [['Customer Name', data.customerName]] : []),
            ...(data.customerPhone ? [['Contact', data.customerPhone]] : []),
            ...(data.customerEmail ? [['Email', data.customerEmail]] : []),
        ],
        columnStyles: {
            0: { cellWidth: 150, fontStyle: 'bold' },
            1: { cellWidth: 'auto' },
        },
        margin: { left: marginX, right: marginX },
    });

    // ─────────────────────────────────────────
    // Price Breakdown
    // ─────────────────────────────────────────
    // @ts-ignore — jspdf-autotable adds lastAutoTable
    cursorY = (doc as any).lastAutoTable.finalY + 25;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Price Breakdown (Per Person)', marginX, cursorY);
    cursorY += 8;

    const priceRows: (string | number)[][] = [
        ['Hotels Accommodation', `BDT ${data.hotelSubtotal.toLocaleString()}`],
        ['Flight Ticket', `BDT ${data.flightCost.toLocaleString()}`],
        ['Visa & Insurance', `BDT ${data.visaCost.toLocaleString()}`],
    ];

    if (data.groupDiscount > 0) {
        priceRows.push(['Group Discount', `- BDT ${data.groupDiscount.toLocaleString()}`]);
    }

    if (data.couponCode && data.couponDiscount > 0) {
        priceRows.push([
            `Coupon (${data.couponCode})`,
            `- BDT ${data.couponDiscount.toLocaleString()}`,
        ]);
    }

    priceRows.push([
        { content: 'Price Per Person', styles: { fontStyle: 'bold' } } as any,
        {
            content: `BDT ${data.pricePerPerson.toLocaleString()}`,
            styles: { fontStyle: 'bold' },
        } as any,
    ]);

    autoTable(doc, {
        startY: cursorY,
        theme: 'striped',
        styles: { fontSize: 10, cellPadding: 6, textColor: [30, 41, 59] },
        headStyles: { fillColor: [16, 122, 87], textColor: [255, 255, 255], fontStyle: 'bold' },
        head: [['Description', 'Amount']],
        body: priceRows as any,
        columnStyles: {
            0: { cellWidth: 300 },
            1: { cellWidth: 'auto', halign: 'right' },
        },
        margin: { left: marginX, right: marginX },
    });

    // ─────────────────────────────────────────
    // Grand Total Box
    // ─────────────────────────────────────────
    // @ts-ignore
    cursorY = (doc as any).lastAutoTable.finalY + 20;

    const boxHeight = 50;
    doc.setFillColor(236, 253, 245); // emerald-50
    doc.setDrawColor(16, 122, 87);
    doc.setLineWidth(1);
    doc.roundedRect(marginX, cursorY, pageWidth - marginX * 2, boxHeight, 6, 6, 'FD');

    doc.setTextColor(6, 78, 59); // emerald-900
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(`Grand Total (${data.passengers} Pax)`, marginX + 15, cursorY + 22);

    doc.setFontSize(16);
    doc.setTextColor(16, 122, 87);
    doc.text(`BDT ${data.grandTotal.toLocaleString()}`, pageWidth - marginX - 15, cursorY + 30, {
        align: 'right',
    });

    // ─────────────────────────────────────────
    // Footer / Terms
    // ─────────────────────────────────────────
    cursorY += boxHeight + 30;

    doc.setTextColor(100, 116, 139); // slate-500
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('Terms & Conditions:', marginX, cursorY);
    cursorY += 14;

    const terms = [
        '• This quotation is valid for 7 days from the date of issue.',
        '• Final price may vary based on availability at the time of booking.',
        '• Passport must be valid for at least 6 months from the travel date.',
        '• Visa approval is subject to Saudi Ministry of Hajj & Umrah regulations.',
    ];

    terms.forEach((line) => {
        doc.text(line, marginX, cursorY);
        cursorY += 12;
    });

    // Page footer
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setDrawColor(226, 232, 240);
    doc.line(marginX, pageHeight - 50, pageWidth - marginX, pageHeight - 50);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
        'Generated by Hajj & Umrah Package Builder — Thank you for choosing us.',
        pageWidth / 2,
        pageHeight - 30,
        { align: 'center' }
    );

    // ─────────────────────────────────────────
    // Save
    // ─────────────────────────────────────────
    doc.save(`Quotation-${data.bookingRef}.pdf`);
}