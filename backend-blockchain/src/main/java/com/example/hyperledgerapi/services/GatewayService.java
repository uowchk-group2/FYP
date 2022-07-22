package com.example.hyperledgerapi.services;

import io.grpc.ManagedChannel;
import io.grpc.netty.shaded.io.grpc.netty.GrpcSslContexts;
import io.grpc.netty.shaded.io.grpc.netty.NettyChannelBuilder;
import org.hyperledger.fabric.client.CallOption;
import org.hyperledger.fabric.client.Gateway;
import org.hyperledger.fabric.client.identity.*;

import java.io.IOException;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.InvalidKeyException;
import java.security.PrivateKey;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.concurrent.TimeUnit;

import static com.example.hyperledgerapi.services.GatewayService.*;

public class GatewayService {
    private static final String mspID = "Org1MSP";

    //    // Path to crypto materials.
//    private static final Path cryptoPath = Paths.get("src", "main", "resources", "static", "certs");  //For local development
        private static final Path cryptoPath = Paths.get("/bitnami","certs");   //For tomcat deployment
    // Path to user certificate.
    private static final Path certPath = cryptoPath.resolve(Paths.get("User1@org1.example.com-cert.pem"));
    // Path to user private key directory.
    private static final Path keyPath = cryptoPath.resolve(Paths.get("priv_sk"));
    // Path to peer tls certificate.
    private static final Path tlsCertPath = cryptoPath.resolve(Paths.get("ca.crt"));


    private static final String peerEndpoint = "192.168.0.241:7051";
    private static final String overrideAuth = "peer0.org1.example.com";

    private Gateway gateway;

    public Gateway getGateway() throws CertificateException, IOException, InvalidKeyException {
        ManagedChannel channel = newGrpcConnection();

        Gateway.Builder builder = Gateway.newInstance().identity(newIdentity()).signer(newSigner()).connection(channel)
                // Default timeouts for different gRPC calls
                .evaluateOptions(CallOption.deadlineAfter(5, TimeUnit.SECONDS))
                .endorseOptions(CallOption.deadlineAfter(15, TimeUnit.SECONDS))
                .submitOptions(CallOption.deadlineAfter(5, TimeUnit.SECONDS))
                .commitStatusOptions(CallOption.deadlineAfter(1, TimeUnit.MINUTES));

        try (Gateway gateway = builder.connect()) {
            if (this.gateway == null){
                this.gateway = gateway;
            }
            return gateway;
        }

    }

    private static ManagedChannel newGrpcConnection() throws IOException, CertificateException {
        Reader tlsCertReader = Files.newBufferedReader(tlsCertPath.toAbsolutePath());
        X509Certificate tlsCert = Identities.readX509Certificate(tlsCertReader);

        return NettyChannelBuilder.forTarget(peerEndpoint)
                .sslContext(GrpcSslContexts.forClient().trustManager(tlsCert).build()).overrideAuthority(overrideAuth)
                .build();
    }

    private static Identity newIdentity() throws IOException, CertificateException {
        Reader certReader = Files.newBufferedReader(certPath.toAbsolutePath());
        X509Certificate certificate = Identities.readX509Certificate(certReader);

        return new X509Identity(mspID, certificate);
    }

    private static Signer newSigner() throws IOException, InvalidKeyException {
//        Path keyPath = Files.list(keyDirPath)
//                .findFirst()
//                .orElseThrow();
        Reader keyReader = Files.newBufferedReader(keyPath.toAbsolutePath());
        PrivateKey privateKey = Identities.readPrivateKey(keyReader);

        return Signers.newPrivateKeySigner(privateKey);
    }

}
