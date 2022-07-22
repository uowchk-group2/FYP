package com.example.hyperledgerapi.services;

import com.example.hyperledgerapi.entity.DeliveryNote;
import com.example.hyperledgerapi.entity.DeliveryStatus;
import com.example.hyperledgerapi.entity.Document;
import com.example.hyperledgerapi.entity.Order;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.Writer;
import java.util.List;

public class CsvExportService {

    public static void writeOrderToCsv(Writer writer, List<Order> orderList){
        try (CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT)){
            //Print header
            csvPrinter.printRecord("Order ID",
                    "Goods Name",
                    "Order Creation Date",
                    "Supplier",
                    "Distributor",
                    "Total Delivery Amount",
                    "Delivery Unit",
                    "Create time");

            for (Order order : orderList){
                csvPrinter.printRecord(order.getId(),
                        order.getGoods(),
                        order.getDate(),
                        order.getSupplier(),
                        order.getDistributor(),
                        order.getDeliveryTotal(),
                        order.getDeliveryUnit(),
                        order.getCreateDate());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void writeDeliveryNoteToCsv(Writer writer, List<DeliveryNote> deliveryNotes){
        try (CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT)){
            //Print header
            csvPrinter.printRecord("Delivery Note ID",
                    "Order Id",
                    "Delivery Original",
                    "Delivery Destination",
                    "Delivery Quantity",
                    "Estimated shipping date",
                    "Driver Company",
                    "Create time");

            for (DeliveryNote deliveryNote : deliveryNotes){
                csvPrinter.printRecord(deliveryNote.getId(),
                        deliveryNote.getOrderId(),
                        deliveryNote.getOrigin(),
                        deliveryNote.getDestination(),
                        deliveryNote.getQuantity(),
                        deliveryNote.getShippingDate(),
                        deliveryNote.getDriver(),
                        deliveryNote.getCreateDate());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void writeDeliveryStatusToCsv(Writer writer, List<DeliveryStatus> deliveryStatuses){
        try (CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT)){
            //Print header
            csvPrinter.printRecord("Delivery Status ID",
                    "Delivery Note Id",
                    "Checkpoint Latitude",
                    "Checkpoint Longitude",
                    "Checkpoint Title",
                    "Distance from the previous checkpoint",
                    "Actual time of arrival",
                    "Estimated time of arrival",
                    "Create time");

            for (DeliveryStatus deliveryStatus : deliveryStatuses){
                csvPrinter.printRecord(deliveryStatus.getId(),
                        deliveryStatus.getDeliveryNoteId(),
                        deliveryStatus.getLat(),
                        deliveryStatus.getLng(),
                        deliveryStatus.getTitle(),
                        deliveryStatus.getPrevDistance(),
                        deliveryStatus.getArrivalActual(),
                        deliveryStatus.getArrivalExpected(),
                        deliveryStatus.getCreateDate());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void writeDocumentToCsv(Writer writer, List<Document> documents){
        try (CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT)){
            //Print header
            csvPrinter.printRecord("Document Id",
                    "Document Description",
                    "Order Id",
                    "Delivery Note Id",
                    "Filename",
                    "Hashed Value (MD5)",
                    "Create time");

            for (Document document : documents){
                csvPrinter.printRecord(document.getId(),
                        document.getDescription(),
                        document.getOrderId(),
                        document.getDeliveryNoteId(),
                        document.getFilename(),
                        document.getMd5(),
                        document.getCreateDate());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
