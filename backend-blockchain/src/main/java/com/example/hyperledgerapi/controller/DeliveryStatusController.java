package com.example.hyperledgerapi.controller;

import com.example.hyperledgerapi.entity.DeliveryNote;
import com.example.hyperledgerapi.entity.DeliveryStatus;
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

import static com.example.hyperledgerapi.services.CsvExportService.writeDeliveryStatusToCsv;

@RestController
@RequestMapping("/api/deliveryStatus")
public class DeliveryStatusController {
    private static final String channelName = "fyp";
    private static final String chaincodeName = "deliveryStatus4";


    private Contract contract;
    private final String assetId = "asset" + Instant.now().toEpochMilli();

    public DeliveryStatusController() throws CertificateException, IOException, InvalidKeyException, InterruptedException {
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
    public String setNew(@RequestBody DeliveryStatus deliveryStatus) throws CommitException, GatewayException {
        createAsset(deliveryStatus);
        return "Done";
    }

    @GetMapping( "/download")
    public void downloadCsv(HttpServletResponse response) throws IOException, GatewayException {
        response.setContentType("text/csv");
        response.addHeader("Content-Disposition", "attachment; filename=\"sample.csv\"");

        String resultString = getAllAssets();
        DeliveryStatus[] statuses = convertJsonToObject(resultString);

        writeDeliveryStatusToCsv(response.getWriter(), Arrays.asList(statuses));
    }

    @GetMapping( "/download/{deliveryNoteIds}") //In the format of "1+2+3", 1 2 3 are the id
    public void downloadSingleDeliveryNoteCsv(@PathVariable String deliveryNoteIds,HttpServletResponse response) throws IOException, GatewayException {
        System.out.println(deliveryNoteIds);
        String[] ids = deliveryNoteIds.split("\\D", 0);
        for (String id:ids){
            System.out.println(id);
        }

        String fileHeader = "attachment; filename=\"DeliveryStatus["+deliveryNoteIds+"].csv\"";
        response.setContentType("text/csv");
        response.addHeader("Content-Disposition", fileHeader);

        String resultString = getAllAssets();
        DeliveryStatus[] statuses = convertJsonToObject(resultString);
        List<DeliveryStatus> finalStatuses = new ArrayList<>();

        for (DeliveryStatus deliveryStatus : statuses){
            for(String id: ids){
                System.out.println(deliveryStatus.getDeliveryNoteId()+", "+id);
                if (deliveryStatus.getDeliveryNoteId().equals(id)){
                    finalStatuses.add(deliveryStatus);
                }
            }
        }

        writeDeliveryStatusToCsv(response.getWriter(), finalStatuses);
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
    private void createAsset(DeliveryStatus deliveryStatus) throws EndorseException, SubmitException, CommitStatusException, CommitException {
        System.out.println("\n--> Submit Transaction: CreateAsset, creates new asset with args");

        System.out.println(deliveryStatus);

        contract.submitTransaction("CreateAsset",
                deliveryStatus.getId(),
                deliveryStatus.getDeliveryNoteId(),
                deliveryStatus.getLat(),
                deliveryStatus.getLng(),
                deliveryStatus.getTitle(),
                deliveryStatus.getPrevDistance(),
                deliveryStatus.getArrivalActual(),
                deliveryStatus.getArrivalExpected(),
                deliveryStatus.getCreateDate()
        );

        System.out.println("*** Transaction committed successfully");
    }

    private void readAssetById() throws GatewayException {
        System.out.println("\n--> Evaluate Transaction: ReadAsset, function returns asset attributes");

        byte[] evaluateResult = contract.evaluateTransaction("ReadAsset", "assetId");

        System.out.println("*** Result:" + evaluateResult);
    }

    private DeliveryStatus[] convertJsonToObject(String jsonString) {
        ObjectMapper mapper = new ObjectMapper();

        try {
            return mapper.readValue(jsonString, DeliveryStatus[].class);
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonParseException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new DeliveryStatus[0];
    }

}

