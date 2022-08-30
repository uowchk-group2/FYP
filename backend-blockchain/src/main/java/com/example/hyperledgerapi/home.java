package com.example.hyperledgerapi;

import com.example.hyperledgerapi.controller.OrdersController;
import org.hyperledger.fabric.client.CommitException;
import org.hyperledger.fabric.client.GatewayException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.cert.CertificateException;

@RestController
@RequestMapping("/")
public class home {
    @GetMapping("/")
    public String test() throws CommitException, GatewayException, CertificateException, IOException, InvalidKeyException, InterruptedException {
        OrdersController ordersController = new OrdersController();
//        return ordersController.getAll();
        return "Hi.";
    }
}
