package com.example.fypbackend.entity;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "delivery_status", schema = "fyp", catalog = "")
public class DeliveryStatus {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "delivery_note_id")
    private int deliveryNoteId;
    @Basic
    @Column(name = "lat")
    private Double lat;
    @Basic
    @Column(name = "lng")
    private Double lng;
    @Basic
    @Column(name = "title")
    private String title;
    @Basic
    @Column(name = "prev_distance")
    private int prevDistance;
    @Basic
    @Column(name = "arrival_actual")
    private Timestamp arrivalActual;
    @Basic
    @Column(name = "arrival_expected")
    private Timestamp arrivalExpected;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getDeliveryNoteId() {
        return deliveryNoteId;
    }

    public void setDeliveryNoteId(int deliveryNoteId) {
        this.deliveryNoteId = deliveryNoteId;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLng() {
        return lng;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getPrevDistance() {
        return prevDistance;
    }

    public void setPrevDistance(int prevDistance) {
        this.prevDistance = prevDistance;
    }

    public Timestamp getArrivalActual() {
        return arrivalActual;
    }

    public void setArrivalActual(Timestamp arrivalActual) {
        this.arrivalActual = arrivalActual;
    }

    public Timestamp getArrivalExpected() {
        return arrivalExpected;
    }

    public void setArrivalExpected(Timestamp arrivalExpected) {
        this.arrivalExpected = arrivalExpected;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DeliveryStatus that = (DeliveryStatus) o;

        if (id != that.id) return false;
        if (deliveryNoteId != that.deliveryNoteId) return false;
        if (prevDistance != that.prevDistance) return false;
        if (lat != null ? !lat.equals(that.lat) : that.lat != null) return false;
        if (lng != null ? !lng.equals(that.lng) : that.lng != null) return false;
        if (title != null ? !title.equals(that.title) : that.title != null) return false;
        if (arrivalActual != null ? !arrivalActual.equals(that.arrivalActual) : that.arrivalActual != null)
            return false;
        if (arrivalExpected != null ? !arrivalExpected.equals(that.arrivalExpected) : that.arrivalExpected != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + deliveryNoteId;
        result = 31 * result + (lat != null ? lat.hashCode() : 0);
        result = 31 * result + (lng != null ? lng.hashCode() : 0);
        result = 31 * result + (title != null ? title.hashCode() : 0);
        result = 31 * result + prevDistance;
        result = 31 * result + (arrivalActual != null ? arrivalActual.hashCode() : 0);
        result = 31 * result + (arrivalExpected != null ? arrivalExpected.hashCode() : 0);
        return result;
    }
}
