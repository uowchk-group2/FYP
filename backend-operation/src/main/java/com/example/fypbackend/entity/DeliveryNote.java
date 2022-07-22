package com.example.fypbackend.entity;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "delivery_note", schema = "fyp", catalog = "")
public class DeliveryNote {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "order_id")
    private int orderId;
    @Basic
    @Column(name = "origin")
    private String origin;
    @Basic
    @Column(name = "destination")
    private String destination;
    @Basic
    @Column(name = "quantity")
    private int quantity;
    @Basic
    @Column(name = "shipping_date")
    private Date shippingDate;
    @Basic
    @Column(name = "driver_id")
    private int driverId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
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

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Date getShippingDate() {
        return shippingDate;
    }

    public void setShippingDate(Date shippingDate) {
        this.shippingDate = shippingDate;
    }

    public int getDriverId() {
        return driverId;
    }

    public void setDriverId(int driverId) {
        this.driverId = driverId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DeliveryNote that = (DeliveryNote) o;

        if (id != that.id) return false;
        if (orderId != that.orderId) return false;
        if (quantity != that.quantity) return false;
        if (driverId != that.driverId) return false;
        if (origin != null ? !origin.equals(that.origin) : that.origin != null) return false;
        if (destination != null ? !destination.equals(that.destination) : that.destination != null) return false;
        if (shippingDate != null ? !shippingDate.equals(that.shippingDate) : that.shippingDate != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + orderId;
        result = 31 * result + (origin != null ? origin.hashCode() : 0);
        result = 31 * result + (destination != null ? destination.hashCode() : 0);
        result = 31 * result + quantity;
        result = 31 * result + (shippingDate != null ? shippingDate.hashCode() : 0);
        result = 31 * result + driverId;
        return result;
    }
}
