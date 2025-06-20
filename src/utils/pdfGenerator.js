import { jsPDF } from "jspdf";

export const generateTripPDF = (tripData, tripName) => {
  const doc = new jsPDF();

  // Set font sizes
  const titleSize = 20;
  const headerSize = 16;
  const bodySize = 12;
  const smallSize = 10;

  let yPosition = 20;
  const lineHeight = 6;
  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();

  // Title
  doc.setFontSize(titleSize);
  doc.setFont(undefined, "bold");
  doc.text(tripData.tripDetails.name, margin, yPosition);
  yPosition += lineHeight * 2;

  // Trip Details Section
  doc.setFontSize(headerSize);
  doc.setFont(undefined, "bold");
  doc.text("Trip Details", margin, yPosition);
  yPosition += lineHeight;

  doc.setFontSize(bodySize);
  doc.setFont(undefined, "normal");
  doc.text(
    `Destination: ${tripData.tripDetails.destination}`,
    margin,
    yPosition
  );
  yPosition += lineHeight;
  doc.text(`Duration: ${tripData.tripDetails.duration}`, margin, yPosition);
  yPosition += lineHeight;
  doc.text(
    `Start Date: ${new Date(
      tripData.tripDetails.startDate
    ).toLocaleDateString()}`,
    margin,
    yPosition
  );
  yPosition += lineHeight;
  doc.text(
    `End Date: ${new Date(tripData.tripDetails.endDate).toLocaleDateString()}`,
    margin,
    yPosition
  );
  yPosition += lineHeight * 2;

  // Accommodation Section
  if (tripData.accommodation) {
    doc.setFontSize(headerSize);
    doc.setFont(undefined, "bold");
    doc.text("Accommodation", margin, yPosition);
    yPosition += lineHeight;

    doc.setFontSize(bodySize);
    doc.setFont(undefined, "normal");
    doc.text(`Hotel: ${tripData.accommodation.name}`, margin, yPosition);
    yPosition += lineHeight;

    if (tripData.accommodation.neighborhood) {
      doc.text(
        `Location: ${tripData.accommodation.neighborhood}`,
        margin,
        yPosition
      );
      yPosition += lineHeight;
    }

    if (tripData.accommodation.rating) {
      doc.text(
        `Rating: ${tripData.accommodation.rating}/10 (${tripData.accommodation.totalReviews} reviews)`,
        margin,
        yPosition
      );
      yPosition += lineHeight;
    }

    if (tripData.accommodation.pricePerNight) {
      doc.text(
        `Price: ${tripData.accommodation.pricePerNight} per night`,
        margin,
        yPosition
      );
      yPosition += lineHeight;
    }
    yPosition += lineHeight;
  }

  // Itinerary Section
  doc.setFontSize(headerSize);
  doc.setFont(undefined, "bold");
  doc.text("Itinerary", margin, yPosition);
  yPosition += lineHeight * 1.5;

  tripData.itinerary.forEach((day) => {
    // Check if we need a new page
    if (yPosition > doc.internal.pageSize.getHeight() - 40) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(bodySize);
    doc.setFont(undefined, "bold");
    doc.text(`Day ${day.dayNumber} - ${day.date}`, margin, yPosition);
    yPosition += lineHeight;

    if (day.activities.length === 0) {
      doc.setFont(undefined, "italic");
      doc.setFontSize(smallSize);
      doc.text("No activities planned", margin + 10, yPosition);
      yPosition += lineHeight;
    } else {
      day.activities.forEach((activity, index) => {
        doc.setFont(undefined, "normal");
        doc.setFontSize(bodySize);
        doc.text(`${index + 1}. ${activity.name}`, margin + 10, yPosition);
        yPosition += lineHeight;

        if (activity.category) {
          doc.setFontSize(smallSize);
          doc.setFont(undefined, "italic");
          doc.text(`   Category: ${activity.category}`, margin + 10, yPosition);
          yPosition += lineHeight;
        }

        if (activity.distance) {
          doc.setFontSize(smallSize);
          doc.setFont(undefined, "italic");
          doc.text(`   Distance: ${activity.distance}`, margin + 10, yPosition);
          yPosition += lineHeight;
        }
      });
    }
    yPosition += lineHeight;
  });

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 20;
  doc.setFontSize(smallSize);
  doc.setFont(undefined, "italic");
  doc.text(`Generated on: ${tripData.generatedOn}`, margin, footerY);
  doc.text("Created with TripMate", pageWidth - margin - 40, footerY);

  // Save the PDF
  doc.save(`${tripName.replace(/\s+/g, "_")}_Trip_Details.pdf`);
};
