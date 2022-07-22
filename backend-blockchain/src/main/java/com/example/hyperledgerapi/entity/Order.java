package com.example.hyperledgerapi.entity;

import java.sql.Date;
import java.sql.Timestamp;

public class Order {
    private String id;
    private String goods;
    private String date;
    private String supplier;
    private String distributor;
    private String deliveryTotal;
    private String deliveryUnit;
    private String createDate;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getGoods() {
        return goods;
    }

    public void setGoods(String goods) {
        this.goods = goods;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getSupplier() {
        return supplier;
    }

    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }

    public String getDistributor() {
        return distributor;
    }

    public void setDistributor(String distributor) {
        this.distributor = distributor;
    }

    public String getDeliveryTotal() {
        return deliveryTotal;
    }

    public void setDeliveryTotal(String deliveryTotal) {
        this.deliveryTotal = deliveryTotal;
    }

    public String getDeliveryUnit() {
        return deliveryUnit;
    }

    public void setDeliveryUnit(String deliveryUnit) {
        this.deliveryUnit = deliveryUnit;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    @Override
    public String toString() {
        return "Order{" +
                "id='" + id + '\'' +
                ", goods='" + goods + '\'' +
                ", date='" + date + '\'' +
                ", supplier='" + supplier + '\'' +
                ", distributor='" + distributor + '\'' +
                ", deliveryTotal='" + deliveryTotal + '\'' +
                ", deliveryUnit='" + deliveryUnit + '\'' +
                ", createDate='" + createDate + '\'' +
                '}';
    }
}
