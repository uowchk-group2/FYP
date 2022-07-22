package com.example.hyperledgerapi.controller;

import com.example.hyperledgerapi.entity.DeliveryNote;
import com.example.hyperledgerapi.services.GatewayService;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hyperledger.fabric.client.Contract;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import org.hyperledger.fabric.client.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.cert.CertificateException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.example.hyperledgerapi.services.CsvExportService.writeDeliveryNoteToCsv;

@RestController
@RequestMapping("/api/deliveryNotes")
public class DeliveryNotesController {
    private static final String channelName = "fyp";
    private static final String chaincodeName = "deliveryNotes3";


    private Contract contract;
    private final String assetId = "asset" + Instant.now().toEpochMilli();

    public DeliveryNotesController() throws CertificateException, IOException, InvalidKeyException, InterruptedException {
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
    public String setNew(@RequestBody DeliveryNote deliveryNote) throws CommitException, GatewayException {
        createAsset(deliveryNote);
        return "Done";
    }

    @GetMapping( "/download")
    public void downloadCsv(HttpServletResponse response) throws IOException, GatewayException {
        response.setContentType("text/csv");
        response.addHeader("Content-Disposition", "attachment; filename=\"sample.csv\"");

        String resultString = getAllAssets();
        DeliveryNote[] notes = convertJsonToObject(resultString);

        writeDeliveryNoteToCsv(response.getWriter(), Arrays.asList(notes));
    }

    @GetMapping( "/download/{orderId}")
    public void downloadSingleDeliveryNoteCsv(@PathVariable String orderId,HttpServletResponse response) throws IOException, GatewayException {
//        System.out.println(readAssetById(id));
        String fileHeader = "attachment; filename=\"DeliveryNote["+orderId+"].csv\"";
        response.setContentType("text/csv");
        response.addHeader("Content-Disposition", fileHeader);

        String resultString = getAllAssets();
        DeliveryNote[] notes = convertJsonToObject(resultString);
        List<DeliveryNote> finalNotes = new ArrayList<>();

        for (DeliveryNote deliveryNote : notes){
            if (deliveryNote.getOrderId().equals(orderId)){
                finalNotes.add(deliveryNote);
            }
        }

        writeDeliveryNoteToCsv(response.getWriter(), finalNotes);
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
    private void createAsset(DeliveryNote deliveryNote) throws EndorseException, SubmitException, CommitStatusException, CommitException {
        System.out.println("\n--> Submit Transaction: CreateAsset, creates new asset with args");

        System.out.println("deliveryNote");
        System.out.println(deliveryNote);
        contract.submitTransaction("CreateAsset",
                deliveryNote.getId(),
                deliveryNote.getOrderId(),
                deliveryNote.getOrigin(),
                deliveryNote.getDestination(),
                deliveryNote.getQuantity(),
                deliveryNote.getShippingDate(),
                deliveryNote.getDriver(),
                deliveryNote.getCreateDate()
        );

        System.out.println("*** Transaction committed successfully");
    }

    private String readAssetById(String id) throws GatewayException {
        System.out.println("\n--> Evaluate Transaction: ReadAsset, function returns asset attributes");

        byte[] evaluateResult = contract.evaluateTransaction("ReadAsset", id);

        System.out.println("*** Result:" + evaluateResult);

        return new String(evaluateResult, StandardCharsets.UTF_8);
    }

    private DeliveryNote[] convertJsonToObject(String jsonString) {
        ObjectMapper mapper = new ObjectMapper();

        try {
            return mapper.readValue(jsonString, DeliveryNote[].class);
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonParseException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new DeliveryNote[0];
    }

}

