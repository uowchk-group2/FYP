package com.example.hyperledgerapi.entity;

import java.sql.Date;
import java.sql.Timestamp;

public class DeliveryNote {
    private String id;
    private String orderId;
    private String origin;
    private String destination;
    private String quantity;
    private String shippingDate;
    private String driver;
    private String createDate;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public String getShippingDate() {
        return shippingDate;
    }

    public void setShippingDate(String shippingDate) {
        this.shippingDate = shippingDate;
    }

    public String getDriver() {
        return driver;
    }

    public void setDriver(String driver) {
        this.driver = driver;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    @Override
    public String toString() {
        return "DeliveryNote{" +
                "id='" + id + '\'' +
                ", orderId='" + orderId + '\'' +
                ", origin='" + origin + '\'' +
                ", destination='" + destination + '\'' +
                ", quantity='" + quantity + '\'' +
                ", shippingDate='" + shippingDate + '\'' +
                ", driver='" + driver + '\'' +
                ", createDate='" + createDate + '\'' +
                '}';
    }
}
