package com.example.fypbackend.entity;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
public class Document {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "description")
    private String description;
    @Basic
    @Column(name = "order_id")
    private int orderId;
    @Basic
    @Column(name = "delivery_note_id")
    private int deliveryNoteId;
    @Basic
    @Column(name = "filename")
    private String filename;
    @Basic
    @Column(name = "time")
    private Timestamp time;
    @Basic
    @Column(name = "md5")
    private String md5;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getDeliveryNoteId() {
        return deliveryNoteId;
    }

    public void setDeliveryNoteId(int deliveryNoteId) {
        this.deliveryNoteId = deliveryNoteId;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    public String getMd5() {
        return md5;
    }

    public void setMd5(String md5) {
        this.md5 = md5;
    }

}
