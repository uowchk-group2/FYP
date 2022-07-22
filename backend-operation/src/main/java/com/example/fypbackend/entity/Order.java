package com.example.fypbackend.entity;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "[order]") //add [] if it is a reserved name for SQL
public class Order {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "goods")
    private String goods;
    @Basic
    @Column(name = "date")
    private Date date;
    @Basic
    @Column(name = "supplier_id")
    private int supplierId;
    @Basic
    @Column(name = "distributor_id")
    private int distributorId;
    @Basic
    @Column(name = "delivery_total")
    private double deliveryTotal;
    @Basic
    @Column(name = "delivery_unit")
    private String deliveryUnit;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getGoods() {
        return goods;
    }

    public void setGoods(String goods) {
        this.goods = goods;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(int supplierId) {
        this.supplierId = supplierId;
    }

    public int getDistributorId() {
        return distributorId;
    }

    public void setDistributorId(int distributorId) {
        this.distributorId = distributorId;
    }

    public double getDeliveryTotal() {
        return deliveryTotal;
    }

    public void setDeliveryTotal(double deliveryTotal) {
        this.deliveryTotal = deliveryTotal;
    }

    public String getDeliveryUnit() {
        return deliveryUnit;
    }

    public void setDeliveryUnit(String deliveryUnit) {
        this.deliveryUnit = deliveryUnit;
    }

}
