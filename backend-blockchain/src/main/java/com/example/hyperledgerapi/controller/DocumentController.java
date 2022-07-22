package com.example.hyperledgerapi.controller;

import com.example.hyperledgerapi.entity.DeliveryNote;
import com.example.hyperledgerapi.entity.DeliveryStatus;
import com.example.hyperledgerapi.entity.Document;
import com.example.hyperledgerapi.services.GatewayService;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hyperledger.fabric.client.Contract;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import org.hyperledger.fabric.client.*;

import javax.print.Doc;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.cert.CertificateException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.example.hyperledgerapi.services.CsvExportService.writeDeliveryStatusToCsv;
import static com.example.hyperledgerapi.services.CsvExportService.writeDocumentToCsv;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {
    private static final String channelName = "fyp";
    private static final String chaincodeName = "documents3";


    private Contract contract;
    private final String assetId = "asset" + Instant.now().toEpochMilli();

    public DocumentController() throws CertificateException, IOException, InvalidKeyException, InterruptedException {
        Network network = new GatewayService().getGateway().getNetwork(channelName);

        // Get the smart contract from the network.
        this.contract = network.getContract(chaincodeName);
    }


    @GetMapping(value = "/findAll", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getAll() throws GatewayException {
        String resultString = getAllAssets();
        return resultString.toString();
    }

    @PostMapping("/newAsset")
    public String setNew(@RequestBody Document document) throws CommitException, GatewayException {
        createAsset(document);
        return "Done";
    }

    @GetMapping( "/download")
    public void downloadCsv(HttpServletResponse response) throws IOException, GatewayException {
        response.setContentType("text/csv");
        response.addHeader("Content-Disposition", "attachment; filename=\"sample.csv\"");

        String resultString = getAllAssets();
        Document[] documents = convertJsonToObject(resultString);

        writeDocumentToCsv(response.getWriter(), Arrays.asList(documents));
    }

    @GetMapping( "/download/{orderId}")
    public void downloadSingleDeliveryNoteCsv(@PathVariable String orderId,HttpServletResponse response) throws IOException, GatewayException {
//        System.out.println(readAssetById(id));
        String fileHeader = "attachment; filename=\"Documents["+orderId+"].csv\"";
        response.setContentType("text/csv");
        response.addHeader("Content-Disposition", fileHeader);

        String resultString = getAllAssets();
        Document[] documents = convertJsonToObject(resultString);
        List<Document> finalDocuments = new ArrayList<>();

        for (Document document: documents){
            if (document.getOrderId().equals(orderId)){
                finalDocuments.add(document);
            }
        }

        writeDocumentToCsv(response.getWriter(), finalDocuments);
    }

    /**
     * Evaluate a transaction to query ledger state.
     */
    private String getAllAssets() throws GatewayException {
        System.out.println("\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger");

        byte[] result = contract.evaluateTransaction("GetAllAssets");

        System.out.println("*** Result: " + result);

        return new String(result, StandardCharsets.UTF_8);
    }

    /**
     * Submit a transaction synchronously, blocking until it has been committed to
     * the ledger.
     */
    private void createAsset(Document document) throws EndorseException, SubmitException, CommitStatusException, CommitException {
        System.out.println("\n--> Submit Transaction: CreateAsset, creates new asset with args");

        contract.submitTransaction("CreateAsset",
                document.getId(),
                document.getDescription(),
                document.getOrderId(),
                document.getDeliveryNoteId(),
                document.getFilename(),
                document.getMd5(),
                document.getCreateDate()
        );

        System.out.println("*** Transaction committed successfully");
    }

    private void readAssetById() throws GatewayException {
        System.out.println("\n--> Evaluate Transaction: ReadAsset, function returns asset attributes");

        byte[] evaluateResult = contract.evaluateTransaction("ReadAsset", "assetId");

        System.out.println("*** Result:" + evaluateResult);
    }

    private Document[] convertJsonToObject(String jsonString) {
        ObjectMapper mapper = new ObjectMapper();

        try {
            return mapper.readValue(jsonString, Document[].class);
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonParseException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new Document[0];
    }

}


