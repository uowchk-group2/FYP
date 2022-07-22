package com.example.hyperledgerapi.controller;

import com.example.hyperledgerapi.entity.Order;
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
import java.util.Arrays;

import static com.example.hyperledgerapi.services.CsvExportService.writeOrderToCsv;

@RestController
@RequestMapping("/api/orders")
public class OrdersController {
    private static final String channelName = "fyp";
    private static final String chaincodeName = "orders2";


    private Contract contract;
    private final String assetId = "asset" + Instant.now().toEpochMilli();

    public OrdersController() throws CertificateException, IOException, InvalidKeyException, InterruptedException {
        Network network = new GatewayService().getGateway().getNetwork(channelName);

        // Get the smart contract from the network.
        this.contract = network.getContract(chaincodeName);
    }


    @GetMapping(value = "/findAll", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getAll() throws GatewayException, IOException {
        String resultString = getAllAssets();
        System.out.println(resultString);

        return resultString.toString();
    }

    @PostMapping("/newAsset")
    public String setNew(@RequestBody Order order) throws CommitException, GatewayException {
        System.out.println("Order");
        System.out.println(order);
        createAsset(order);
        return "Done";
    }

    @GetMapping( "/download")
    public void downloadCsv(HttpServletResponse response) throws IOException, GatewayException {
        response.setContentType("text/csv");
        response.addHeader("Content-Disposition", "attachment; filename=\"AllOrders.csv\"");

        String resultString = getAllAssets();
        Order[] orders = convertJsonToObject(resultString);

        writeOrderToCsv(response.getWriter(), Arrays.asList(orders));
    }

    @GetMapping( "/download/{id}")
    public void downloadSingleOrderCsv(@PathVariable String id,HttpServletResponse response) throws IOException, GatewayException {
//        System.out.println(readAssetById(id));
        String fileHeader = "attachment; filename=\"Order["+id+"].csv\"";
        response.setContentType("text/csv");
        response.addHeader("Content-Disposition", fileHeader);

        String resultString = "["+readAssetById(id)+"]";
        Order[] orders = convertJsonToObject(resultString);

        writeOrderToCsv(response.getWriter(), Arrays.asList(orders));
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
    private void createAsset(Order order) throws EndorseException, SubmitException, CommitStatusException, CommitException {
        System.out.println("\n--> Submit Transaction: CreateAsset, creates new asset with args");

        contract.submitTransaction("CreateAsset",
                order.getId(),
                order.getGoods(),
                order.getDate(),
                order.getSupplier(),
                order.getDistributor(),
                order.getDeliveryTotal(),
                order.getDeliveryUnit(),
                order.getCreateDate()
        );

        System.out.println("*** Transaction committed successfully");
    }

    private String readAssetById(String id) throws GatewayException {
        System.out.println("\n--> Evaluate Transaction: ReadAsset, function returns asset attributes");

        byte[] evaluateResult = contract.evaluateTransaction("ReadAsset", id);

        System.out.println("*** Result:" + evaluateResult);

        return new String(evaluateResult, StandardCharsets.UTF_8);
    }

    private Order[] convertJsonToObject(String jsonString) {
        ObjectMapper mapper = new ObjectMapper();

        try {
            return mapper.readValue(jsonString, Order[].class);
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonParseException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new Order[0];
    }

}
